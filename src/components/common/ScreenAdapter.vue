<template>
  <main class="screen-adapter">
    <slot />
  </main>
</template>

<script setup lang="ts">
import { useAutoResize } from '@/hooks/useAutoResize';

useAutoResize();
</script>

<style scoped lang="scss">
.screen-adapter {
  width: 100vw;
  min-height: 100vh;
  padding: clamp(1rem, 1.4vw, 1.65rem);
  color: var(--text);
  background:
    linear-gradient(115deg, rgba(10, 45, 36, 0.94), rgba(25, 52, 42, 0.7)),
    radial-gradient(circle at 12% 10%, rgba(125, 216, 125, 0.12), transparent 24%),
    var(--bg);
}
</style>
