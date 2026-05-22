<template>
    <div class="product">
        <div class="product-img-container">
            <img src="@public/img/coke-in-can.webp" alt="Product">
            <div class="barcode-container">
                <BarcodeIcon />
                <span>{{ barcode }}</span>
            </div>
        </div>
        <div class="product-price">
            <h1>₱ {{ currentSelectedSize.price }}</h1>
        </div>
        <div class="product-title">
            <h1>Coca Cola</h1>
            <span>(Drinks)</span>
        </div>
        <div class="product-body">
            <span>Select size:</span>
            <div class="product-size">
                <Tag 
                    v-for="item in productSizes" 
                    :key="item.size" 
                    :is-active="item.size === currentSelectedSize.size" 
                    :text="item.size"
                    @click="()=> currentSelectedSize = item"
                    />
            </div>
        </div>
    </div>
</template>


<script lang="ts" setup>
import BarcodeIcon from '@/components/icons/BarcodeIcon.vue';
import { useRoute } from 'vue-router';
import Tag from '@/components/Tag.vue';
import { ref } from 'vue';

const route = useRoute();

const barcode = route.params.barcode as string;

const productSizes: any[] = [
    {
        size: '500ml',
        price: '350'
    },
    {
        size: '100ml',
        price: '100'
    },
    {
        size: '250ml',
        price: '200'
    },
]

const currentSelectedSize = ref<{
    size: string,
    price: string
}>(productSizes[0])
</script>
<style lang="scss" scoped>

.product {
    .product-img-container {
        width: 100%;
        height: 350px;
        position: relative;

        img {
            width: 100%;
            height: 100%;
            object-fit: contain;
        }

        .barcode-container {
            position:absolute;
            top: 40px;
            right: 10px;
            display: flex;
            align-items: center;
            gap: 5px;
            z-index: 99;
            span {
                font-size: 20px;
                color: $text-color;
            }
        }
    }

    .product-title {
        display: flex;
        align-items: center;
        gap: 10px;

        h1 {
        font-size: 28px;
        color: $text-color;
        }

        span {
            font-size: 18px;
            color: $text-color;
        }
    }
    .product-price {
        width: 100%;
        display: flex;
        justify-content: flex-end;
        h1 {    
            font-size: 45px;
            color: $text-color;
        }
    }

    .product-body {
        padding: 15px 0;
        & > span:first-child {
            font-size: 14px;
            color: $text-color;
        }
        .product-size {
            margin-top: 5px;
            display: flex;
            gap: 10px;
        }
    }
}
</style>