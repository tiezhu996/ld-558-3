import type { CarbonCategory } from '@/constants/enums';

export interface CarbonFootprint {
  id: string;
  userId: string;
  category: CarbonCategory;
  amount: number;
  unit: string;
  date: string;
  source: string;
}

export interface CarbonMonthlySummary {
  month: string;
  amount: number;
}

export interface CarbonCategorySummary {
  category: CarbonCategory;
  amount: number;
}

