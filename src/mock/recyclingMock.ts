import type { RecyclingCredit } from '@/types/recycling';

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

