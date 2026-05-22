<template>
    <div class="categories">
        <Category 
            v-for="(item, index) in categoryList" 
            :key="index" 
            :category="item.category" 
            :no-of-items="item.noOfItems" />
    </div>
</template>

<script lang="ts" setup>
import Category from './Category.vue'
import { type CategoriesDTO } from '@/dto/Category';
import useCategoryStore from '@/store/category';
import { computed } from 'vue';

const store = useCategoryStore()
const categoryList = computed<CategoriesDTO[]>( ()=> {
    return store.categories
})


</script>

<style lang="scss" scoped>
.categories {
    display: flex;
    flex-direction: column;
    gap: 10px;
}
</style>