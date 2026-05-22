<template>
    <div class="today-card">
        <span>{{ title }}</span>
        <h1>₱{{isLoading ? '...' : formatBalance(Number(total)) }}</h1>
    </div>
</template>

<script lang="ts" setup>
import { formatBalance } from '@/utils/amount';
const props = withDefaults(defineProps<{
    total: number | string
    title: string
    isLoading: boolean
}>(), { isLoading: true})
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
</style>