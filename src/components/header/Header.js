import React from 'react'
import ipfsLogo from './ipfs-logo.svg'
import { IpldExploreForm } from 'ipld-explorer-components'
import { withTranslation } from 'react-i18next'

const Header = ({ t }) => {
  return (
    <header className='flex-l items-center pa3 bg-navy bb bw3 border-aqua tc tl-l'>
      <a href='#/' title={t('homeLink')} className='flex-none v-mid'>
        <img src={ipfsLogo} alt='IPFS' style={{height: 50, width: 117.5}} />
      </a>
      <div className='flex-auto ph2 ph3-l pt1'>
        <div style={{maxWidth: 560}} className='center-m'>
          <IpldExploreForm />
        </div>
      </div>
      <div className='pt2 pt0-l ma0 inline-flex items-center'>
        <h1 className='f3 fw2 montserrat aqua ttu'>{ t('appName') }</h1>
        <div className='pl3'>
          <a href='https://github.com/ipld/explore.ipld.io' target='_blank' rel="noopener noreferrer" aria-label='View source on GitHub'>
            <svg xmlns='http://www.w3.org/2000/svg' height='24' viewBox='0 0 32.58 31.77'>
              <path fill='#7f8491' d='M16.29 0a16.29 16.29 0 00-5.15 31.75c.82.15 1.11-.36 1.11-.79v-2.77C7.7 29.18 6.74 26 6.74 26a4.36 4.36 0 00-1.81-2.39c-1.47-1 .12-1 .12-1a3.43 3.43 0 012.49 1.68 3.48 3.48 0 004.74 1.36 3.46 3.46 0 011-2.18c-3.62-.41-7.42-1.81-7.42-8a6.3 6.3 0 011.67-4.37 5.94 5.94 0 01.16-4.31s1.37-.44 4.48 1.67a15.41 15.41 0 018.16 0c3.11-2.11 4.47-1.67 4.47-1.67a5.91 5.91 0 01.2 4.28 6.3 6.3 0 011.67 4.37c0 6.26-3.81 7.63-7.44 8a3.85 3.85 0 011.11 3v4.47c0 .53.29.94 1.12.78A16.29 16.29 0 0016.29 0z'/>
            </svg>
          </a>
        </div>
      </div>

    </header>
  )
}

export default withTranslation('explore')(Header)
