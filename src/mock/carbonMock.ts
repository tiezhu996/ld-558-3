import { CarbonCategory } from '@/constants/enums';
import type { CarbonFootprint } from '@/types/carbon';

const categories = Object.values(CarbonCategory);
const sources = ['metro-card', 'smart-meter', 'water-meter', 'green-diet-log', 'eco-shop'];

export function createCarbonMock(): CarbonFootprint[] {
  return Array.from({ length: 90 }, (_, index) => {
    const category = categories[index % categories.length];
    const date = new Date(2026, index % 12, (index % 27) + 1);

    return {
      id: `cf-${index + 1}`,
      userId: `U${(index % 18) + 100}`,
      category,
      amount: Number((18 + (index % 11) * 7 + Math.random() * 18).toFixed(1)),
      unit: 'kgCO2e',
      date: date.toISOString().slice(0, 10),
      source: sources[index % sources.length]
    };
  });
}

export function createRealtimeCarbon(base: number): number {
  return Number((base + Math.random() * 12 - 4).toFixed(1));
}

