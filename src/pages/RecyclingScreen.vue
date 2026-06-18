<template>
  <ScreenAdapter>
    <section class="screen">
      <header class="page-header">
        <div><p>Recycling Credit Exchange</p><h1>回收积分大屏</h1></div>
        <RouterLink to="/">返回主屏</RouterLink>
      </header>
      <div class="metric-row">
        <DataCard label="累计积分" :value="totalPoints" suffix=" pts" />
        <DataCard label="剩余积分" :value="remainingPoints" suffix=" pts" :hint="redeemedHint" />
        <DataCard label="回收流水" :value="credits.length" suffix=" 笔" />
        <DataCard label="兑换记录" :value="redeemRecords.length" suffix=" 笔" />
      </div>
      <div class="dashboard-grid">
        <section class="panel wide"><h2>积分兑换中心</h2>
          <div class="redeem-grid">
            <div
              v-for="item in redeemItems"
              :key="item.id"
              class="redeem-card"
              :class="{ disabled: item.cost > remainingPoints || item.stock <= 0, selected: selectedItem?.id === item.id }"
              @click="handleSelectItem(item)"
            >
              <div class="redeem-icon">{{ item.icon }}</div>
              <div class="redeem-info">
                <h3>{{ item.name }}</h3>
                <p>{{ item.description }}</p>
                <div class="redeem-meta">
                  <span class="cost">{{ item.cost }} pts</span>
                  <span class="stock">库存 {{ item.stock }}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="redeem-action">
            <div v-if="selectedItem" class="selected-info">
              <span>已选：{{ selectedItem.icon }} {{ selectedItem.name }} · {{ selectedItem.cost }} pts</span>
            </div>
            <button class="redeem-btn" :disabled="!selectedItem" @click="openConfirmDialog">立即兑换</button>
          </div>
        </section>
        <section class="panel"><h2>积分排行榜</h2><RankList :items="rankList" /></section>
        <section class="panel"><h2>兑换记录</h2>
          <ul class="flow redeem-flow">
            <li v-for="record in redeemRecords.slice(0, 10)" :key="record.id">
              <span class="user">{{ record.userId }}</span>
              <span class="item-name">{{ record.itemName }}</span>
              <span class="cost-neg">-{{ record.cost }}</span>
            </li>
          </ul>
        </section>
        <section class="panel wide"><h2>兑换趋势</h2><TrendLine :labels="trendLabels" :values="trendValues" area /></section>
        <section class="panel wide"><h2>回收物品统计</h2><RecyclingBarChart :labels="itemLabels" :values="itemValues" /></section>
        <section class="panel"><h2>实时积分流水</h2>
          <ul class="flow">
            <li v-for="(item, idx) in credits.slice(0, 9)" :key="idx">
              {{ item.userId }} 回收 {{ item.item }} +{{ item.points }}
            </li>
          </ul>
        </section>
      </div>

      <div v-if="showDialog" class="dialog-mask" @click.self="closeConfirmDialog">
        <div class="dialog">
          <h3>确认兑换</h3>
          <div v-if="selectedItem" class="dialog-content">
            <div class="dialog-icon">{{ selectedItem.icon }}</div>
            <p class="dialog-name">{{ selectedItem.name }}</p>
            <p class="dialog-desc">{{ selectedItem.description }}</p>
            <div class="dialog-points">
              <span>当前积分：{{ remainingPoints }} pts</span>
              <span>兑换消耗：<strong>{{ selectedItem.cost }} pts</strong></span>
              <span>兑换后剩余：<strong class="remain">{{ remainingPoints - selectedItem.cost }} pts</strong></span>
            </div>
          </div>
          <p v-if="dialogMessage" :class="['dialog-msg', dialogSuccess ? 'success' : 'error']">{{ dialogMessage }}</p>
          <div class="dialog-actions">
            <button class="btn-secondary" @click="closeConfirmDialog">{{ dialogSuccess ? '关闭' : '取消' }}</button>
            <button v-if="!dialogSuccess" class="btn-primary" @click="handleRedeem">确认兑换</button>
          </div>
        </div>
      </div>
    </section>
  </ScreenAdapter>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { RouterLink } from 'vue-router';
import RecyclingBarChart from '@/components/charts/RecyclingBarChart.vue';
import TrendLine from '@/components/charts/TrendLine.vue';
import DataCard from '@/components/common/DataCard.vue';
import RankList from '@/components/common/RankList.vue';
import ScreenAdapter from '@/components/common/ScreenAdapter.vue';
import { useRecyclingData } from '@/hooks/useRecyclingData';
import type { RedeemItem } from '@/types/recycling';

const {
  credits,
  redeemItems,
  redeemRecords,
  totalPoints,
  redeemedPoints,
  remainingPoints,
  rankList,
  exchangeTrend,
  itemStats,
  redeem
} = useRecyclingData();

const trendLabels = computed(() => exchangeTrend.value.map((item) => item.month));
const trendValues = computed(() => exchangeTrend.value.map((item) => item.value));
const itemLabels = computed(() => itemStats.value.map((item) => item.item));
const itemValues = computed(() => itemStats.value.map((item) => item.value));
const redeemedHint = computed(() => '已兑换 ' + redeemedPoints.value + ' pts');

const selectedItem = ref<RedeemItem | null>(null);
const showDialog = ref(false);
const dialogMessage = ref('');
const dialogSuccess = ref(false);

