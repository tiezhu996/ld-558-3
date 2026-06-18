<template>
  <div ref="chartRef" class="chart"></div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue';
import * as echarts from 'echarts';

const props = defineProps<{
  value: number;
  target: number;
}>();

const chartRef = ref<HTMLDivElement>();
let chart: echarts.ECharts | undefined;

function render(): void {
  chart?.setOption({
    tooltip: { formatter: '{a}<br />{c} kgCO2e' },
    series: [
      {
        name: '碳排放',
        type: 'gauge',
        min: 0,
        max: 1600,
        progress: { show: true, width: 16, itemStyle: { color: '#7dd87d' } },
        axisLine: { lineStyle: { width: 16, color: [[1, 'rgba(185,215,193,0.18)']] } },
        axisTick: { show: false },
        splitLine: { lineStyle: { color: '#8fcf9d' } },
        axisLabel: { color: '#b9d7c1' },
        pointer: { width: 4, itemStyle: { color: '#f2c94c' } },
        title: { color: '#d9f5df', offsetCenter: [0, '62%'] },
        detail: { formatter: '{value}', color: '#f2c94c', fontSize: 28, offsetCenter: [0, '34%'] },
        data: [{ value: props.value, name: `目标完成 ${Math.round(props.target)}%` }]
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

watch(() => [props.value, props.target], render);
onUnmounted(() => {
  window.removeEventListener('resize', resize);
  chart?.dispose();
});
</script>

<style scoped>
.chart {
  width: 100%;
  height: 100%;
  min-height: 16rem;
}
</style>

