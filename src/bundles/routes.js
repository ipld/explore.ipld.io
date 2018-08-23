import { createRouteBundle } from 'redux-bundler'
import ExplorePage from '../components/ExplorePage'

export default createRouteBundle({
  '/explore*': ExplorePage,
  '/': ExplorePage,
  '': ExplorePage
}, { routeInfoSelector: 'selectHash' })
