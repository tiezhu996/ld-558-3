import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import { ProjectStatus } from '@/constants/enums';
import { createCharityMock } from '@/mock/charityMock';
import { recordAuditLog } from '@/utils/audit-log';
import type { CharityDonationRank, CharityProject } from '@/types/charity';

export const useCharityStore = defineStore('charity', () => {
  const projects = ref<CharityProject[]>(createCharityMock());

  const totalRaised = computed(() => projects.value.reduce((sum, item) => sum + item.currentAmount, 0));
  const totalParticipants = computed(() => projects.value.reduce((sum, item) => sum + item.participants, 0));

  const donationRank = computed<CharityDonationRank[]>(() =>
    [...projects.value]
      .sort((a, b) => b.currentAmount - a.currentAmount)
      .map((item) => ({ name: item.name, value: item.currentAmount, extra: `${item.participants}人` }))
  );

  const participationTrend = computed(() =>
    projects.value.map((item) => ({
      month: item.startDate.slice(0, 7),
      value: item.participants
    }))
  );

  const statusDistribution = computed(() =>
    Object.values(ProjectStatus).map((status) => ({
      status,
      value: projects.value.filter((project) => project.status === status).length
    }))
  );

  function donate(projectId: string, amount: number, operator: string): void {
    const project = projects.value.find((item) => item.id === projectId);
    if (!project) return;
    project.currentAmount += amount;
    project.participants += 1;
    recordAuditLog({
      operator,
      action: 'CHARITY_DONATION',
      detail: { projectId, amount }
    });
  }

  return {
    projects,
    totalRaised,
    totalParticipants,
    donationRank,
    participationTrend,
    statusDistribution,
    donate
  };
});

