import React from 'react'
import ipfsLogo from './ipfs-logo.svg'
import IpldExploreForm from 'ipld-explorer-lib/IpldExploreForm'

const Header = () => {
  return (
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
  )
}

export default Header
