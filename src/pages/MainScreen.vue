<template>
  <ScreenAdapter>
    <section class="screen page-main">
      <header class="page-header">
        <div>
          <p>GreenLife Carbon Neutral Center</p>
          <h1>碳中和主屏</h1>
        </div>
        <nav>
          <RouterLink to="/waste">垃圾分类</RouterLink>
          <RouterLink to="/recycling">回收积分</RouterLink>
          <RouterLink to="/charity">公益项目</RouterLink>
          <RouterLink to="/personal">个人档案</RouterLink>
        </nav>
      </header>

      <div class="metric-row">
        <DataCard label="城市实时碳排" :value="realtimeAmount" :digits="1" suffix=" kgCO2e" hint="模拟实时数据" />
        <DataCard label="累计碳足迹" :value="totalAmount" :digits="1" suffix=" kgCO2e" />
        <DataCard label="减排目标进度" :value="targetProgress" suffix="%" hint="相对月度目标" />
      </div>

      <div class="dashboard-grid">
        <section class="panel"><h2>区域碳排放热力</h2><HeatMap /></section>
        <section class="panel wide"><h2>月度碳排放趋势</h2><TrendLine :labels="monthLabels" :values="monthValues" /></section>
        <section class="panel"><h2>个人碳足迹</h2><CarbonGauge :value="realtimeAmount" :target="targetProgress" /></section>
        <section class="panel"><h2>垃圾分类联动</h2><WastePieChart :data="typeShare" /></section>
        <section class="panel"><h2>分类碳足迹</h2><RecyclingBarChart :labels="categoryLabels" :values="categoryValues" /></section>
      </div>
    </section>
  </ScreenAdapter>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink } from 'vue-router';
import CarbonGauge from '@/components/charts/CarbonGauge.vue';
import HeatMap from '@/components/charts/HeatMap.vue';
import RecyclingBarChart from '@/components/charts/RecyclingBarChart.vue';
import TrendLine from '@/components/charts/TrendLine.vue';
import WastePieChart from '@/components/charts/WastePieChart.vue';
import DataCard from '@/components/common/DataCard.vue';
import ScreenAdapter from '@/components/common/ScreenAdapter.vue';
import { CarbonCategoryLabel } from '@/constants/enums';
import { useCarbonData } from '@/hooks/useCarbonData';
import { useMockData } from '@/hooks/useMockData';
import { useWasteData } from '@/hooks/useWasteData';

useMockData();
const { realtimeAmount, totalAmount, targetProgress, monthlySummary, categorySummary } = useCarbonData();
const { typeShare } = useWasteData();

const monthLabels = computed(() => monthlySummary.value.map((item) => item.month));
const monthValues = computed(() => monthlySummary.value.map((item) => item.amount));
const categoryLabels = computed(() => categorySummary.value.map((item) => CarbonCategoryLabel[item.category]));
const categoryValues = computed(() => categorySummary.value.map((item) => item.amount));
</script>

