import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import { WasteType } from '@/constants/enums';
import { createWasteMock } from '@/mock/wasteMock';
import { toMonth } from '@/utils/format';
import type { WasteCompliance, WasteStats } from '@/types/waste';

export const useWasteStore = defineStore('waste', () => {
  const stats = ref<WasteStats[]>(createWasteMock());

  const complianceByLocation = computed<WasteCompliance[]>(() => {
    const locations = [...new Set(stats.value.map((item) => item.location))];
    return locations.map((location, index) => ({
      location,
      rate: 74 + ((index * 7) % 21)
    }));
  });

  const monthlyTrend = computed(() => {
    const map = new Map<string, number>();
    stats.value.forEach((item) => map.set(toMonth(item.date), (map.get(toMonth(item.date)) || 0) + item.weight));
    return [...map.entries()].map(([month, value]) => ({ month, value: Number(value.toFixed(1)) }));
  });

  const typeShare = computed(() =>
    Object.values(WasteType).map((category) => ({
      category,
      value: Number(stats.value.filter((item) => item.category === category).reduce((sum, item) => sum + item.weight, 0).toFixed(1))
    }))
  );

  const communityRank = computed(() =>
    [...complianceByLocation.value].sort((a, b) => b.rate - a.rate).map((item) => ({ name: item.location, value: item.rate, extra: '达标率' }))
  );

  return {
    stats,
    complianceByLocation,
    monthlyTrend,
    typeShare,
    communityRank
  };
});

