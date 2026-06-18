import { storeToRefs } from 'pinia';
import { useCharityStore } from '@/stores/charityStore';

export function useCharityData() {
  const store = useCharityStore();
  const refs = storeToRefs(store);

  return {
    ...refs,
    donate: store.donate
  };
}

