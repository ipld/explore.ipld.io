import 'tachyons'
import 'ipfs-css'
import 'react-virtualized/styles.css'
import 'regenerator-runtime'
import React from 'react'
import ReactDOM from 'react-dom'
import { I18nextProvider } from 'react-i18next'
import i18n from './i18n'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import { Buffer } from 'buffer';
import { HeliaProvider, ExploreProvider } from 'ipld-explorer-components'

/**
 * polyfills for vite
 */
globalThis.Buffer = Buffer

const appVersion = import.meta.env.VITE_VERSION

console.log(`IPLD Explorer - v${appVersion} - https://github.com/ipfs-shipyard/ipld-explorer`)

ReactDOM.render(
  <HeliaProvider>
    <ExploreProvider>
        <I18nextProvider i18n={i18n}>
          <App registerServiceWorker={registerServiceWorker} />
        </I18nextProvider>
    </ExploreProvider>
  </HeliaProvider>,
  document.getElementById('root')
)
