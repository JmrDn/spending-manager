<template>
    <div>
        <!-- Skeleton Loader -->
        <ExpensesSkeleton v-if="isInitialLoading" />
        <template v-else>
            <div class="header">
                <span>Hello,</span>
                <h1>{{ user.getFirstName || 'Spending Manager' }}</h1>
            </div>
           <ExpensesCard :is-loading="disableBtn" title="Today's spending" :total="todayTotal" />
            <ExpensesForm @add-expense="handleAddExpense" :disable-btn="disableBtn"/>
            <div class="today-items">
                <div class="header">
                    <h3>Today Items</h3>
                    <span>List of items you bought today</span>
                </div>
                <div v-if="disableBtn">Loading...</div>
                <div v-else-if="expenses.length < 1"> You haven't buy anything today</div>
                <Card v-else v-for="(item, index) in expenses" :key="index">
                    <template #content>
                        <div class="item-container">
                            <span>{{ item.name }} (x{{ item.qty }})</span>
                            <span class="price">₱{{ getPrice(item.price, item.qty) }}</span>
                            <span class="time">{{ timeAgo(item.created_at) }}</span>
                        </div>
                    </template>
                </Card>
                <button
                    v-if="!disableBtn && range.to < totalRow - 1"
                    class="load-more-btn" 
                    :disabled="range.to >= totalRow - 1"
                    @click.prevent="loadMore">
                        <span>Load more</span>
                    </button>
            </div>
        </template>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted} from 'vue'
import { supabase } from '@/config/supabase'
import Card from '@/components/Card.vue'
import type { FormExpenseDTO, ExpenseDTO } from '@/dto/Expenses'
import ExpensesForm from '@/components/Expenses/ExpensesForm.vue'
import useUserStore from '@/store/users'
import ExpensesSkeleton from '@/components/Expenses/ExpensesSkeleton.vue'
import ExpensesCard from '@/components/Expenses/ExpensesCard.vue'
import { formatBalance } from '@/utils/amount'

const user = useUserStore()
const expenses = ref<ExpenseDTO[]>([])
const disableBtn = ref<boolean>(false)
const isInitialLoading = ref<boolean>(true)

const todayTotal = ref<number>(0)

const limit = 5
const range = ref({
  from: 0,
  to: limit - 1
})

const totalRow = ref(0)

const getPrice = (price: number | null | undefined, qty: number | null | undefined): string => {
    const _price = Number(price ?? 0)
    const _qty = Number(qty ?? 0)

    return formatBalance(_price * _qty)
}

const getTodayTotal = async() => {
    try {
        const { data, success }  = await supabase.rpc('get_today_total')
        if (success) todayTotal.value = data
    } catch(err: any) {
        console.log('failed to get today total', err)
    }
}

const fetchTodayExpenses = async () => {
  try {
    const today = new Date().toISOString().split('T')[0]

    const { data, count } = await supabase
      .from('expenses')
      .select('*', { count: 'exact' })
      .gte('created_at', `${today}T00:00:00`)
      .order('created_at', { ascending: false })
      .range(range.value.from, range.value.to)
    
    getTodayTotal()
    expenses.value = data || []
    totalRow.value = count || 0

  } catch (err) {
    console.error(err)
  } finally {
    isInitialLoading.value = false
  }
}

const timeAgo = (created_at: string | Date) => {
    const then: any = new Date(created_at)
    const now: any = new Date()
    const diffSeconds = Math.floor((now - then) / 1000)
    if (isNaN(diffSeconds) || diffSeconds < 0) return ''
    if (diffSeconds < 60) return diffSeconds <= 1 ? 'now' : `${diffSeconds}s ago`
    const mins = Math.floor(diffSeconds / 60)
    if (mins < 60) return `${mins}m ago`
    const hours = Math.floor(mins / 60)
    if (hours < 24) return hours === 1 ? '1hr ago' : `${hours}hrs ago`
    const days = Math.floor(hours / 24)
    if (days < 7) return days === 1 ? '1d ago' : `${days}d ago`
    return then.toLocaleDateString()
}

const loadMore = async () => {
  if (range.value.to >= totalRow.value - 1) return

  range.value.from = range.value.to + 1
  range.value.to = range.value.to + limit

  const today = new Date().toISOString().split('T')[0]

  const { data } = await supabase
    .from('expenses')
    .select('*')
    .gte('created_at', `${today}T00:00:00`)
    .order('created_at', { ascending: false })
    .range(range.value.from, range.value.to)

  if (data?.length) {
    expenses.value = [...expenses.value, ...data]
  }
}

const handleAddExpense = async(data:FormExpenseDTO ) => {
    disableBtn.value = true
    
    try {
        const formData = {...data }
        const {status , success} = await supabase.from('expenses').insert([formData])
        if (status === 201 && success) {
            range.value = {
                from: 0,
                to: limit - 1
            }
            fetchTodayExpenses()
        }
    } catch (err: any) {
        console.log('failed to add expense', err)
    } finally {
        disableBtn.value = false
    }
}
onMounted(fetchTodayExpenses)
</script>

<style lang="scss" scoped>
.today-card {
  background: $primary-shade-color;
  padding: 20px;
  border-radius: 12px;
  text-align: center;
  border-bottom: 4px solid $primary-color;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  gap: 10px;
  margin-top: 10px;

  span {
    font-size: 14px;
  }

}

form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
}

.row {
  display: flex;
  gap: 10px;
}

.today-items {
    padding: 20px 0;
    display: flex;
    flex-direction: column;
    span {
        font-size: 12px;
    }

    .item-container {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 20px;
        gap: 5px;
        position: relative;

        span {
            font-size: 14px;
            color: #000;
        }

        span.price {
            font-size: 30px;
            font-weight: 600;
        }
        
        span.time {
            position: absolute;
            bottom: 5px;
            right: 15px;
            font-size: 10px;
            color: #727272;
        }
    }
}

.load-more-btn {
    background: $primary-color;
    color: #FFF;
    border:none;
    padding: 10px;
    border-radius: 10px;
    width: 100px;
    margin: 0 auto;
}

.load-more-btn:disabled {
    background: $btn-disabled-bg-color;
    cursor: not-allowed;
}
</style>