import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'redux-bundler-react'
import navHelper from 'internal-nav-helper'
import Header from './components/header/Header'
import UpdateAvailable from './components/update/UpdateAvailable'

export class App extends Component {
  static propTypes = {
    doInitIpfs: PropTypes.func.isRequired,
    doUpdateUrl: PropTypes.func.isRequired,
    queryObject: PropTypes.object.isRequired,
    registerServiceWorker: PropTypes.func,
    route: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.element
    ]).isRequired
  }

  constructor (props) {
    super(props)
    this.state = {
      showUpdateAvailable: false
    }
    if (props.registerServiceWorker) {
      props.registerServiceWorker({
        onUpdate: () => this.setState({showUpdateAvailable: true})
      })
    }
  }

  componentDidMount () {
    this.props.doInitIpfs()
  }

  render () {
    const {showUpdateAvailable} = this.state
    const Page = this.props.route
    const {embed} = this.props.queryObject
    return (
      <div className='sans-serif' onClick={navHelper(this.props.doUpdateUrl)}>
        {embed ? null : (
          <Header />
        )}
        <div className='ph4-l pt4-l'>
          <Page embed={embed} />
        </div>
        {showUpdateAvailable ? (
          <UpdateAvailable />
        ) : null }
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
