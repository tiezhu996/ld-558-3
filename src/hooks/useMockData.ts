import { onMounted, onUnmounted } from 'vue';
import { useCarbonStore } from '@/stores/carbonStore';

export function useMockData() {
  const carbonStore = useCarbonStore();
  let timer: number | undefined;

  onMounted(() => {
    timer = window.setInterval(() => {
      carbonStore.tickRealtime();
    }, 2200);
  });

  onUnmounted(() => {
    if (timer) window.clearInterval(timer);
  });
}

