import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'redux-bundler-react'
import navHelper from 'internal-nav-helper'
import Header from './components/header/Header'

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
          <div className='fixed bottom-0 w-100 tc'>
            <div className='dib f5 lh-copy avenir ph4 pv3 white bg-green br2 br--top'>
              A new version of IPLD Explorer is available, <a className='pointer underline link fw5' onClick={() => window.location.reload()}>please reload</a>
            </div>
          </div>
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
