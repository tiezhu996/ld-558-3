import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import { CarbonCategory } from '@/constants/enums';
import { MonthlyReductionTarget } from '@/constants/carbon-factors';
import { createCarbonMock, createRealtimeCarbon } from '@/mock/carbonMock';
import { recordAuditLog } from '@/utils/audit-log';
import { toMonth } from '@/utils/format';
import type { CarbonCategorySummary, CarbonFootprint, CarbonMonthlySummary } from '@/types/carbon';

export const useCarbonStore = defineStore('carbon', () => {
  const footprints = ref<CarbonFootprint[]>(createCarbonMock());
  const realtimeAmount = ref(1286.4);

  const totalAmount = computed(() => footprints.value.reduce((sum, item) => sum + item.amount, 0));
  const targetProgress = computed(() => Math.min(100, (MonthlyReductionTarget / realtimeAmount.value) * 100));

  const monthlySummary = computed<CarbonMonthlySummary[]>(() => {
    const map = new Map<string, number>();
    footprints.value.forEach((item) => map.set(toMonth(item.date), (map.get(toMonth(item.date)) || 0) + item.amount));
    return [...map.entries()].map(([month, amount]) => ({ month, amount: Number(amount.toFixed(1)) }));
  });

  const categorySummary = computed<CarbonCategorySummary[]>(() =>
    Object.values(CarbonCategory).map((category) => ({
      category,
      amount: Number(
        footprints.value.filter((item) => item.category === category).reduce((sum, item) => sum + item.amount, 0).toFixed(1)
      )
    }))
  );

  function addFootprint(record: CarbonFootprint): void {
    footprints.value.unshift(record);
    recordAuditLog({
      operator: record.userId,
      action: 'CARBON_RECORD',
      detail: record
    });
  }

  function tickRealtime(): void {
    realtimeAmount.value = createRealtimeCarbon(realtimeAmount.value);
  }

  return {
    footprints,
    realtimeAmount,
    totalAmount,
    targetProgress,
    monthlySummary,
    categorySummary,
    addFootprint,
    tickRealtime
  };
});

