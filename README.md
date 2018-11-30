# IPLD Explorer

> Explore the Merkle Forest from the comfort of your browser.

![Screenshot of the IPLD explorer](https://user-images.githubusercontent.com/58871/43152632-f310763c-8f66-11e8-9449-2e362a9f3047.png)

[![](https://img.shields.io/badge/made%20by-Protocol%20Labs-blue.svg)](https://protocol.ai/) [![](https://img.shields.io/badge/project-IPFS-blue.svg)](http://ipfs.io/) [![](https://img.shields.io/badge/freenode-%23ipfs-blue.svg)](http://webchat.freenode.net/?channels=%23ipfs) [![Build Status](https://travis-ci.org/ipfs-shipyard/ipld-explorer.svg)](https://travis-ci.org/ipfs-shipyard/ipld-explorer) [![dependencies Status](https://david-dm.org/ipfs-shipyard/ipld-explorer/master/status.svg)](https://david-dm.org/ipfs-shipyard/ipld-explorer/master)

## Background

The app accesses a local IPFS daemon via [`window.ipfs-fallback`](https://github.com/tableflip/window.ipfs-fallback). It will use the `window.ipfs` api provided by the [IPFS Companion](https://github.com/ipfs-shipyard/ipfs-companion) web-extension where available, and fallback to using [js-ipfs-api](https://github.com/ipfs/js-ipfs-api)

The app is built with [`create-react-app`](https://github.com/facebook/create-react-app). Please read the [docs](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#table-of-contents).

## Install

With `node` > 8.9 and `npm` @ 6+ installed, run

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

## i18n

The translations are stored on [./public/locales](./public/locales) and the English version is the source of truth.

We use Transifex to help us translate WebUI to another languages. If you're interested in contributing, go to [our page on Transifex](https://www.transifex.com/ipfs/ipfs-webui/translate/), create an account, pick a language and start translating.

### To Start Translating

1. [Create Transifex account](https://www.transifex.com/signup/?join_project=ipfs-webui)
2. Go to https://www.transifex.com/ipfs/ipfs-webui/translate/, pick a language, and start translating

### To Sync Translations

1. Install and set up [command-line client (`tx`)](https://docs.transifex.com/client/installing-the-client)
2. To download new translations from Transifex: `tx pull -a`
    - this should create/update files in `public/locales/*` that need to be committed
    - if a new language is created, remember to add it to `src/i18n.js`

### Namespaces and source files

We've split up our files by tab, so you can find the translations files at

- **Files** `->` `public/locales/en/files.json`
- **Explore** `->` `public/locales/en/explore.json`

..etc. The filename is the **namespace** that `i18next` will look up to find the keys for the right section.

We define our **source file** to be the `en` locale, in `public/locales/en/*`. Developers should update those files directly and push the changes to Transifex for our lovely team of translators to ruminate on.

All other locales are `pull`ed from Transifex service via the `tx` commandline tool.

### Adding or updating keys

If you want to add new keys or change existing values in the `en` locale, you should make sure you have the latest from transifex first.

For example, before adding keys to `public/locales/en/explore.json`, first check you've got the latest source file:

```console
$ tx pull -r ipld-explorer.explore-json -s
tx INFO: Pulling translations for resource ipld-explorer.explore-json (source: public/locales/en/explore.json)
tx WARNING:  -> ko_KR: public/locales/ko_KR/explore.json
tx WARNING:  -> en: public/locales/en/explore.json
...
```

- `-s` means "include the source file when pulling", which in our case is the `en` versions.
- `-r ipld-explorer.explore-json` means just `explore.json` file. The mappings of resource name to files
is in the `.tx/config` file.

Now make your changes and add great keys and snappy `en` default values for them. When you are done, commit your changes as per usual, then share them with the translators by pushing them:

```console
tx push -r ipld-explorer.explore-json -s
tx INFO: Pushing resource ipld-explorer.explore-json
tx INFO: Pushing source file (public/locales/en/explore.json)
tx INFO: Done.
```

- `-r ipld-explorer.explore-json` means push changes in `explore.json`
- `-s` means push just the source file (`public/locales/en`)

### Language mapping

Transifex use posix style `_` underscores when in it's locale tags to separate language tag and iso region code, so `en_GB`
denotes `en` or English as the language, and `GB` or Great Britain as the region.

Browsers and the IETF standard use hyphens as the separator, like `en-GB`. i18next looks up languages based on the hyphenated IETF language code, with hyphens rather than undercores so we tell the `tx` client to map those underscored country specific locales to the hypenated version in the config file `.tx/config` by adding:

```toml
lang_map = zh_CN: zh-CN, ko_KR: ko-KR
```

### Transifex 101

- [Installing the Transifex Client](https://docs.transifex.com/client/installing-the-client)
- [Understanding `.tx/config` file](https://docs.transifex.com/client/client-configuration#section-tx-config)
- Manual sync via Transifex Client
  -  [Using Transifex with GitHub in Your Development Workflow](https://docs.transifex.com/integrations/github)
     - [Syncing a local project to Transifex with the Transifex Client](https://docs.transifex.com/integrations/github#section-using-the-client)
- [en_US vs. en-US - Which Is Correct?](http://codel10n.com/what-is-correct-locale-tag-en_us-vs-en-us/)


## Contribute

Feel free to dive in! [Open an issue](https://github.com/ipfs-shipyard/ipld-explorer/issues/new) or submit PRs.

To contribute to IPFS in general, see the [contributing guide](https://github.com/ipfs/community/blob/master/contributing.md).

[![](https://cdn.rawgit.com/jbenet/contribute-ipfs-gif/master/img/contribute.gif)](https://github.com/ipfs/community/blob/master/CONTRIBUTING.md)


## License

[MIT](LICENSE) © Protocol Labs
