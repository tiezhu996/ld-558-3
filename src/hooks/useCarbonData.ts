import { storeToRefs } from 'pinia';
import { useCarbonStore } from '@/stores/carbonStore';

export function useCarbonData() {
  const store = useCarbonStore();
  const refs = storeToRefs(store);

  return {
    ...refs,
    addFootprint: store.addFootprint
  };
}

