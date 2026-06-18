# GreenLife 环保与可持续生活平台

```bash
npm install
npm run dev
```

访问地址：http://localhost:38407

**项目类型标签**：数据可视化大屏（纯前端）

GreenLife 是面向城市居民的碳中和与绿色生活数据可视化大屏系统，通过模拟实时数据展示碳排放趋势、垃圾分类达标率、回收积分排行和公益项目进度。

## 项目主要功能

- `/` 碳中和主屏：展示城市实时碳排、区域热力、月度趋势、个人碳足迹与减排进度。
- `/waste` 垃圾分类分析屏：展示区域达标率、月度趋势、社区排行和四分类占比。
- `/recycling` 回收积分大屏：展示积分排行榜、兑换趋势、回收物品统计和实时积分流水。
- `/charity` 公益项目屏：展示项目进度、捐赠排行、参与趋势和状态分布。
- `/personal` 个人碳档案：展示个人月度碳足迹、积分、减排建议和成就徽章。

## 技术栈

| 类别 | 技术 |
| --- | --- |
| 前端框架 | Vue 3 + TypeScript + Composition API |
| 构建工具 | Vite |
| 状态管理 | Pinia |
| 路由 | Vue Router 4 |
| 图表 | ECharts 5 |
| HTTP | Axios + 统一响应拦截器 |
| 样式 | SCSS + CSS 变量 |
| UI 提示 | Element Plus |

## 项目目录结构

```text
src/
├── stores/
│   ├── carbonStore.ts
│   ├── wasteStore.ts
│   ├── recyclingStore.ts
│   └── charityStore.ts
├── types/
│   ├── carbon.d.ts
│   ├── waste.d.ts
│   ├── recycling.d.ts
│   └── charity.d.ts
├── constants/
│   ├── enums.ts
│   ├── chart-theme.ts
│   └── carbon-factors.ts
├── components/
│   ├── charts/
│   │   ├── CarbonGauge.vue
│   │   ├── WastePieChart.vue
│   │   ├── RecyclingBarChart.vue
│   │   ├── CharityProgressChart.vue
│   │   ├── TrendLine.vue
│   │   └── HeatMap.vue
│   └── common/
│       ├── DataCard.vue
│       ├── RankList.vue
│       ├── AnimatedNumber.vue
│       └── ScreenAdapter.vue
├── hooks/
│   ├── useAutoResize.ts
│   ├── useChartTheme.ts
│   ├── useMockData.ts
│   ├── useCarbonData.ts
│   ├── useWasteData.ts
│   ├── useRecyclingData.ts
│   └── useCharityData.ts
├── pages/
│   ├── MainScreen.vue
│   ├── WasteAnalysis.vue
│   ├── RecyclingScreen.vue
│   ├── CharityScreen.vue
│   └── PersonalProfile.vue
├── mock/
│   ├── carbonMock.ts
│   ├── wasteMock.ts
│   ├── recyclingMock.ts
│   └── charityMock.ts
├── router/
│   └── index.ts
├── utils/
│   ├── request.ts
│   ├── audit-log.ts
│   └── format.ts
├── styles/
│   ├── global.scss
│   └── variables.scss
├── App.vue
└── main.ts
```

## 枚举定义与使用位置对照表

所有枚举唯一来源：`src/constants/enums.ts`。

| 枚举 | 成员 | 使用位置 |
| --- | --- | --- |
| `CarbonCategory` | `TRANSPORT` / `DIET` / `ELECTRICITY` / `WATER` / `SHOPPING` | `src/types/carbon.d.ts`、`src/constants/carbon-factors.ts`、`src/mock/carbonMock.ts`、`src/stores/carbonStore.ts`、`src/pages/MainScreen.vue` |
| `WasteType` | `RECYCLABLE` / `HAZARDOUS` / `WET` / `DRY` | `src/types/waste.d.ts`、`src/mock/wasteMock.ts`、`src/stores/wasteStore.ts`、`src/components/charts/WastePieChart.vue` |
| `ProjectStatus` | `UPCOMING` / `ACTIVE` / `COMPLETED` | `src/types/charity.d.ts`、`src/mock/charityMock.ts`、`src/stores/charityStore.ts`、`src/pages/CharityScreen.vue` |
| `CarbonCategoryLabel` | 碳足迹中文标签 | `src/pages/MainScreen.vue` |
| `WasteTypeLabel` | 垃圾分类中文标签 | `src/components/charts/WastePieChart.vue` |
| `ProjectStatusLabel` | 公益项目状态中文标签 | `src/pages/CharityScreen.vue` |

## 横切关注点说明

- 大屏适配方案：以 1920x1080 为基准，`ScreenAdapter` 统一承载页面；`useAutoResize.ts` 监听窗口变化，写入 `--screen-scale` 和根字号；所有 ECharts 组件监听 `resize` 并调用实例 `resize()`。
- Mock 数据策略：`src/mock/*Mock.ts` 按核心实体拆分生成器；Pinia store 统一持有 mock 数据与派生统计；`useMockData.ts` 使用定时器模拟碳排实时变化，页面通过 hooks 消费 store。
- 统一异常处理：`src/utils/request.ts` 封装 Axios 实例，响应拦截器统一处理 HTTP 错误和业务错误码，并调用 `ElMessage.error()`。
- 操作日志：`src/utils/audit-log.ts` 记录碳足迹记录、积分兑换、公益项目捐赠等关键写操作。

## 文件结构强制清单

提示词强制清单中的文件均已创建，并在本项目中按实体拆分为 `types`、`stores`、`hooks`、`mock`、`pages`、`components/charts` 和 `utils`。

## License

MIT
