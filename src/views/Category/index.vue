<template>
    <div class="category-list-container">
        <Search >
    
        </Search>
        <Categories />
    </div>
    <div v-if="!showAddCategory" class="floating-button">
        <van-button type="primary" icon="plus" @click="() => showAddCategory = true"/>
    </div>
    <AddCategory v-model:show="showAddCategory"/>
</template>

<script lang="ts" setup>
import Categories from '@/components/Category/Categories.vue';
import Search from '@/components/Search.vue';
import AddCategory from '@/components/Category/AddCategory.vue';
import { ref } from 'vue';

const showAddCategory = ref<boolean>(false)
</script>

<style lang="scss" scoped>
.category-list-container {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.filter {
    color: $text-color;
    font-size: 16px;
    margin: 10px 0;
}

.category-list {
    padding: 20px 10px;
}

.floating-button { 
    position: fixed;
    bottom: 100px;
    right: 20px;
    z-index: 1000;
    .van-button {
        border-radius: 15px;
    }
}
</style>