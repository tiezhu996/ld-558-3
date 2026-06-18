<template>
  <section class="data-card">
    <p class="label">{{ label }}</p>
    <strong><AnimatedNumber :value="value" :digits="digits" :suffix="suffix" /></strong>
    <span v-if="hint" class="hint">{{ hint }}</span>
  </section>
</template>

<script setup lang="ts">
import AnimatedNumber from './AnimatedNumber.vue';

withDefaults(
  defineProps<{
    label: string;
    value: number;
    suffix?: string;
    hint?: string;
    digits?: number;
  }>(),
  {
    suffix: '',
    hint: '',
    digits: 0
  }
);
</script>

<style scoped lang="scss">
.data-card {
  min-height: 7.25rem;
  padding: 1.05rem 1.1rem;
  border: 1px solid rgba(133, 221, 160, 0.24);
  background: linear-gradient(145deg, rgba(18, 58, 44, 0.88), rgba(12, 35, 32, 0.78));
  box-shadow: inset 0 0 24px rgba(125, 216, 125, 0.08);
}

.label,
.hint {
  margin: 0;
  color: var(--muted);
  font-size: 0.84rem;
}

strong {
  display: block;
  margin: 0.38rem 0 0.22rem;
  color: var(--accent);
  font-size: 1.85rem;
  letter-spacing: 0;
}
</style>

