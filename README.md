# IPLD Explorer at explore.ipld.io

> Explore the Merkle Forest from the comfort of your browser.

![Screenshot of the IPLD explorer](https://user-images.githubusercontent.com/58871/43152632-f310763c-8f66-11e8-9449-2e362a9f3047.png)

[![](https://img.shields.io/badge/made%20by-Protocol%20Labs-blue.svg)](https://protocol.ai/) [![](https://img.shields.io/badge/project-IPFS-blue.svg)](http://ipfs.io/) [![](https://img.shields.io/badge/freenode-%23ipfs-blue.svg)](http://webchat.freenode.net/?channels=%23ipfs) [![Build Status](https://travis-ci.org/ipfs/explore.ipld.io.svg)](https://travis-ci.org/ipfs/explore.ipld.io) [![dependencies Status](https://david-dm.org/ipfs/explore.ipld.io/master/status.svg)](https://david-dm.org/ipfs/explore.ipld.io/master)

## Background

This repo is responsible for standalone tool that lives at https://explore.ipld.io
Component code lives in a separate repo at [ipld-explorer-components](https://github.com/ipfs/ipld-explorer-components)

The ipld-explorer-components library uses [`@helia/http`](https://www.npmjs.com/package/@helia/http) to query any local IPFS node, and the network, for content. See https://github.com/ipfs/ipld-explorer-components/blob/8718cd07cd27a82fdeaa25b92c6809ba3cec489c/src/providers/helia.tsx and https://github.com/ipfs/ipld-explorer-components/blob/8718cd07cd27a82fdeaa25b92c6809ba3cec489c/src/lib/init-helia.ts#L23 for specifics.

The app is built with [`Vite`](https://vitejs.dev/). Please read the [docs](https://vitejs.dev/guide/).


## Install

With `node` and `npm` installed, run

```js
npm install
```

## Usage

When developing you can run the [dev server](https://vitejs.dev/guide/cli.html#dev), the [unit tests](https://vitest.dev/), and the [storybook](https://storybook.js.org/) component viewer and see the results of your changes as you save files.

In separate shells run the following:

```sh
# Run the unit tests
npm test
```

```sh
# Run the dev server @ http://localhost:5173
npm start
```

```sh
# Run the UI component viewer @ http://localhost:9009
npm run storybook
```

## Build

To create an optimized static build of the app, output to the `build` directory:

```sh
# Build out the html, css & jss to ./build
npm run build
```

### Analyze

To inspect the built bundle for bundled modules and their size, first `build` the app then:

```sh
# Run bundle
npm run analyze
```

## Test

The following command will run the app tests, watch source files and re-run the tests when changes are made:

```sh
npm test
```

The app uses Vitest to run the isolated unit tests. Unit test files are located next to the component they test and have the same file name, but with the extension `.test.js`

### Linting

The following command will perform linting on the code using [`aegir`](https://github.com/ipfs/aegir):

```sh
npm run lint
```

### Coverage

To do a single run of the tests and generate a coverage report, run the following:

```sh
npm run test:coverage
```


## Translations

The translations are automatically handled by Vite's build process. The app uses a two-tier translation system:

1. **Primary translations**: Loaded from `ipld-explorer-components` package (namespace: `explore`)
2. **Fallback translations**: Local translations in `./public/locales` (namespace: `app`)

### Automatic Translation Handling

Translations are automatically processed during the build:

- **Vite static copy**: The `viteStaticCopy` plugin automatically copies `ipld-explorer-components/dist/locales` to the build directory
- **Fallback system**: The i18n configuration uses `app.json` files as fallback when primary translations fail to load
- **Language detection**: The app automatically detects user language and falls back through language variants (e.g., `en-US` → `en`)

### Translation Structure

The build process copies `explore.json` files from `ipld-explorer-components/dist/locales/{lang}/` to `build/locales/{lang}/explore.json`, while local `app.json` files in `public/locales/{lang}/` serve as fallbacks.

### Contributing Translations

**If you're interested in contributing a translation**, go to [our page on Transifex](https://www.transifex.com/ipfs/ipfs-webui/translate/), create an account, pick a language and start translating.

You can read more on how we use Transifex and i18next in this app at https://github.com/ipfs-shipyard/ipfs-webui/blob/master/docs/LOCALIZATION.md


## Contribute

Feel free to dive in! [Open an issue](https://github.com/ipfs-shipyard/ipld-explorer/issues/new) or submit PRs.

To contribute to IPFS in general, see the [contributing guide](https://github.com/ipfs/community/blob/master/contributing.md).

[![](https://cdn.rawgit.com/jbenet/contribute-ipfs-gif/master/img/contribute.gif)](https://github.com/ipfs/community/blob/master/CONTRIBUTING.md)


## License

[MIT](LICENSE) © Protocol Labs
