<template>
    <button v-bind="$attrs">
        <slot/>
    </button>
</template>

<style lang="scss" scoped>
  button {
    background: #fff;
    color: $primary-color;
    border: solid 1px $primary-color;
    padding: 12px;
    border-radius: 6px;
    cursor: pointer;

    /* Hover state */
    &:hover {
        background-color: #ebeaea; 
    }

    /* Active (pressed) state */
    &:active {
        background-color: #ebeaea; 
        transform: scale(0.98);
    }


    /* Disabled state */
    &:disabled {
        background-color: #a6d6a0;
        color: #f3f3f3;
        cursor: not-allowed;
        opacity: 0.7;
    }
  }
</style>