<template>
  <Card>
    <template #content>
        <div class="monthly-reports-container">
            <h2 class="title">Monthly Report</h2>

            <div class="date-selector" @click="showCalendar = true">
              <span class="icon">📅</span>
              <span class="date-text">{{ dateText }}</span>
            </div>

            <van-calendar 
              v-model:show="showCalendar" 
              type="single"
              color="#e67e22" 
              :min-date="minCalendarDate"
              :max-date="maxCalendarDate"
              :default-date="selectedMonthDate"
              @confirm="onDateConfirm" 
            />
            
            <ExpensesCard :is-loading="loading" :title="`Total Expenses for Month of ${dateText}`" :total="rangeTotal"/>
            
            <div v-if="loading" class="chart-loader">
              <p>Analyzing financial records...</p>
            </div>
            <NoReportsDisplay v-if="rangeTotal === 0 && !loading" />
            <div v-show="rangeTotal >= 1 && !loading" class="chart-container">
              <canvas ref="chartRef"></canvas>
            </div>
        </div>
    </template>
  </Card>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { supabase } from '@/config/supabase'
import Chart from 'chart.js/auto'
import ExpensesCard from '@/components/Expenses/ExpensesCard.vue'
import Card from '@/components/Card.vue'

const chartRef = ref(null)
let chartInstance = null
const showCalendar = ref(false)
const loading = ref(false)
const rawExpenses = ref([]) 

// Target a date within the desired month (Defaults to right now)
const selectedMonthDate = ref(new Date())

// Allow selecting dates up to 2 years in the past for deeper history comparisons
const minCalendarDate = ref(new Date(new Date().setFullYear(new Date().getFullYear() - 2)))
const maxCalendarDate = ref(new Date())

// Display just the Month and Year on the selector button (e.g., "May 2026")
const dateText = computed(() => {
  return selectedMonthDate.value.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
})

const rangeTotal = computed(() => {
  return rawExpenses.value.reduce((acc, item) => acc + (item.price * item.qty), 0)
})

const onDateConfirm = (date) => {
  selectedMonthDate.value = date
  showCalendar.value = false
  fetchAndRenderData()
}

const fetchAndRenderData = async () => {
  loading.value = true

  const year = selectedMonthDate.value.getFullYear()
  const month = selectedMonthDate.value.getMonth() // 0-indexed

  // Calculate the exact boundary boundaries for the chosen calendar month
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0) // Day 0 of next month is the last day of this month

  const startISO = firstDay.toISOString().split('T')[0] + 'T00:00:00'
  const endISO = lastDay.toISOString().split('T')[0] + 'T23:59:59'

  const { data, error } = await supabase
    .from('expenses')
    .select('created_at, price, qty')
    .gte('created_at', startISO)
    .lte('created_at', endISO)
    .order('created_at', { ascending: true })

  if (error) {
    console.error(error)
    loading.value = false
    return
  }

  rawExpenses.value = data || []

  // Group items by Day of the Month (e.g., "May 1", "May 2"...)
  const processedData = {}
  rawExpenses.value.forEach(item => {
    const dayLabel = new Date(item.created_at).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    })
    const totalCost = item.price * item.qty
    processedData[dayLabel] = (processedData[dayLabel] || 0) + totalCost
  })

  const labels = Object.keys(processedData)
  const values = Object.values(processedData)

  updateChart(labels, values)
  loading.value = false
}

const updateChart = (labels, values) => {
  if (chartInstance) {
    chartInstance.destroy() 
  }

  chartInstance = new Chart(chartRef.value, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Daily Totals (₱)',
        data: values,
        backgroundColor: '#2ecc71', // Theme color swap for immediate visual feedback
        borderRadius: 4,
        borderSkipped: false
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false }
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: { color: '#f1f5f9' },
          ticks: { color: '#64748b' }
        },
        x: {
          grid: { display: false },
          ticks: { 
            color: '#64748b',
            maxRotation: 45,
            minRotation: 45 // Slants text slightly so 30 days fit comfortably on mobile layouts!
          }
        }
      }
    }
  })
}

onMounted(fetchAndRenderData)
</script>

<style scoped>
.monthly-reports-container {
    padding: 15px;
}
.title {
  color: #1e293b;
  margin-bottom: 20px;
  font-weight: 700;
}

.date-selector {
  display: flex;
  align-items: center;
  gap: 10px;
  background: #f8fafc;
  padding: 12px 16px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  cursor: pointer;
  margin-bottom: 20px;
  width: fit-content;
  transition: border-color 0.2s;
}

.date-selector:hover {
  border-color: #e67e22;
}

.date-text {
  color: #334155;
  font-weight: 600;
  font-size: 0.95rem;
}

.chart-container {
  position: relative;
  height: 300px;
  width: 100%;
  margin: 10px 0;
}

.chart-loader {
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #64748b;
  font-style: italic;
}
</style>