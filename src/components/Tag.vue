<template>
    <van-tag :class="{active: isActive}" :size="size" icon="ascending">
        <template #default>
            <van-icon v-if="icon" :name="icon" />
            <span> {{ text }} </span>
        </template>
    </van-tag>
</template>

<script lang="ts" setup>
const props = withDefaults(defineProps<{
    text?: string;
    isActive?: boolean;
    size?: string;
    icon?: string
}>(), {
    isActive: false,
    size: 'large'
})
</script>


<style lang ="scss" scoped>
.van-tag--default {
    background: $product-tag-bg-color-default;
    color: $product-tag-text-color-default;
}

.van-tag {
    padding: 10px 15px;
    border-radius: 20px;
    font-size: 16px;
    cursor: pointer;
    display: inline-flex;
    gap: 5px;
}

.van-tag.active {
    background: $product-tag-bg-color-active;
    color: $product-tag-text-color-active;
}
</style>