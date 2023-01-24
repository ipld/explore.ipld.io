import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'redux-bundler-react'
import { getNavHelper } from 'internal-nav-helper'
import Header from './components/header/Header'
import UpdateAvailable from './components/update/UpdateAvailable'

export class App extends Component {
  static propTypes = {
    doInitIpfs: PropTypes.func.isRequired,
    doUpdateUrl: PropTypes.func.isRequired,
    queryObject: PropTypes.object.isRequired,
    registerServiceWorker: PropTypes.func,
    route: PropTypes.oneOfType([PropTypes.func, PropTypes.element]).isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      showUpdateAvailable: false,
      telemetry: null
    }
    if (props.registerServiceWorker) {
      props.registerServiceWorker({
        onUpdate: () => this.setState({ showUpdateAvailable: true })
      })
    }
  }

  async initTelemetry() {
    // embed checks if explorer is running stand alone or embeded in webui
    const { embed } = this.props.queryObject
    const { telemetry } = this.state

    if (telemetry == null && !embed) {
      const { BrowserMetricsProvider } = await import('@ipfs-shipyard/ignite-metrics/dist/src/BrowserMetricsProvider')
      const newTelemetry = new BrowserMetricsProvider({ appKey: '8bf7ee9fa77ec75c8173aa9fdc4877f5e2b61628' })
      window.telemetry = newTelemetry
      window.removeMetricsConsent = () => newTelemetry.removeConsent(['minimal'])
      window.addMetricsConsent = () => newTelemetry.addConsent(['minimal'])

      this.setState({ telemetry: newTelemetry })
    }
  }

  componentDidMount() {
    this.props.doInitIpfs()
    this.initTelemetry()
  }

  render() {
    const { showUpdateAvailable } = this.state
    const Page = this.props.route
    const { embed } = this.props.queryObject
    return (
      <div className='sans-serif' onClick={getNavHelper(this.props.doUpdateUrl)}>
        {embed ? null : <Header />}
        <div className='ph4-l pt4-l'>
          <Page embed={embed} />
        </div>
        {showUpdateAvailable ? <UpdateAvailable /> : null}
      </div>
    )
  }
}

export default connect(
  'selectRoute',
  'selectQueryObject',
  'doUpdateUrl',
  'doInitIpfs',
  App
)
