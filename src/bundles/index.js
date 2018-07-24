import { composeBundles } from 'redux-bundler'

import ipfsBundle from 'ipfs-redux-bundle'
import exploreBundle from './explore'
import routesBundle from './routes'
import redirectsBundle from './redirects'

export default composeBundles(
  routesBundle,
  redirectsBundle,
  ipfsBundle,
  exploreBundle
)
