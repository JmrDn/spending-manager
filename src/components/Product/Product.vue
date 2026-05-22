<template>
    <Card
        @on-edit="handleAction('edit')"
        @on-delete="handleAction('delete')"
        delete-message="Are you sure you want to delete this Product?"
    >
        <template #content>
            <div class="product" @click="handleAction('view')">
                <div class="product-img-container">
                    <img src="@public/img/coke-in-can.webp" alt="Product Image" :placeholder="name" v-if="imgUrl"/>
                </div>
                <div class="product-details">
                    <div class="product-header">
                        <div class="product-name">{{ name }}</div>
                        <div class="product-category">{{ '(' + category + ')' }}</div>
                    </div>
                    <div class="product-info">
                        <div class="product-size">{{ size }}</div>
                        <div class="product-barcode-container">
                            <BarcodeIcon />
                            <div class="product-barcode">{{ barcodeValue }}</div>
                        </div>
                    </div>
                </div>
                <div class="product-price">
                    P 50
                </div>
            </div>
        </template>
    </Card>
</template>

<script lang="ts" setup>
import Card from '../Card.vue';
import BarcodeIcon from '../icons/BarcodeIcon.vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const props = defineProps<{
    name: string;
    barcodeValue: string;
    category: string;
    size: string;
    imgUrl?: string;
}>();

const handleAction = (action: 'delete' | 'edit' | 'view') => {
    switch (action) {
        case 'edit':
            console.log(`Edit product with barcode: ${props.barcodeValue}`);
            break;
        case 'delete':
            console.log(`Delete product with barcode: ${props.barcodeValue}`);
            break;
        case 'view':
            router.push(`/product/view/${props.barcodeValue}`);
            break;
    }
}
</script>

<style lang="scss" scoped>
.product {
    padding: 15px;
    display:flex;
    gap: 20px;
    position: relative;

    .product-price {
        position: absolute;
        bottom: 10px;
        right: 20px;
        font-size: 26px;
        font-weight: bold;
        color: $text-color;
    }

    .product-img-container {
        width: 100px;
        height: 93px;
        background-color: $product-img-placeholder-color;
        border-radius: 10px;

        img {
            object-fit: contain;
             width: 100%;
             height: 100%;
        }
    }

    .product-details {
        .product-header {
            display:flex;
            justify-content: start;
            align-items: center;
            gap: 10px;

            .product-name {
                font-size: 18px;
                font-weight: bold;
                color: $text-color;
            }

            .product-category {
                font-size: 10px;
                color: $category-text-color;
                border-radius: 10px;
            }
        }

        .product-info {
            display: flex;
            flex-direction: column;
            align-items: start;
            gap: 10px;
            font-size: 14px;

            .product-barcode-container {
                display: flex;
                align-items: center;
                justify-content: start;
                gap: 5px;
            }

        }
    }

    &::before {
        content: "";
        position: absolute;
        bottom: -50px;
        right: 15px;
        width: 100px;
        height: 50px;
       -webkit-box-shadow:0px 0px 142px 52px rgba(33,164,0,0.21);
        -moz-box-shadow: 0px 0px 142px 52px rgba(33,164,0,0.21);
        box-shadow: 0px 0px 142px 52px rgba(33,164,0,0.21);
        pointer-events: none;
    }
}
</style>