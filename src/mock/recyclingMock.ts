import type { RecyclingCredit, RedeemItem, RedeemRecord } from '@/types/recycling';

const items = ['纸箱', '塑料瓶', '旧衣物', '金属罐', '玻璃瓶', '小家电'];
const exchanges = ['地铁券', '环保袋', '绿植券', '公益捐赠', '社区咖啡'];

export function createRecyclingMock(): RecyclingCredit[] {
  return Array.from({ length: 72 }, (_, index) => {
    const weight = Number((1 + (index % 8) * 0.8 + Math.random()).toFixed(1));

    return {
      userId: `U${(index % 24) + 100}`,
      item: items[index % items.length],
      weight,
      points: Math.round(weight * 18 + (index % 5) * 4),
      redeemedAt: new Date(2026, index % 12, (index % 25) + 1).toISOString().slice(0, 10),
      exchangeItem: exchanges[index % exchanges.length]
    };
  });
}

export function createRedeemItemsMock(): RedeemItem[] {
  return [
    { id: 'R001', name: '地铁券', cost: 200, description: '城市地铁单程兑换券', icon: '🚇', stock: 999 },
    { id: 'R002', name: '环保袋', cost: 150, description: '可循环使用帆布袋', icon: '🛍️', stock: 500 },
    { id: 'R003', name: '绿植券', cost: 300, description: '社区园艺中心兑换券', icon: '🌱', stock: 200 },
    { id: 'R004', name: '公益捐赠', cost: 100, description: '捐赠积分用于环保公益', icon: '💚', stock: 9999 },
    { id: 'R005', name: '社区咖啡', cost: 250, description: '合作咖啡店兑换券', icon: '☕', stock: 150 },
    { id: 'R006', name: '优惠券包', cost: 400, description: '多商户联合优惠券', icon: '🎁', stock: 300 }
  ];
}

export function createRedeemRecordsMock(): RedeemRecord[] {
  const userIds = Array.from({ length: 12 }, (_, i) => `U${i + 100}`);
  const redeemItems = createRedeemItemsMock();
  return Array.from({ length: 18 }, (_, index) => {
    const item = redeemItems[index % redeemItems.length];
    return {
      id: `RD${String(index + 1).padStart(4, '0')}`,
      userId: userIds[index % userIds.length],
      itemId: item.id,
      itemName: item.name,
      cost: item.cost,
      redeemedAt: new Date(2026, 5 - (index % 6), (index % 27) + 1).toISOString().slice(0, 10),
      status: 'success'
    };
  });
}

