<template>
    <div class="product-list-container">
        <Search >
               <template #popupContent>
                <div class="category filter">
                    <span>Categories</span>
                    <div class="category-list">
                        <Tag 
                            v-for="item in categoryList" 
                            :key="item.category" 
                            :is-active="currentSelectedCategories.includes(item.category)" 
                            :text="item.category"
                            @click="()=> handleSelectCategory(item.category)"
                            />
                    </div>
                </div>
                <div class="sorting filter">
                    <span>Sort</span>
                    <div class="sort-list">
                        <Tag 
                            v-for="item in sortList" 
                            :key="item" 
                            :is-active="currentSelectedSort === item" 
                            :text="item"
                            :icon="item.toLocaleLowerCase()"
                            @click="()=> handleSelectSort(item)"
                            />
                    </div>
                </div>
            </template>
        </Search>
        <Products />
    </div>
    <div class="floating-button">
        <van-button type="primary" icon="plus"/>
    </div>
</template>

<script lang="ts" setup>
import Search from '@/components/Search.vue';
import Products from '@/components/Product/Products.vue';
import { type CategoriesDTO } from '@/dto/Category';
import { computed, ref } from 'vue';
import Tag from '@/components/Tag.vue';
import useCategoryStore from '@/store/category';

const store = useCategoryStore()
const currentSelectedCategories = ref<string[]>([])
const currentSelectedSort = ref<string>('')

const handleSelectCategory = (category: string) => {
    const index: number = currentSelectedCategories.value.findIndex( c => category === c)
    const isCategoryNotSelected: boolean = index === -1;

    if (isCategoryNotSelected) currentSelectedCategories.value.push(category)
    else currentSelectedCategories.value.splice(index, 1)
}
const categoryList = computed<CategoriesDTO[]>(()=> {
    return store.categories
})

const sortList: string[] = ['Ascending', 'Descending']

const handleSelectSort = (sort: string) => {
    if (sort && sort === currentSelectedSort.value) {
        currentSelectedSort.value = ''
        return
    }
    
    currentSelectedSort.value = sort

}
</script>

<style lang="scss" scoped>
.product-list-container {
    display: flex;
    flex-direction: column;
    gap: 20px;
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

.filter {
    color: $text-color;
    font-size: 16px;
    margin: 10px 0;
}

.category-list,
.sort-list {
    padding: 20px 10px;
    display: flex;
    gap: 10px;
}
</style>