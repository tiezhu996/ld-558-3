import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import { createRecyclingMock } from '@/mock/recyclingMock';
import { recordAuditLog } from '@/utils/audit-log';
import { toMonth } from '@/utils/format';
import type { RecyclingCredit, RecyclingRank } from '@/types/recycling';

export const useRecyclingStore = defineStore('recycling', () => {
  const credits = ref<RecyclingCredit[]>(createRecyclingMock());

  const totalPoints = computed(() => credits.value.reduce((sum, item) => sum + item.points, 0));

  const rankList = computed<RecyclingRank[]>(() => {
    const map = new Map<string, number>();
    credits.value.forEach((item) => map.set(item.userId, (map.get(item.userId) || 0) + item.points));
    return [...map.entries()]
      .map(([name, value]) => ({ name, value, extra: '积分' }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 10);
  });

  const exchangeTrend = computed(() => {
    const map = new Map<string, number>();
    credits.value.forEach((item) => map.set(toMonth(item.redeemedAt), (map.get(toMonth(item.redeemedAt)) || 0) + item.points));
    return [...map.entries()].map(([month, value]) => ({ month, value }));
  });

  const itemStats = computed(() => {
    const items = [...new Set(credits.value.map((item) => item.item))];
    return items.map((item) => ({
      item,
      value: Number(credits.value.filter((credit) => credit.item === item).reduce((sum, credit) => sum + credit.weight, 0).toFixed(1))
    }));
  });

  function exchange(record: RecyclingCredit): void {
    credits.value.unshift(record);
    recordAuditLog({
      operator: record.userId,
      action: 'POINT_EXCHANGE',
      detail: record
    });
  }

  return {
    credits,
    totalPoints,
    rankList,
    exchangeTrend,
    itemStats,
    exchange
  };
});

