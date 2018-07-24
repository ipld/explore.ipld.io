import { createRouteBundle } from 'redux-bundler'
import ExplorePage from '../explore/ExplorePage'

export default createRouteBundle({
  '/explore*': ExplorePage,
  '/': ExplorePage,
  '': ExplorePage
}, { routeInfoSelector: 'selectHash' })
