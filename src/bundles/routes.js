import { createRouteBundle } from 'redux-bundler'
import ExplorePage from '../components/LoadableExplorePage'
import StartExploringPage from '../components/StartExploringPage'

export default createRouteBundle({
  '/explore*': ExplorePage,
  '/': StartExploringPage,
  '': StartExploringPage
}, { routeInfoSelector: 'selectHash' })
