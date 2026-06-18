import { storeToRefs } from 'pinia';
import { useWasteStore } from '@/stores/wasteStore';

export function useWasteData() {
  const store = useWasteStore();
  return storeToRefs(store);
}

