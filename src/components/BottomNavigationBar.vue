<template>
    <van-tabbar v-model="active">
        <van-tabbar-item 
            v-for="(tab, index) in tabRoutes()" 
            :class="tab.class" 
            :icon="typeof tab.icon === 'string' ? tab.icon: '' " 
            :to="tab.to" 
            :key="index">
            <template #icon v-if="typeof tab.icon !== 'string'">
                <component :is="tab.icon" />
            </template>
            <p v-if="tab.name !== 'Scan'">{{ tab.name }}</p>
        </van-tabbar-item>
    </van-tabbar>
</template>

<script lang="ts" setup>
import { watch } from 'vue';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import routes from '@/router/routes';

const active = ref(0);
const route = useRoute();
const getRoutes = () => {
    return routes.filter(route => route.meta?.showInTabBar);
}
const tabRoutes = ():any[] => {
    const routes = getRoutes()
    const tabs = routes.map(route => {
        return {
            name: route.name ? route.name : route.children?.[0]?.name || 'Unknown',
            to: route.path,
            icon: route.meta?.icon || 'question-o',
            class: route.name ? route.name.toString().toLocaleLowerCase() + '-tab' : ''
        }
    })
    return tabs;
}

watch(() => route.path, (newPath) => {
    const index = tabRoutes().findIndex(tab => tab.to === newPath);
    if (index !== -1) {
        active.value = index;
    }
}, { immediate: true });
</script>

<style lang="scss" scoped>
.van-tabbar {
    border-radius: 20px 20px 0 0;
    width: 100%;
    max-width: 768px;
    margin: 0 auto;
    left: 50%;
    transform: translateX(-50%);
    .van-tabbar-item.van-tabbar-item--active {
        .van-badge__wrapper.van-tabbar-item__icon {
            svg.custom-icon {
                color: var(--van-tabbar-item-active-color, #21A400);
            }
        }
    }

    .van-tabbar-item {
        border-radius: 20px 20px 0 0;
    }
    .van-tabbar-item.inventory-tab {
        margin-right: 45px;
    }
    .van-tabbar-item.category-tab {
        margin-left: 45px;
    }
    .van-tabbar-item.scan-tab {
        position: absolute;
        top: -40px;
        left: 50%;
        transform: translateX(-50%);
        background-color: $primary-color;
        border-radius: 50%;
        width: 65px;
        height: 65px;
        z-index: 1;
        .van-badge__wrapper.van-tabbar-item__icon {
            svg.custom-icon {
                color: #fff;
                font-size: 30px;
            }
        }
    }
}
</style>