<template>
  <div ref="chartRef" class="chart"></div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import * as echarts from 'echarts';
import { WasteTypeLabel, type WasteType } from '@/constants/enums';
import { useChartTheme } from '@/hooks/useChartTheme';

const props = defineProps<{
  data: Array<{ category: WasteType; value: number }>;
  title?: string;
}>();

const chartRef = ref<HTMLDivElement>();
let chart: echarts.ECharts | undefined;
const { chartPalette, chartTextStyle } = useChartTheme();
const seriesData = computed(() => props.data.map((item) => ({ name: WasteTypeLabel[item.category], value: item.value })));

function render(): void {
  chart?.setOption({
    title: { text: props.title || '', left: 'center', textStyle: { ...chartTextStyle, fontSize: 14 } },
    tooltip: { trigger: 'item' },
    color: chartPalette,
    legend: { bottom: 0, textStyle: { color: '#b9d7c1' } },
    series: [{ type: 'pie', radius: ['48%', '70%'], center: ['50%', '48%'], data: seriesData.value, label: { color: '#d9f5df' } }]
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

watch(seriesData, render, { deep: true });
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

