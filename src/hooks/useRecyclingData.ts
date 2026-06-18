import { storeToRefs } from 'pinia';
import { useRecyclingStore } from '@/stores/recyclingStore';

export function useRecyclingData() {
  const store = useRecyclingStore();
  const refs = storeToRefs(store);

  return {
    ...refs,
    exchange: store.exchange
  };
}

