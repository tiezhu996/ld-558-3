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

export interface RedeemItem {
  id: string;
  name: string;
  cost: number;
  description: string;
  icon: string;
  stock: number;
}

export interface RedeemRecord {
  id: string;
  userId: string;
  itemId: string;
  itemName: string;
  cost: number;
  redeemedAt: string;
  status: 'success' | 'pending' | 'failed';
}

