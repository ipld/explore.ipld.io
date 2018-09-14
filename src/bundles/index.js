import { composeBundles } from 'redux-bundler'
import { exploreBundle } from 'ipld-explorer-components'
import ipfsBundle from './ipfs'
import routesBundle from './routes'

export default composeBundles(
  exploreBundle,
  routesBundle,
  ipfsBundle
)
