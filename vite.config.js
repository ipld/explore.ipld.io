import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { reactVirtualized } from './vite-plugins/reactVirtualizedFix';

export default defineConfig(() => {
  return {
    build: {
      outDir: 'build',
    },
    define: {
      global: 'globalThis',
      process: {
        env: {}
      }
    },
    plugins: [
      react(),
      reactVirtualized(),
    ],
    resolve: {
      alias: [
        { find: /^assert$/, replacement: 'assert' },
        { find: /^os$/, replacement: 'rollup-plugin-node-polyfills/polyfills/os' },
        { find: /^process$/, replacement: 'rollup-plugin-node-polyfills/polyfills/process-es6' },
        { find: /^stream$/, replacement: 'rollup-plugin-node-polyfills/polyfills/stream' },
        { find: /^util$/, replacement: 'rollup-plugin-node-polyfills/polyfills/util' },
      ]
    }
  };
});
