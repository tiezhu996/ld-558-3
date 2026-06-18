import type { ProjectStatus } from '@/constants/enums';

export interface CharityProject {
  id: string;
  name: string;
  description: string;
  targetAmount: number;
  currentAmount: number;
  participants: number;
  startDate: string;
  endDate: string;
  status: ProjectStatus;
}

export interface CharityDonationRank {
  name: string;
  value: number;
  extra?: string;
}
