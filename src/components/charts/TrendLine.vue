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
  title?: string;
  area?: boolean;
}>();

const chartRef = ref<HTMLDivElement>();
let chart: echarts.ECharts | undefined;
const { chartGrid, chartPalette, chartTextStyle } = useChartTheme();

function render(): void {
  if (!chart) return;
  chart.setOption({
    title: { text: props.title || '', textStyle: { ...chartTextStyle, fontSize: 14 } },
    tooltip: { trigger: 'axis' },
    grid: chartGrid,
    xAxis: { type: 'category', data: props.labels, axisLabel: { color: '#b9d7c1' }, axisLine: { lineStyle: { color: '#426b56' } } },
    yAxis: { type: 'value', axisLabel: { color: '#b9d7c1' }, splitLine: { lineStyle: { color: 'rgba(185,215,193,0.12)' } } },
    series: [
      {
        type: 'line',
        smooth: true,
        symbolSize: 6,
        data: props.values,
        lineStyle: { width: 3, color: chartPalette[0] },
        areaStyle: props.area ? { color: 'rgba(125,216,125,0.18)' } : undefined
      }
    ]
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

watch(() => [props.labels, props.values, props.title, props.area], render, { deep: true });
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

