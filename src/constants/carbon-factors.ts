import { CarbonCategory } from './enums';

export const CarbonFactors: Record<CarbonCategory, number> = {
  [CarbonCategory.TRANSPORT]: 0.21,
  [CarbonCategory.DIET]: 0.34,
  [CarbonCategory.ELECTRICITY]: 0.58,
  [CarbonCategory.WATER]: 0.09,
  [CarbonCategory.SHOPPING]: 0.42
};

export const MonthlyReductionTarget = 420;