function handleSelectItem(item: RedeemItem) {
  if (item.cost > remainingPoints.value || item.stock <= 0) return;
  selectedItem.value = selectedItem.value?.id === item.id ? null : item;
}

function openConfirmDialog() {
  if (!selectedItem.value) return;
  dialogMessage.value = '';
  dialogSuccess.value = false;
  showDialog.value = true;
}

function closeConfirmDialog() {
  showDialog.value = false;
  if (dialogSuccess.value) {
    selectedItem.value = null;
  }
}

function handleRedeem() {
  if (!selectedItem.value) return;
  const result = redeem(selectedItem.value, 'U100');
  dialogMessage.value = result.message;
  dialogSuccess.value = result.success;
}
</script>

<style scoped lang="scss">
.metric-row {
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.redeem-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.7rem;
  margin-bottom: 0.9rem;
}

.redeem-card {
  display: flex;
  gap: 0.7rem;
  padding: 0.8rem;
  border: 1px solid rgba(133, 221, 160, 0.2);
  background: rgba(218, 246, 213, 0.04);
  cursor: pointer;
  transition: all 0.2s;

  &:hover:not(.disabled) {
    border-color: rgba(125, 216, 125, 0.6);
    background: rgba(125, 216, 125, 0.08);
  }

  &.selected {
    border-color: var(--accent);
    background: rgba(125, 216, 125, 0.14);
    box-shadow: 0 0 18px rgba(125, 216, 125, 0.2);
  }

  &.disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }
}

.redeem-icon {
  font-size: 2rem;
  line-height: 1;
  flex-shrink: 0;
  width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(125, 216, 125, 0.1);
  border-radius: 50%;
}

.redeem-info {
  flex: 1;
  min-width: 0;

  h3 {
    margin: 0 0 0.2rem;
    font-size: 0.95rem;
    color: var(--text);
  }

  p {
    margin: 0 0 0.35rem;
    font-size: 0.75rem;
    color: var(--muted);
    line-height: 1.4;
  }
}

.redeem-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .cost {
    color: var(--accent);
    font-weight: 700;
    font-size: 0.9rem;
  }

  .stock {
    color: var(--muted);
    font-size: 0.75rem;
  }
}

.redeem-action {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 0.7rem;
  border-top: 1px solid rgba(133, 221, 160, 0.15);

  .selected-info {
    color: var(--accent);
    font-size: 0.9rem;
  }
}

.redeem-btn {
  padding: 0.6rem 1.6rem;
  font-size: 0.9rem;
  font-weight: 700;
  color: #071b17;
  background: linear-gradient(135deg, var(--accent), #5fc85f);
  border: none;
  cursor: pointer;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 4px 14px rgba(125, 216, 125, 0.4);
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
}

.redeem-flow {
  li {
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    gap: 0.6rem;
  }

  .user {
    color: var(--text);
    font-weight: 600;
  }

  .item-name {
    color: var(--muted);
  }

  .cost-neg {
    color: #f2c94c;
    font-weight: 700;
  }
}

.dialog-mask {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.65);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
}

.dialog {
  width: 28rem;
  max-width: 92vw;
  padding: 1.6rem;
  background: linear-gradient(145deg, rgba(18, 58, 44, 0.98), rgba(12, 35, 32, 0.98));
  border: 1px solid rgba(133, 221, 160, 0.3);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);

  h3 {
    margin: 0 0 1.2rem;
    text-align: center;
    font-size: 1.3rem;
    color: var(--accent);
  }
}

.dialog-content {
  text-align: center;

  .dialog-icon {
    font-size: 3rem;
    margin-bottom: 0.6rem;
  }

  .dialog-name {
    margin: 0 0 0.3rem;
    font-size: 1.1rem;
    font-weight: 700;
    color: var(--text);
  }

  .dialog-desc {
    margin: 0 0 1rem;
    color: var(--muted);
    font-size: 0.85rem;
  }
}

.dialog-points {
  display: grid;
  gap: 0.45rem;
  padding: 0.9rem;
  background: rgba(218, 246, 213, 0.05);
  margin-bottom: 0.8rem;
  text-align: left;
  font-size: 0.88rem;

  strong {
    color: var(--gold);
  }

  .remain {
    color: var(--accent);
  }
}

.dialog-msg {
  margin: 0 0 1rem;
  text-align: center;
  font-size: 0.9rem;
  font-weight: 600;

  &.success {
    color: var(--accent);
  }

  &.error {
    color: #ff6b6b;
  }
}

.dialog-actions {
  display: flex;
  gap: 0.7rem;
  justify-content: center;
}

.btn-primary,
.btn-secondary {
  padding: 0.55rem 1.4rem;
  font-size: 0.88rem;
  font-weight: 600;
  cursor: pointer;
  border: none;
  transition: all 0.2s;
}

.btn-primary {
  color: #071b17;
  background: linear-gradient(135deg, var(--accent), #5fc85f);

  &:hover {
    box-shadow: 0 4px 14px rgba(125, 216, 125, 0.4);
  }
}

.btn-secondary {
  color: var(--text);
  background: rgba(218, 246, 213, 0.08);
  border: 1px solid rgba(133, 221, 160, 0.3);

  &:hover {
    background: rgba(218, 246, 213, 0.15);
  }
}

@media (max-width: 980px) {
  .metric-row {
    grid-template-columns: 1fr;
  }

  .redeem-grid {
    grid-template-columns: 1fr;
  }
}
</style>

