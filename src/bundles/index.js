import { composeBundles } from 'redux-bundler'
import { exploreBundle, heliaBundle } from 'ipld-explorer-components'
import routesBundle from './routes'

export default composeBundles(
  exploreBundle(),
  routesBundle,
  heliaBundle
)
