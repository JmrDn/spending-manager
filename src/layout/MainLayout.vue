<template>

    <div class="main-layout">
        <NavigationBar v-if="showNavBar"/>
        <PageLayout>
            <router-view />
        </PageLayout>
        <BottomNavigationBar v-if="showBottowmNav"/>
    </div>
</template>


<script setup lang="ts">
import PageLayout from './PageLayout.vue';
import NavigationBar from '@/components/NavigationBar.vue';
import { useRoute } from 'vue-router';
import { computed } from 'vue';
import { excludedRoutesForNavBar, excludedRoutesForBottomNavBar } from '@/const';
import BottomNavigationBar from '@/components/BottomNavigationBar.vue';

const route = useRoute();

const showNavBar = computed(() => {
    const routeName = route.name ? route.name.toString() : '';
    return !excludedRoutesForNavBar.includes(routeName);
});

const showBottowmNav = computed(() => {
    const routeName = route.name ? route.name.toString() : '';
    return !excludedRoutesForBottomNavBar.includes(routeName);
});

</script>

<style lang="scss" scoped>

.main-layout {
    width: 100vw;
    max-width: 768px; // Tablet width
    box-sizing: border-box;
    margin: 0 auto;
    padding-bottom: 40px;
    overflow: hidden;
}

</style>