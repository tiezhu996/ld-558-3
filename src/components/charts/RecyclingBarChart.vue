<template>
  <div ref="chartRef" class="chart"></div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue';
import * as echarts from 'echarts';
import { useChartTheme } from '@/hooks/useChartTheme';

const props = defineProps<{
  labels: string[];
  values: number[];
}>();

const chartRef = ref<HTMLDivElement>();
let chart: echarts.ECharts | undefined;
const { chartGrid } = useChartTheme();

function render(): void {
  chart?.setOption({
    tooltip: { trigger: 'axis' },
    grid: chartGrid,
    xAxis: { type: 'category', data: props.labels, axisLabel: { color: '#b9d7c1' } },
    yAxis: { type: 'value', axisLabel: { color: '#b9d7c1' }, splitLine: { lineStyle: { color: 'rgba(185,215,193,0.12)' } } },
    series: [{ type: 'bar', data: props.values, barWidth: 20, itemStyle: { color: '#36b37e' } }]
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

watch(() => [props.labels, props.values], render, { deep: true });
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

