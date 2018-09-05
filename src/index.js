import 'tachyons'
import 'ipfs-css'
import 'react-virtualized/styles.css'
import 'ipld-explorer-components/dist/components/object-info/LinksTable.css'
import 'ipld-explorer-components/dist/components/loader/Loader.css'

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'redux-bundler-react'
import App from './App'
import getStore from './bundles'
import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(
  <Provider store={getStore()}>
    <App registerServiceWorker={registerServiceWorker} />
  </Provider>, document.getElementById('root'))
