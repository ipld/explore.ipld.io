import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'redux-bundler-react'
import navHelper from 'internal-nav-helper'

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
          <header className='flex items-center pa3 bg-navy'>
            <a href='#/' title='home' className='w-50'>
              <img src='https://ipfs.io/images/ipfs-logo.svg' alt='IPFS' style={{height: 50}} />
            </a>
            <h1 className='w-50 ma0 tr f3 fw2 montserrat aqua'>IPLD EXPLORER</h1>
          </header>
        )}
        <div className='pt4 ph4'>
          <Page />
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
