import { WasteType } from '@/constants/enums';
import type { WasteStats } from '@/types/waste';

const types = Object.values(WasteType);
const locations = ['滨江社区', '梧桐街区', '云岭花园', '湖畔中心', '青荷里', '晨光苑'];

export function createWasteMock(): WasteStats[] {
  return Array.from({ length: 96 }, (_, index) => {
    const date = new Date(2026, index % 12, (index % 26) + 1);

    return {
      date: date.toISOString().slice(0, 10),
      category: types[index % types.length],
      weight: Number((90 + (index % 9) * 13 + Math.random() * 35).toFixed(1)),
      location: locations[index % locations.length],
      collectorId: `C-${(index % 12) + 1}`
    };
  });
}

