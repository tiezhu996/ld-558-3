import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import { createRecyclingMock, createRedeemItemsMock, createRedeemRecordsMock } from '@/mock/recyclingMock';
import { recordAuditLog } from '@/utils/audit-log';
import { toMonth } from '@/utils/format';
import type { RecyclingCredit, RecyclingRank, RedeemItem, RedeemRecord } from '@/types/recycling';

export const useRecyclingStore = defineStore('recycling', () => {
  const credits = ref<RecyclingCredit[]>(createRecyclingMock());
  const redeemItems = ref<RedeemItem[]>(createRedeemItemsMock());
  const redeemRecords = ref<RedeemRecord[]>(createRedeemRecordsMock());

  const totalPoints = computed(() => credits.value.reduce((sum, item) => sum + item.points, 0));
  const redeemedPoints = computed(() => redeemRecords.value.filter((r) => r.status === 'success').reduce((sum, item) => sum + item.cost, 0));
  const remainingPoints = computed(() => totalPoints.value - redeemedPoints.value);

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

  function redeem(item: RedeemItem, userId: string): { success: boolean; message: string; record?: RedeemRecord } {
    if (remainingPoints.value < item.cost) {
      return { success: false, message: '剩余积分不足' };
    }
    if (item.stock <= 0) {
      return { success: false, message: '库存不足' };
    }

    const record: RedeemRecord = {
      id: `RD${Date.now()}`,
      userId,
      itemId: item.id,
      itemName: item.name,
      cost: item.cost,
      redeemedAt: new Date().toISOString().slice(0, 10),
      status: 'success'
    };

    redeemRecords.value.unshift(record);

    const targetItem = redeemItems.value.find((i) => i.id === item.id);
    if (targetItem) {
      targetItem.stock -= 1;
    }

    recordAuditLog({
      operator: userId,
      action: 'REDEEM_POINTS',
      detail: record
    });

    return { success: true, message: '兑换成功', record };
  }

  return {
    credits,
    redeemItems,
    redeemRecords,
    totalPoints,
    redeemedPoints,
    remainingPoints,
    rankList,
    exchangeTrend,
    itemStats,
    exchange,
    redeem
  };
});

