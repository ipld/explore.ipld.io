import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { viteStaticCopy } from 'vite-plugin-static-copy'

// @ts-check
/**
 * @type {import('vite').UserConfigFn}
 */
export const viteConfig = (configEnv = {}) => {
  const mode = configEnv.mode ?? 'test'
  let define = {
    global: 'globalThis'
  }
  if (!['test', 'production'].includes(mode)) {
    define = {
      process: {
        env: {}
      }
    }
  }
  /**
   * @type {import('vite').UserConfigExport}
   */
  return {
    build: {
      copyPublicDir: true,
      target: 'esnext',
      outDir: 'build',
      commonjsOptions: {
        exclude: []
      },
      rollupOptions: {
        treeshake: true,
        plugins: []
      },
      emptyOutDir: true
    },
    define,
    // https://vitejs.dev/guide/dep-pre-bundling.html#monorepos-and-linked-dependencies
    optimizeDeps: {
      exclude: []
    },
    plugins: [
      react(),
      viteStaticCopy({
        targets: [
          {
            src: 'node_modules/ipld-explorer-components/dist/locales',
            dest: '.'
          }
        ]
      })
    ],
    resolve: {
      alias: []
    },
    // see https://www.robinwieruch.de/vitest-react-testing-library/
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './test/unit/setup.js',
      include: [
        'src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'
      ],
      server: {
        deps: {
          inline: [
            'ipld-explorer-components'
          ]
        }
      }
    }
  }
}

export default defineConfig(viteConfig)
