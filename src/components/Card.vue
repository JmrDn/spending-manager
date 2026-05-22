<template>
    <van-swipe-cell >
        <template #default>
            <div class="card">
                <slot name="content" />
            </div>
        </template>
        <template #right>
            <van-button round icon="edit" class="edit-btn" @click="emit('onEdit')" />
            <van-button round icon="delete-o" type="danger" class="delete-btn" @click="() => isShowDeleteConfirmPopup = true" />
        </template>
    </van-swipe-cell>
    <DeletePopup 
        v-model:show="isShowDeleteConfirmPopup"
        @delete="emit('onDelete')"
        @cancel="isShowDeleteConfirmPopup = false"
        @update:show="(show) => isShowDeleteConfirmPopup = show"
        :message="deleteMessage"
    />
</template>

<script lang="ts" setup>

import { ref } from 'vue';
import DeletePopup from '@/components/DeletePopup.vue';

const props = defineProps<{
    deleteTitle?: string,
    deleteMessage?: string
}>()
const emit = defineEmits<{
    (e: 'onEdit'): void;
    (e: 'onDelete'): void;
}>()

const isShowDeleteConfirmPopup = ref<boolean>(false);
</script>

<style lang="scss" scoped>
.card {
    background-color: $product-card-bg-color;
    border-radius: 12px;
    position: relative;
    overflow: hidden;
    margin: 5px 0;
}
</style>