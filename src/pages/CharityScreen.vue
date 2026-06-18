<template>
  <ScreenAdapter>
    <section class="screen">
      <header class="page-header"><div><p>Public Benefit Projects</p><h1>公益项目屏</h1></div><RouterLink to="/">返回主屏</RouterLink></header>
      <div class="metric-row">
        <DataCard label="项目募集" :value="totalRaised" suffix=" 元" />
        <DataCard label="参与人数" :value="totalParticipants" suffix=" 人" />
        <DataCard label="项目数量" :value="projects.length" suffix=" 个" />
      </div>
      <div class="dashboard-grid">
        <section class="panel wide"><h2>项目进度</h2><CharityProgressChart :projects="projects" /></section>
        <section class="panel"><h2>捐赠排行</h2><RankList :items="donationRank" /></section>
        <section class="panel wide"><h2>参与趋势</h2><TrendLine :labels="trendLabels" :values="trendValues" /></section>
        <section class="panel"><h2>项目状态分布</h2><RecyclingBarChart :labels="statusLabels" :values="statusValues" /></section>
      </div>
    </section>
  </ScreenAdapter>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink } from 'vue-router';
import CharityProgressChart from '@/components/charts/CharityProgressChart.vue';
import RecyclingBarChart from '@/components/charts/RecyclingBarChart.vue';
import TrendLine from '@/components/charts/TrendLine.vue';
import DataCard from '@/components/common/DataCard.vue';
import RankList from '@/components/common/RankList.vue';
import ScreenAdapter from '@/components/common/ScreenAdapter.vue';
import { ProjectStatusLabel } from '@/constants/enums';
import { useCharityData } from '@/hooks/useCharityData';

const { projects, totalRaised, totalParticipants, donationRank, participationTrend, statusDistribution } = useCharityData();
const trendLabels = computed(() => participationTrend.value.map((item) => item.month));
const trendValues = computed(() => participationTrend.value.map((item) => item.value));
const statusLabels = computed(() => statusDistribution.value.map((item) => ProjectStatusLabel[item.status]));
const statusValues = computed(() => statusDistribution.value.map((item) => item.value));
</script>

