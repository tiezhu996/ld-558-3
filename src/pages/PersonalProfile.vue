<template>
  <ScreenAdapter>
    <section class="screen">
      <header class="page-header"><div><p>Personal Carbon Profile</p><h1>个人碳档案</h1></div><RouterLink to="/">返回主屏</RouterLink></header>
      <div class="metric-row">
        <DataCard label="个人月均碳排" :value="monthlyAverage" :digits="1" suffix=" kgCO2e" />
        <DataCard label="可用绿色积分" :value="totalPoints" suffix=" pts" />
        <DataCard label="减排进度" :value="targetProgress" suffix="%" />
      </div>
      <div class="dashboard-grid">
        <section class="panel wide"><h2>月度碳足迹</h2><TrendLine :labels="monthLabels" :values="monthValues" /></section>
        <section class="panel"><h2>碳足迹分类</h2><CarbonGauge :value="realtimeAmount" :target="targetProgress" /></section>
        <section class="panel"><h2>减排建议</h2><ul class="suggestions"><li>优先选择轨道交通与步行通勤。</li><li>将高峰用电设备迁移到低碳时段。</li><li>每周设置一次低碳饮食日。</li></ul></section>
        <section class="panel wide"><h2>成就徽章墙</h2><div class="badges"><span>低碳通勤</span><span>回收达人</span><span>节水先锋</span><span>公益伙伴</span><span>绿电家庭</span></div></section>
      </div>
    </section>
  </ScreenAdapter>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink } from 'vue-router';
import CarbonGauge from '@/components/charts/CarbonGauge.vue';
import TrendLine from '@/components/charts/TrendLine.vue';
import DataCard from '@/components/common/DataCard.vue';
import ScreenAdapter from '@/components/common/ScreenAdapter.vue';
import { useCarbonData } from '@/hooks/useCarbonData';
import { useRecyclingData } from '@/hooks/useRecyclingData';

const { monthlySummary, realtimeAmount, targetProgress } = useCarbonData();
const { totalPoints } = useRecyclingData();
const monthLabels = computed(() => monthlySummary.value.map((item) => item.month));
const monthValues = computed(() => monthlySummary.value.map((item) => item.amount));
const monthlyAverage = computed(() => monthValues.value.reduce((sum, item) => sum + item, 0) / monthValues.value.length);
</script>
