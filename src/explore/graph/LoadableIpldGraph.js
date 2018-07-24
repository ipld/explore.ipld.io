import Loadable from 'react-loadable'
import ComponentLoader from '../../loader/ComponentLoader.js'

const LoadableSettingsPage = Loadable({
  loader: () => import('./IpldGraphCytoscape'),
  loading: ComponentLoader
})

export default LoadableSettingsPage
