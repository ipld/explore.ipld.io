import React from 'react'
import { Trans, translate } from 'react-i18next'

const UpdateAvailable = () => {
  return (
    <div className='fixed bottom-0 w-100 tc'>
      <div className='dib f5 lh-copy avenir ph4 pv3 white bg-green br2 br--top'>
        <Trans i18nkey='UpdateAvailable.paragraph1'>
          A new version of IPLD Explorer is available, <a className='pointer underline link fw5' onClick={() => window.location.reload()}>please reload</a>
        </Trans>
      </div>
    </div>
  )
}

export default translate('explore')(UpdateAvailable)
