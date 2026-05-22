<template>
    <van-popup closable class="delete-popup" position="bottom">
            <template #default>
                <div class="delete-confirm-popup">
                    <h3>{{  title }}</h3>
                    <p>{{  message }}</p>
                    <div class="popup-actions">
                        <van-button class="cancel-btn"  @click="cancel">Cancel</van-button>
                        <van-button type="danger" class="delete-btn" @click="confirmDelete">Delete</van-button>
                    </div>
                </div>
            </template>
    </van-popup>
</template>

<script lang="ts" setup>

const props = withDefaults(defineProps<{
  title?: string,
  message?: string
}>(), {
  title: 'Confirm Deletion',
  message: 'Are you sure you want to delete this item?'
})

const emit = defineEmits<{
  (e: 'cancel'): void
  (e: 'delete'): void
  (e: 'update:show', value: boolean): void
}>()

const cancel = () => {
  emit('update:show', false)
  emit('cancel')
}

const confirmDelete = () => {
  emit('update:show', false)
  emit('delete')
}
</script>