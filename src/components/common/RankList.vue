<template>
  <ol class="rank-list">
    <li v-for="(item, index) in items" :key="item.name">
      <span class="index">{{ String(index + 1).padStart(2, '0') }}</span>
      <span class="name">{{ item.name }}</span>
      <strong>{{ item.value.toLocaleString('zh-CN') }}</strong>
      <em v-if="item.extra">{{ item.extra }}</em>
    </li>
  </ol>
</template>

<script setup lang="ts">
defineProps<{
  items: Array<{ name: string; value: number; extra?: string }>;
}>();
</script>

<style scoped lang="scss">
.rank-list {
  display: grid;
  gap: 0.52rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

li {
  display: grid;
  grid-template-columns: 2.4rem 1fr auto auto;
  gap: 0.7rem;
  align-items: center;
  min-height: 2.5rem;
  padding: 0.5rem 0.75rem;
  background: rgba(218, 246, 213, 0.055);
  border-left: 3px solid rgba(125, 216, 125, 0.72);
}

.index {
  color: var(--gold);
  font-weight: 700;
}

.name {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

strong {
  color: var(--accent);
}

em {
  color: var(--muted);
  font-style: normal;
  font-size: 0.78rem;
}
</style>

