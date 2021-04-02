# IPLD Explorer at explore.ipld.io

> Explore the Merkle Forest from the comfort of your browser.

![Screenshot of the IPLD explorer](https://user-images.githubusercontent.com/58871/43152632-f310763c-8f66-11e8-9449-2e362a9f3047.png)

[![](https://img.shields.io/badge/made%20by-Protocol%20Labs-blue.svg)](https://protocol.ai/) [![](https://img.shields.io/badge/project-IPFS-blue.svg)](http://ipfs.io/) [![](https://img.shields.io/badge/freenode-%23ipfs-blue.svg)](http://webchat.freenode.net/?channels=%23ipfs) [![Build Status](https://travis-ci.org/ipfs/explore.ipld.io.svg)](https://travis-ci.org/ipfs/explore.ipld.io) [![dependencies Status](https://david-dm.org/ipfs/explore.ipld.io/master/status.svg)](https://david-dm.org/ipfs/explore.ipld.io/master)

## Background

This repo is responsible for standalone tool that lives at https://explore.ipld.io  
Component code lives in a separate repo at [ipld-explorer-components](https://github.com/ipfs/ipld-explorer-components)

The app will use HTTP API via [`ipfs-http-client`](https://www.npmjs.com/package/ipfs-http-client) provided by locally running IPFS node with correct CORS headers set up, and fallback to using [js-ipfs](https://github.com/ipfs/js-ipfs) otherwise.

The app is built with [`create-react-app`](https://github.com/facebook/create-react-app). Please read the [docs](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#table-of-contents). 


## Install

With `node` > 10 (but < 12) and `npm` @ 6+ installed, run

```js
npm install
```

## Usage

When developing you can run the [dev server](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#npm-start), the [unit tests](https://facebook.github.io/jest/), and the [storybook](https://storybook.js.org/) component viewer and see the results of your changes as you save files.

In separate shells run the following:

```sh
# Run the unit tests
npm test
```

```sh
# Run the dev server @ http://localhost:3000
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

The uses Jest to run the isolated unit tests. Unit test files are located next to the component they test and have the same file name, but with the extension `.test.js`

### Linting

The following command will perform [`standard`](https://standardjs.com/) linting on the code:

```sh
npm run lint
```

### Coverage

To do a single run of the tests and generate a coverage report, run the following:

```sh
npm run test:coverage
```


## Translations

The translations are stored on [./public/locales](./public/locales) and the English version is the source of truth. We use Transifex to help us translate WebUI to another languages.

**If you're interested in contributing a translation**, go to [our page on Transifex](https://www.transifex.com/ipfs/ipfs-webui/translate/), create an account, pick a language and start translating.

You can read more on how we use Transifex and i18next in this app at https://github.com/ipfs-shipyard/ipfs-webui/blob/master/docs/LOCALIZATION.md


## Contribute

Feel free to dive in! [Open an issue](https://github.com/ipfs-shipyard/ipld-explorer/issues/new) or submit PRs.

To contribute to IPFS in general, see the [contributing guide](https://github.com/ipfs/community/blob/master/contributing.md).

[![](https://cdn.rawgit.com/jbenet/contribute-ipfs-gif/master/img/contribute.gif)](https://github.com/ipfs/community/blob/master/CONTRIBUTING.md)


## License

[MIT](LICENSE) © Protocol Labs
