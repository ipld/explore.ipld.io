import { composeBundles } from 'redux-bundler'
import exploreBundle from 'ipld-explorer-lib/exploreBundle'
import ipfsBundle from './ipfs'
import routesBundle from './routes'

export default composeBundles(
  routesBundle,
  ipfsBundle,
  exploreBundle
)
