<template>
  <div ref="chartRef" class="chart"></div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import * as echarts from 'echarts';

const chartRef = ref<HTMLDivElement>();
let chart: echarts.ECharts | undefined;

const hours = ['滨江', '梧桐', '云岭', '湖畔', '青荷', '晨光'];
const days = ['交通', '饮食', '用电', '用水', '购物'];
const data = hours.flatMap((_, x) => days.map((__, y) => [x, y, Math.round(20 + x * 12 + y * 9 + Math.random() * 25)]));

function render(): void {
  chart?.setOption({
    tooltip: {},
    grid: { top: 22, left: 58, right: 18, bottom: 36 },
    xAxis: { type: 'category', data: hours, axisLabel: { color: '#b9d7c1' } },
    yAxis: { type: 'category', data: days, axisLabel: { color: '#b9d7c1' } },
    visualMap: { min: 0, max: 130, calculable: true, orient: 'horizontal', left: 'center', bottom: 0, textStyle: { color: '#b9d7c1' } },
    series: [{ type: 'heatmap', data, label: { show: true, color: '#09231e' } }]
  });
}

function resize(): void {
  chart?.resize();
}

onMounted(() => {
  if (!chartRef.value) return;
  chart = echarts.init(chartRef.value);
  render();
  window.addEventListener('resize', resize);
});

onUnmounted(() => {
  window.removeEventListener('resize', resize);
  chart?.dispose();
});
</script>

<style scoped>
.chart {
  width: 100%;
  height: 100%;
  min-height: 15rem;
}
</style>
