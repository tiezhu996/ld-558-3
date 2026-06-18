import { computed, onMounted, onUnmounted, ref } from 'vue';

export function useAutoResize(baseWidth = 1920, baseHeight = 1080) {
  const width = ref(window.innerWidth);
  const height = ref(window.innerHeight);

  const scale = computed(() => Math.min(width.value / baseWidth, height.value / baseHeight));

  function updateSize(): void {
    width.value = window.innerWidth;
    height.value = window.innerHeight;
    document.documentElement.style.setProperty('--screen-scale', String(scale.value));
    document.documentElement.style.fontSize = `${16 * scale.value}px`;
  }

  onMounted(() => {
    updateSize();
    window.addEventListener('resize', updateSize);
  });

  onUnmounted(() => window.removeEventListener('resize', updateSize));

  return {
    width,
    height,
    scale,
    updateSize
  };
}

