import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  build: {
    chunkSizeWarningLimit: 2200,
    rolldownOptions: {
      onLog(level, log, handler) {
        if (
          log.code === 'INVALID_ANNOTATION' &&
          log.id?.includes('@vueuse/core')
        ) {
          return;
        }
        handler(level, log);
      }
    }
  },
  server: {
    port: 38407,
    strictPort: true
  },
  preview: {
    port: 38407,
    strictPort: true
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
});
