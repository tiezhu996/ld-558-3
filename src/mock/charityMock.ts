import { ProjectStatus } from '@/constants/enums';
import type { CharityProject } from '@/types/charity';

const statuses = Object.values(ProjectStatus);

export function createCharityMock(): CharityProject[] {
  return [
    '城市屋顶花园',
    '河岸湿地修复',
    '社区旧物循环站',
    '儿童绿色课堂',
    '零碳通勤挑战',
    '海岸清洁行动'
  ].map((name, index) => {
    const targetAmount = 50000 + index * 18000;
    const currentAmount = index === 5 ? targetAmount : Math.round(targetAmount * (0.36 + index * 0.09));

    return {
      id: `cp-${index + 1}`,
      name,
      description: `${name}项目连接居民、学校和志愿者，持续改善城市低碳生活基础设施。`,
      targetAmount,
      currentAmount,
      participants: 240 + index * 87,
      startDate: `2026-${String((index % 6) + 1).padStart(2, '0')}-01`,
      endDate: `2026-${String((index % 6) + 7).padStart(2, '0')}-28`,
      status: statuses[index % statuses.length]
    };
  });
}

