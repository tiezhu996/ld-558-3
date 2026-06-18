<template>
  <div class="project-progress">
    <article v-for="project in projects" :key="project.id">
      <header>
        <span>{{ project.name }}</span>
        <strong>{{ Math.round((project.currentAmount / project.targetAmount) * 100) }}%</strong>
      </header>
      <div class="track">
        <i :style="{ width: `${Math.min(100, (project.currentAmount / project.targetAmount) * 100)}%` }"></i>
      </div>
      <p>{{ project.currentAmount.toLocaleString('zh-CN') }} / {{ project.targetAmount.toLocaleString('zh-CN') }}</p>
    </article>
  </div>
</template>

<script setup lang="ts">
import type { CharityProject } from '@/types/charity';

defineProps<{
  projects: CharityProject[];
}>();
</script>

<style scoped lang="scss">
.project-progress {
  display: grid;
  gap: 0.8rem;
}

article {
  padding: 0.72rem;
  background: rgba(218, 246, 213, 0.055);
}

header {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  color: var(--text);
}

strong {
  color: var(--gold);
}

.track {
  height: 0.6rem;
  margin: 0.55rem 0;
  background: rgba(185, 215, 193, 0.14);
}

i {
  display: block;
  height: 100%;
  background: linear-gradient(90deg, #36b37e, #f2c94c);
}

p {
  margin: 0;
  color: var(--muted);
  font-size: 0.8rem;
}
</style>

