<template>
    <Card
        @on-delete="handleAction('delete')"
        @on-edit="handleAction('edit')"
        delete-message="Are you sure you want to delete this Category?"
    >
        <template #content>
            <div class="category">
                <span>{{ category }}</span>
                <span>{{ noOfItems }} items</span>
            </div>
        </template>
    </Card>
</template>

<script lang="ts" setup>
import Card from '../Card.vue';
const props = defineProps<{
    category: string,
    noOfItems: number | string
}>()

const handleAction = (action: 'edit' | 'delete'): void => {
    switch (action) {
        case 'edit':
            console.log('edit category') 
            break;
        case 'delete':
            console.log('delete category') 
            break;
    }
} 
</script>

<style lang="scss" scoped>
.category {
    padding: 15px;
    display:flex;
    gap: 20px;
    position: relative;
    align-items: center;

    span:nth-child(1) {
        font-size: 28px;
        font-weight: 700;
        color: $text-color;
    }

    span:nth-child(2) {
        font-size: 14px;
        color: $no-of-items-text-color;
    }

}
</style>