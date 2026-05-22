<template>
  <Card>
    <template #content>
      <div class="weekly-reports-container">
        <h2 class="title">Weekly Report</h2>

        <div class="date-selector" @click="showCalendar = true">
          <span class="icon">📅</span>
          <span class="date-text">{{ dateRangeText }}</span>
        </div>

        <van-calendar 
          v-model:show="showCalendar" 
          type="range"
          color="#3498db"
          :max-range="7"
          :min-date="minCalendarDate"
          :default-date="[startDate, endDate]"
          :allow-same-day="false"
          :max-date="maxCalendarDate"
          @confirm="onDateConfirm" 
          @select="onDateSelect"
        />
        
        <ExpensesCard :is-loading="loading" title="Total Expenses for Period" :total="rangeTotal"/>
        <div v-if="loading" class="chart-loader">
          <p>Analyzing financial records...</p>
        </div>
        <NoReportsDisplay v-if="rangeTotal === 0 && !loading" />
        <div v-show="rangeTotal >= 1 && !loading" class="chart-container" >
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
import { showToast } from 'vant' // Optional: alerts user if they try to pick less than 7 days
import { formatBalance } from '@/utils/amount'

const chartRef = ref(null)
let chartInstance = null
const showCalendar = ref(false)
const loading = ref(false)
const rawExpenses = ref([]) 

// Set the initial default view to exactly the last 7 days
const startDate = ref(new Date(Date.now() - 6 * 24 * 60 * 60 * 1000))
const endDate = ref(new Date())

const dateRangeText = computed(() => {
  const format = (d) => d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  return `${format(startDate.value)} — ${format(endDate.value)}`
})

const rangeTotal = computed(() => {
  return rawExpenses.value.reduce((acc, item) => acc + (item.price * item.qty), 0)
})

// SMART CHOICE LOGIC: Forces a perfect 7-day span
const onDateSelect = (values) => {
  if (values && values.length === 2) {
    const [start, end] = values
    const diffTime = Math.abs(end - start)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1 // Include start day

    // If they picked less than 7 days, we override the second click to lock it to day #7
    if (diffDays < 7) {
      const fixedEnd = new Date(start)
      fixedEnd.setDate(start.getDate() + 6) // Add 6 days to get a complete 1-week block
      values[1] = fixedEnd
    }
  }
}

const onDateConfirm = (values) => {
  const [start, end] = values
  
  // Double check that it's a perfect week span
  const diffDays = Math.ceil(Math.abs(end - start) / (1000 * 60 * 60 * 24)) + 1
  if (diffDays !== 7) {
    showToast('Please choose a complete 7-day calendar block')
    return
  }

  startDate.value = start
  endDate.value = end
  showCalendar.value = false
  fetchAndRenderData()
}

const fetchAndRenderData = async () => {
    loading.value = true

    const startISO = startDate.value.toISOString().split('T')[0] + 'T00:00:00'
    const endISO = endDate.value.toISOString().split('T')[0] + 'T23:59:59'

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

    // Map each individual calendar date across the selected week block
    const processedData = {}
    rawExpenses.value.forEach(item => {
        const dayLabel = new Date(item.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
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
        label: 'Weekly Spending (₱)',
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

const minCalendarDate = ref(new Date())
const maxCalendarDate = ref(new Date())

// Run a small adjustment so the past becomes clickable
const setupCalendarBoundaries = () => {
  const today = new Date()
  // Go back 6 months in time. Change the '6' to '12' if you want a full year of history!
  minCalendarDate.value = new Date(today.setMonth(today.getMonth() - 6))
}

// Call this function when the component loads
setupCalendarBoundaries()

onMounted(fetchAndRenderData)
</script>

<style scoped>
.weekly-reports-container {
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
  border-color: #3498db;
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