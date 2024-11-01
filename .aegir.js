
/** @type {import('aegir').PartialOptions} */
export default {
  dependencyCheck: {
    ignore: [
      // .jsx files aren't checked properly.
      'ipfs-css', // needed for styles
      'tachyons', // needed for styles
      'react', // framework
      'react-dom', // framework
      'react-i18next', // translation library
      'ipld-explorer-components', // core component library

      // tests
      'p-defer',

      // vite stuff
      '@vitest/coverage-v8'
    ],
    productionIgnorePatterns: [
      '.aegir.js',
      'vite.config.js',
      '/test',
      '.storybook',
      'dist-vite',
      'playwright.config.js',
    ]
  }
}
