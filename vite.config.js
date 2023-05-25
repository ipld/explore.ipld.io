import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { reactVirtualized } from './vite-plugins/reactVirtualizedFix';

export default defineConfig(() => {
  return {
    build: {
      outDir: 'build',
    },
    define: {
      global: {},
      process: {
        env: {}
      }
    },
    plugins: [
      react(),
      reactVirtualized(),
    ],
  };
});
