<template>
    <div class="error-wrapper"><span>{{ errMessage }}</span></div>
</template>

<script lang="ts" setup>
const props = defineProps<{
    errMessage: string
}>()
</script>

<style lang="scss" scoped>
.error-wrapper {
    padding:10px 15px;
    background-color: #fdb1b1;
    color: #c50404;
    margin: 5px auto 0 auto;
    border-radius: 6px;

    span {
        font-size: 14px;
    }
}
</style>