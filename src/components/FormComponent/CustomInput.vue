<template>
  <input
    :value="modelValue"
    @input="onInput"
    v-bind="$attrs"
  />
</template>

<script lang="ts" setup>

// Define props with types
const props = defineProps<{
  modelValue: string | number | null | undefined
}>()

// Define emits with types
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

// Input event handler
const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}
</script>

<style lang="scss" scoped>
input {
    width: 100%;
    padding: 10px 15px; /* extra space for button */
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 6px;
    outline: none;
    transition: all 0.2s ease;

    /* Hover state */
    &:hover {
    border-color: #888;
    }

    /* Focus state */
    &:focus {
    border-color: $primary-color;
    box-shadow: 0 0 0 3px  rgba(33, 164, 0, 0.2);
    }

    /* Disabled state */
    &:disabled {
    background-color: #f2f2f2;
    color: #999;
    border-color: #ddd;
    cursor: not-allowed;
    }
  }
</style>