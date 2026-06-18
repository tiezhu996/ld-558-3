<template>
  <ScreenAdapter>
    <section class="screen">
      <header class="page-header"><div><p>Recycling Credit Exchange</p><h1>回收积分大屏</h1></div><RouterLink to="/">返回主屏</RouterLink></header>
      <div class="metric-row">
        <DataCard label="累计积分" :value="totalPoints" suffix=" pts" />
        <DataCard label="回收流水" :value="credits.length" suffix=" 笔" />
        <DataCard label="回收品类" :value="itemStats.length" suffix=" 类" />
      </div>
      <div class="dashboard-grid">
        <section class="panel"><h2>积分排行榜</h2><RankList :items="rankList" /></section>
        <section class="panel wide"><h2>兑换趋势</h2><TrendLine :labels="trendLabels" :values="trendValues" area /></section>
        <section class="panel wide"><h2>回收物品统计</h2><RecyclingBarChart :labels="itemLabels" :values="itemValues" /></section>
        <section class="panel"><h2>实时积分流水</h2><ul class="flow"><li v-for="item in credits.slice(0, 9)" :key="`${item.userId}-${item.redeemedAt}-${item.item}`">{{ item.userId }} 回收 {{ item.item }} +{{ item.points }}</li></ul></section>
      </div>
    </section>
  </ScreenAdapter>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink } from 'vue-router';
import RecyclingBarChart from '@/components/charts/RecyclingBarChart.vue';
import TrendLine from '@/components/charts/TrendLine.vue';
import DataCard from '@/components/common/DataCard.vue';
import RankList from '@/components/common/RankList.vue';
import ScreenAdapter from '@/components/common/ScreenAdapter.vue';
import { useRecyclingData } from '@/hooks/useRecyclingData';

const { credits, totalPoints, rankList, exchangeTrend, itemStats } = useRecyclingData();
const trendLabels = computed(() => exchangeTrend.value.map((item) => item.month));
const trendValues = computed(() => exchangeTrend.value.map((item) => item.value));
const itemLabels = computed(() => itemStats.value.map((item) => item.item));
const itemValues = computed(() => itemStats.value.map((item) => item.value));
</script>

