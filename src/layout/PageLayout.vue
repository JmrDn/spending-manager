<template>
    <div class="page-layout">
        <slot name="header">
            <div v-if="!showTitle" class="page-title-wrapper">
                <h2 >{{ currentPageName }}</h2>
            </div>
        </slot>
        <slot />

    </div>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router';
import { computed } from 'vue';
import { excludedRoutesForTitle } from '@/const';

const route = useRoute();

const currentPageName = computed(() => {
    return route.name || 'Unknown';
});

const showTitle = computed(() => {
    const routeName = route.name ? route.name.toString() : '';
    return excludedRoutesForTitle.includes(routeName);
});
</script>
<style lang="scss" scoped>
    .page-layout {
        padding: 20px;
        width: 100%;
    }

    .page-title-wrapper {
        padding: 15px 0;

        h2 {
            color: $text-color;
            font-size: 28px;
            font-weight: bold;
            text-align: start;
        }
    }
</style>