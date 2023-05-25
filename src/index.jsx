import 'tachyons'
import 'ipfs-css'
import 'react-virtualized/styles.css'
import 'ipld-explorer-components/dist/components/object-info/LinksTable.css'
import 'ipld-explorer-components/dist/components/loader/Loader.css'
import 'regenerator-runtime'

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider as ReduxStoreProvider } from 'redux-bundler-react'
import { I18nextProvider } from 'react-i18next'
import i18n from './i18n'
import App from './App'
import getStore from './bundles'
import registerServiceWorker from './registerServiceWorker'

const appVersion = import.meta.env.VITE_VERSION

console.log(`IPLD Explorer - v${appVersion} - https://github.com/ipfs-shipyard/ipld-explorer`)

ReactDOM.render(
  <ReduxStoreProvider store={getStore()}>
    <I18nextProvider i18n={i18n}>
      <App registerServiceWorker={registerServiceWorker} />
    </I18nextProvider>
  </ReduxStoreProvider>,
  document.getElementById('root')
)
