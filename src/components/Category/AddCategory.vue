<template>
    <van-popup class="add-category-popup">
        <h2>Add category</h2>
        <van-field v-model="text" label="Category" />
        <van-button>Add category</van-button>
    </van-popup>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const text = ref<string>('')
</script>