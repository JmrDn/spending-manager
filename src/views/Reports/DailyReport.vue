<template>
  <Card>
    <template #content>
        <div class="daily-reports-container">
            <h2 class="title">Daily Report</h2>

            <div class="date-selector" @click="showCalendar = true">
              <span class="icon">📅</span>
              <span class="date-text">{{ dateText }}</span>
            </div>

            <van-calendar 
              v-model:show="showCalendar" 
              type="single"
              color="#2ecc71"
              :min-date="minCalendarDate"
              :max-date="maxCalendarDate"
              :default-date="selectedDate"
              @confirm="onDateConfirm" 
            />
            
            <ExpensesCard :is-loading="loading" :title="`Total Expenses for ${dateText}`" :total="rangeTotal"/>
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
import NoReportsDisplay from '@/components/Reports/NoReportsDisplay.vue'

const chartRef = ref(null)
let chartInstance = null
const showCalendar = ref(false)
const loading = ref(false)
const rawExpenses = ref([])

// Target a single date instance instead of a range object (Defaults to today)
const selectedDate = ref(new Date())

// Allow selecting dates up to 6 months in the past
const minCalendarDate = ref(new Date(new Date().setMonth(new Date().getMonth() - 6)))
const maxCalendarDate = ref(new Date())
// Format a single distinct day description label
const dateText = computed(() => {
  return selectedDate.value.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
})

const rangeTotal = computed(() => {
  return rawExpenses.value.reduce((acc, item) => acc + (item.price * item.qty), 0)
})

// Vant single mode passes back a single native Date object instead of an Array
const onDateConfirm = (date) => {
  selectedDate.value = date
  showCalendar.value = false
  fetchAndRenderData()
}

const fetchAndRenderData = async () => {
  loading.value = true

  // Isolate the boundary from the beginning of the day to the final microsecond
  const baseISO = selectedDate.value.toISOString().split('T')[0]
  const startISO = `${baseISO}T00:00:00`
  const endISO = `${baseISO}T23:59:59`

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

  // Group items by Hour blocks so the bar chart actually displays helpful segments
  const processedData = {}
  rawExpenses.value.forEach(item => {
    const hourLabel = new Date(item.created_at).toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    })
    const totalCost = item.price * item.qty
    processedData[hourLabel] = (processedData[hourLabel] || 0) + totalCost
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
        label: 'Hourly Spending (₱)',
        data: values,
        backgroundColor: '#2ecc71', 
        borderRadius: 6,
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
          ticks: { color: '#64748b' }
        }
      }
    }
  })
}

onMounted(fetchAndRenderData)
</script>

<style scoped>
.daily-reports-container {
    padding: 15px;
    .van-overlay {
        background: transparent;
    }
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
  border-color: #2ecc71;
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