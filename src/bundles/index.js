import { composeBundles } from 'redux-bundler'
import { exploreBundle } from 'ipld-explorer-components'
import routesBundle from './routes'
import helia from './helia'

export default composeBundles(
  exploreBundle(),
  routesBundle,
  helia,
)
