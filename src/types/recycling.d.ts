export interface RecyclingCredit {
  userId: string;
  item: string;
  weight: number;
  points: number;
  redeemedAt: string;
  exchangeItem: string;
}

export interface RecyclingRank {
  name: string;
  value: number;
  extra?: string;
}

