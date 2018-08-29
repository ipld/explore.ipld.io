import { composeBundles } from 'redux-bundler'

import ipfsBundle from './ipfs'
import exploreBundle from './explore'
import routesBundle from './routes'

export default composeBundles(
  routesBundle,
  ipfsBundle,
  exploreBundle
)
