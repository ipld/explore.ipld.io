import 'tachyons'
import 'ipfs-css'
import 'react-virtualized/styles.css'
import 'ipld-explorer-components/dist/components/object-info/LinksTable.css'
import 'ipld-explorer-components/dist/components/loader/Loader.css'

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider as ReduxStoreProvider } from 'redux-bundler-react'
import { I18nextProvider } from 'react-i18next'
import i18n from './i18n'
import App from './App'
import getStore from './bundles'
import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(
  <ReduxStoreProvider store={getStore()}>
    <I18nextProvider i18n={i18n}>
      <App registerServiceWorker={registerServiceWorker} />
    </I18nextProvider>
  </ReduxStoreProvider>,
  document.getElementById('root')
)
