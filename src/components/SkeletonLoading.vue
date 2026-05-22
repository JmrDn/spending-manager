<template>
    <div class="skeleton" :style="{width, height}"></div>
</template>

<script lang="ts" setup>
const props = defineProps<{
    width: string,
    height: string
}>()
</script>

<style lang="scss" scoped>
/* Base Skeleton Style */
.skeleton {
  position: relative;
  overflow: hidden;
  background: #e5e7eb;
  border-radius: 5px;
  margin-bottom: 12px;

  &.text {
    height: 20px;
  }

  &.h1 {
    height: 34px;
  }
}

/* Shimmer Effect */
.skeleton::after {
  content: "";
  position: absolute;
  top: 0;
  left: -150px;
  width: 150px;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255,255,255,0.6),
    transparent
  );
  animation: loading 1.2s infinite;
}

/* Animation */
@keyframes loading {
  100% {
    left: 100%;
  }
}
</style>