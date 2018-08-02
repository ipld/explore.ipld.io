import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'redux-bundler-react'
import navHelper from 'internal-nav-helper'
import IpldExploreForm from './explore/IpldExploreForm'
import registerServiceWorker from './registerServiceWorker'
import ipfsLogo from './navigation/ipfs-logo.svg'

export class App extends Component {
  static propTypes = {
    doInitIpfs: PropTypes.func.isRequired,
    doUpdateUrl: PropTypes.func.isRequired,
    queryObject: PropTypes.object.isRequired,
    route: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.element
    ]).isRequired
  }

  constructor (props) {
    super(props)
    this.state = {
      showUpdateAvailable: true
    }
    registerServiceWorker({
      onUpdate: () => this.setState({showUpdateAvailable: true})
    })
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
          <header className='flex-ns items-center pa3 bg-navy bb bw3 border-aqua'>
            <div className='flex-auto'>
              <a href='#/' title='home' className='dib dib-ns'>
                <img src={ipfsLogo} alt='IPFS' style={{height: 50, width: 117.5}} />
              </a>
              <h1 className='dib dn-l ma0 tr f3 fw2 montserrat aqua fr' style={{paddingTop: 14}}>IPLD EXPLORER</h1>
              <div className='dib ml3-ns pt2 pt0-ns'>
                <IpldExploreForm />
              </div>
            </div>
            <h1 className='dn db-l ma0 tr f3 fw2 montserrat aqua'>IPLD EXPLORER</h1>
          </header>
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
