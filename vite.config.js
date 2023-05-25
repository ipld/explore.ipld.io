import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { reactVirtualized } from './vite-plugins/reactVirtualizedFix';

import path from 'node:path';

import babel from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';

/**
 * @type {import('vite').UserConfigFn}
 */
export const viteConfig = (configEnv = {}) => {
  const mode = configEnv.mode ?? 'test' // playwright-ct doesn't pass configEnv
  let define = {}
  if (!['test', 'production'].includes(mode)) {
    define = {
      global: 'globalThis',
      process: {
        env: {}
      }
    }
  }
  /**
   * @type {typeof import('vite').UserConfigExport}
   */
  return {
    build: {
      copyPublicDir: true,
      target: 'esnext',
      outDir: 'build',
      commonjsOptions: {
        include: [
          /ipld-explorer-components/,
        ],
        exclude: []
      },
      rollupOptions: {
        treeshake: false,
        plugins: [
          nodeResolve({
            browser: true,
          }),
          // replace({
          //   'process.env.NODE_ENV': JSON.stringify(mode)
          // }),
          babel({
            presets: [
              "@babel/preset-react",
              ["@babel/preset-env", {
                "useBuiltIns": "entry",
                "corejs": "3.22"
              }],
            ],
          }),
          commonjs({
            include: [
              'node_modules/**',
            ],
            exclude: [
              'node_modules/process-es6/**',
            ],
            namedExports: {
              'node_modules/react/index.js': ['Children', 'Component', 'PropTypes', 'createElement'],
              'node_modules/react-dom/index.js': ['render'],
            },
          }),
        ],
      }
    },
    define,
    // https://vitejs.dev/guide/dep-pre-bundling.html#monorepos-and-linked-dependencies
    optimizeDeps: {
      include: [
        'ipld-explorer-components',
      ],
      exclude: [],
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
