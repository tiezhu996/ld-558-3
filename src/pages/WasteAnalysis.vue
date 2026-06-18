<template>
  <ScreenAdapter>
    <section class="screen">
      <header class="page-header"><div><p>Waste Sorting Intelligence</p><h1>垃圾分类分析屏</h1></div><RouterLink to="/">返回主屏</RouterLink></header>
      <div class="metric-row">
        <DataCard label="采集记录" :value="stats.length" suffix=" 条" />
        <DataCard label="平均达标率" :value="averageRate" suffix="%" />
        <DataCard label="分类重量" :value="totalWeight" :digits="1" suffix=" kg" />
      </div>
      <div class="dashboard-grid">
        <section class="panel wide"><h2>各区域达标率</h2><RecyclingBarChart :labels="locations" :values="rates" /></section>
        <section class="panel wide"><h2>月度重量趋势</h2><TrendLine :labels="monthLabels" :values="monthValues" /></section>
        <section class="panel"><h2>TOP10 社区</h2><RankList :items="communityRank" /></section>
        <section class="panel"><h2>四分类占比</h2><WastePieChart :data="typeShare" /></section>
      </div>
    </section>
  </ScreenAdapter>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink } from 'vue-router';
import RecyclingBarChart from '@/components/charts/RecyclingBarChart.vue';
import TrendLine from '@/components/charts/TrendLine.vue';
import WastePieChart from '@/components/charts/WastePieChart.vue';
import DataCard from '@/components/common/DataCard.vue';
import RankList from '@/components/common/RankList.vue';
import ScreenAdapter from '@/components/common/ScreenAdapter.vue';
import { useWasteData } from '@/hooks/useWasteData';

const { stats, complianceByLocation, monthlyTrend, typeShare, communityRank } = useWasteData();
const locations = computed(() => complianceByLocation.value.map((item) => item.location));
const rates = computed(() => complianceByLocation.value.map((item) => item.rate));
const averageRate = computed(() => rates.value.reduce((sum, item) => sum + item, 0) / rates.value.length);
const totalWeight = computed(() => stats.value.reduce((sum, item) => sum + item.weight, 0));
const monthLabels = computed(() => monthlyTrend.value.map((item) => item.month));
const monthValues = computed(() => monthlyTrend.value.map((item) => item.value));
</script>

