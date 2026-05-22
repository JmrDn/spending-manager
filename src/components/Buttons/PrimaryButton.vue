<template>
    <button v-bind="$attrs">
        <slot/>
    </button>
</template>

<style lang="scss" scoped>
  button {
    background: $primary-color;
    color: #FFF;
    font-weight: bold;
    border: none;
    padding: 12px;
    border-radius: 6px;
    cursor: pointer;

    /* Hover state */
    &:hover {
        background-color: #1c8f00; /* slightly darker */
    }

    /* Active (pressed) state */
    &:active {
        background-color: #167300; /* even darker */
        transform: scale(0.98);
    }

    /* Focus state (keyboard navigation) */
    &:focus {
        box-shadow: 0 0 0 3px rgba(33, 164, 0, 0.25);
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