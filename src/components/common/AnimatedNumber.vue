<template>
  <span>{{ display }}</span>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { formatNumber } from '@/utils/format';

const props = withDefaults(
  defineProps<{
    value: number;
    digits?: number;
    suffix?: string;
  }>(),
  {
    digits: 0,
    suffix: ''
  }
);

const current = ref(0);
let frame = 0;

const display = computed(() => `${formatNumber(current.value, props.digits)}${props.suffix}`);

function animateTo(target: number): void {
  cancelAnimationFrame(frame);
  const start = current.value;
  const started = performance.now();

  function step(now: number): void {
    const progress = Math.min(1, (now - started) / 700);
    current.value = start + (target - start) * (1 - Math.pow(1 - progress, 4));
    if (progress < 1) frame = requestAnimationFrame(step);
  }

  frame = requestAnimationFrame(step);
}

watch(() => props.value, animateTo);
onMounted(() => animateTo(props.value));
</script>

