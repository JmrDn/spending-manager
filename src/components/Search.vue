<template>
    <div class="search-container">
        <van-search class="custom-search" v-model="searchVal" placeholder="Search..." />
        <van-button icon="filter-o" @click="() => showTop = true" />
    </div>

    <van-popup v-model:show="showTop" position="top" :style="{ height: '30%' }" closeable >
        <template #default>
            <div class="title">Filter & Sort</div>
            <slot name="popupContent"></slot>
        </template>
    </van-popup>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const searchVal = ref('');
const showTop = ref(false);
</script>

<style lang="scss" scoped>
    .van-search.custom-search {
        border-radius: 20px;
        flex: 1 78%;
        
    }

    .search-container {
        display:flex;
        gap: 10px;
    }

    .van-button {
        flex: 1 0 20%;
        border-radius: 20px;
        height: 55px;
    }

    .van-button--default {
        border:none;
    }

.van-popup {
    padding: 20px;
    .title {
        text-align: start;
        font-size: 18px;
        font-weight: 700;
    }
}
</style>