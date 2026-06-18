export enum CarbonCategory {
  TRANSPORT = 'TRANSPORT',
  DIET = 'DIET',
  ELECTRICITY = 'ELECTRICITY',
  WATER = 'WATER',
  SHOPPING = 'SHOPPING'
}

export enum WasteType {
  RECYCLABLE = 'RECYCLABLE',
  HAZARDOUS = 'HAZARDOUS',
  WET = 'WET',
  DRY = 'DRY'
}

export enum ProjectStatus {
  UPCOMING = 'UPCOMING',
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED'
}

export const CarbonCategoryLabel: Record<CarbonCategory, string> = {
  [CarbonCategory.TRANSPORT]: '交通',
  [CarbonCategory.DIET]: '饮食',
  [CarbonCategory.ELECTRICITY]: '用电',
  [CarbonCategory.WATER]: '用水',
  [CarbonCategory.SHOPPING]: '购物'
};

export const WasteTypeLabel: Record<WasteType, string> = {
  [WasteType.RECYCLABLE]: '可回收',
  [WasteType.HAZARDOUS]: '有害',
  [WasteType.WET]: '湿垃圾',
  [WasteType.DRY]: '干垃圾'
};

export const ProjectStatusLabel: Record<ProjectStatus, string> = {
  [ProjectStatus.UPCOMING]: '即将开始',
  [ProjectStatus.ACTIVE]: '进行中',
  [ProjectStatus.COMPLETED]: '已完成'
};

