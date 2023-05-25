import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { reactVirtualized } from './vite-plugins/reactVirtualizedFix';

/**
 * @type {import('vite').UserConfigFn}
 */
export const viteConfig = (configEnv = {}) => {
  const mode = configEnv.mode ?? 'test' // playwright-ct doesn't pass configEnv
  let define = {}
  if (!['test'].includes(mode)) {
    define = {
      global: 'globalThis',
      process: {
        env: {}
      }
    }
  }
  return {
    build: {
      outDir: 'build',
      commonjsOptions: {
        requireReturnsDefault: 'auto',
        include: [
          /ipld-explorer-components/,
        ],
      },
    },
    define,
    // https://vitejs.dev/guide/dep-pre-bundling.html#monorepos-and-linked-dependencies
    optimizeDeps: {
      include: [
        'ipld-explorer-components',
      ],
      exclude: []
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
    },
    // see https://www.robinwieruch.de/vitest-react-testing-library/
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './test/unit/setup.js',
      include: [
        'src\/**\/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'
      ],
      deps: {
        inline: [
          "ipld-explorer-components"
        ]
      }
    },
  };
}

export default defineConfig(viteConfig);
