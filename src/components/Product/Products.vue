<template>
    <div>
        <div class="item-header">
            <div class="item-header-title">Items</div>
            <div class="item-header-action">View All</div>
        </div>

       <div class="product-list">
            <Product 
                v-for="(product, index) in productList" 
                :key="index" 
                :name="product.name" 
                :barcode-value="product.barcodeValue" 
                :category="product.category"
                :size="product.size"
                :img-url="product.imgUrl" />
       </div>
    </div>
</template>

<script lang="ts" setup>
import Product from './Product.vue';
import { ref } from 'vue';

const productList = ref([
    {
        name: 'Product 1',
        barcodeValue: '1234567890',
        category: 'Category A',
        size: '500ml',
        imgUrl: '@public/img/coke-in-can.webp'
    },
    {
        name: 'Product 2',
        barcodeValue: '0987654321',
        category: 'Category B',
        size: '200g',
        imgUrl: '@public/img/coke-in-can.webp'
    },
    {
        name: 'Product 1',
        barcodeValue: '1234567890',
        category: 'Category A',
        size: '500ml',
        imgUrl: '@public/img/coke-in-can.webp'
    },
    {
        name: 'Product 2',
        barcodeValue: '0987654321',
        category: 'Category B',
        size: '200g',
        imgUrl: '@public/img/coke-in-can.webp'
    }
]);

</script>
<style lang="scss" scoped>
.item-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;

    .item-header-title {
        font-size: 18px;
        font-weight: bold;
        color: $text-color;
    }

    .item-header-action {
        font-size: 14px;
        color: var(--primary-color);
        cursor: pointer;
    }
}

.product-list {
    display: flex;
    flex-direction: column;
    gap: 15px;
}
</style>