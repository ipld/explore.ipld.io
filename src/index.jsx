import 'tachyons'
import 'ipfs-css'
import 'ipld-explorer-components/css'
import { Buffer } from 'buffer'
import { HeliaProvider, ExploreProvider } from 'ipld-explorer-components/providers'
import React from 'react'
import ReactDOM from 'react-dom'
import { I18nextProvider } from 'react-i18next'
import App from './App'
import i18n from './i18n'
import registerServiceWorker from './registerServiceWorker'

/**
 * polyfills for ipld-explorer-components.
 *
 * @see https://github.com/ipfs/ipld-explorer-components/issues/453
 */
globalThis.Buffer = Buffer

const appVersion = import.meta.env.VITE_VERSION

console.log(`IPLD Explorer - v${appVersion} - https://github.com/ipfs-shipyard/ipld-explorer`)

ReactDOM.render(
  <I18nextProvider i18n={i18n}>
    <HeliaProvider>
      <ExploreProvider>
        <App registerServiceWorker={registerServiceWorker} />
      </ExploreProvider>
    </HeliaProvider>
  </I18nextProvider>,
  document.getElementById('root')
)
