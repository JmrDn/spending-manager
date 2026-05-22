<template>
    <van-tabs class="report-nav" v-model:active="activeTab">
        <van-tab
            v-for="tab in tabs"
            :key="tab.name"
            :title="tab.name"
            :name="tab.name"
        >
            <component :is="tab.component" />
        </van-tab>
    </van-tabs>
</template>

<script lang="ts" setup>
import DailyReport from './DailyReport.vue';
import WeeklyReport from './WeeklyReport.vue';
import MonthlyReport from './MonthlyReport.vue';
import { ref } from 'vue';

const activeTab = ref<string>('Daily')

const tabs: any[] = [
    {
        name: 'Daily',
        component: DailyReport
    },
    {
        name: 'Weekly',
        component: WeeklyReport
    },
    {
        name: 'Monthly',
        component: MonthlyReport
    },
]
</script>

<style lang="scss" scoped>
</style>