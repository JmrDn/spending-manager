<template>
  <form @submit.prevent="handleSubmit" class="expense-form">
    <CustomInput
      v-model="form.name"
      placeholder="What did you buy?"
      required
    />

    <CustomInput
      v-model.number="form.price"
      type="number"
      step="0.01"
      placeholder="What's the price?"
      required
    />

    <CustomInput
      v-model.number="form.qty"
      type="number"
      placeholder="How many?"
      required
    />

    <PrimaryButton :disabled="disableBtn" type="submit">
      {{ disableBtn ? 'Logging item...' : 'Log Item' }}
    </PrimaryButton>
  </form>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

// components
import CustomInput from '@/components/FormComponent/CustomInput.vue'
import PrimaryButton from '@/components/Buttons/PrimaryButton.vue'
import type { FormExpenseDTO } from '@/dto/Expenses'

/**
 * Emits
 */

const props = withDefaults(
    defineProps<{
        disableBtn: boolean
    }>(),
    {
            disableBtn: false
    }   
)
const emit = defineEmits<{
  (e: 'add-expense', payload: FormExpenseDTO): void
}>()

/**
 * Local form state
 */
const form = ref<FormExpenseDTO>({
  name: '',
  price: null,
  qty: null
})

/**
 * Simple validation state
 */

/**
 * Submit handler
 */
const handleSubmit = () => {
  emit('add-expense', form.value)

  // optional: reset form after submit
  form.value.name = ''
  form.value.price = null
  form.value.qty = null
}
</script>

<style scoped>
.expense-form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>