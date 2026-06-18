import type { WasteType } from '@/constants/enums';

export interface WasteStats {
  date: string;
  category: WasteType;
  weight: number;
  location: string;
  collectorId: string;
}

export interface WasteCompliance {
  location: string;
  rate: number;
}

