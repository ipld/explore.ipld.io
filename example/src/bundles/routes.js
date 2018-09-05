import { createRouteBundle } from 'redux-bundler'
import ExplorePage from 'ipld-explorer-lib/LoadableExplorePage'
import StartExploringPage from 'ipld-explorer-lib/StartExploringPage'

export default createRouteBundle({
  '/explore*': ExplorePage,
  '/': StartExploringPage,
  '': StartExploringPage
}, { routeInfoSelector: 'selectHash' })
