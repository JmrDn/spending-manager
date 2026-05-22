<template>
  <div class="input-wrapper">
    <!-- Input -->
    <input
      :type="showPassword ? 'text' : 'password'"
      :value="modelValue"
      @input="onInput"
      v-bind="$attrs"
      class="input-field"
    />

    <!-- Toggle button -->
    <button
      type="button"
      class="toggle-btn"
      @click="togglePassword"
      tabindex="-1"
    >
      {{ showPassword ? '🙈' : '👁️' }}
    </button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

// Props typing
interface Props {
  modelValue: string
}

const props = defineProps<Props>()

// Emits typing
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

// Local state for show/hide password
const showPassword = ref(false)

// Toggle password visibility
const togglePassword = () => {
  showPassword.value = !showPassword.value
}

// Handle input event
const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}
</script>

<style scoped>
.input-wrapper {
  position: relative;
  display: inline-block;
  width: 100%;
}

.input-field {
  width: 100%;
  padding: 10px 40px 10px 12px; /* extra space for button */
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 6px;
  outline: none;
  transition: all 0.2s ease;
}

/* Hover and focus */
.input-field:hover {
  border-color: #888;
}

.input-field:focus {
  border-color: #21A400;
  box-shadow: 0 0 0 3px rgba(33, 164, 0, 0.2);
}

/* Disabled state */
.input-field:disabled {
  background-color: #f2f2f2;
  color: #999;
  border-color: #ddd;
  cursor: not-allowed;
}

/* Toggle button */
.toggle-btn {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 18px;
  color: #333;
  padding: 0;
  outline: none;
}

.toggle-btn:hover {
  color: #21A400;
}

.toggle-btn:disabled {
  cursor: not-allowed;
  color: #aaa;
}
</style>