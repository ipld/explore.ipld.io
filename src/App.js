import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'redux-bundler-react'
import navHelper from 'internal-nav-helper'
import IpldExploreForm from './explore/IpldExploreForm'

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

  componentWillMount () {
    this.props.doInitIpfs()
  }

  render () {
    const Page = this.props.route
    const {embed} = this.props.queryObject
    return (
      <div className='sans-serif' onClick={navHelper(this.props.doUpdateUrl)}>
        {embed ? null : (
          <header className='flex-ns items-center pa3 bg-navy'>
            <div className='flex-auto'>
              <a href='#/' title='home' className='db dib-ns'>
                <img src='https://ipfs.io/images/ipfs-logo.svg' alt='IPFS' style={{height: 50, width: 117.5}} />
              </a>
              <div className='dib ml3-ns'>
                <IpldExploreForm />
              </div>
            </div>
            <h1 className='dn db-ns ma0 tr f3 fw2 montserrat aqua'>IPLD EXPLORER</h1>
          </header>
        )}
        <div className='pt4 ph4'>
          <Page embed={embed} />
        </div>
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
