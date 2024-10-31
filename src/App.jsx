/* eslint-disable react/prop-types */
import { useExplore, useHelia, ExplorePage, StartExploringPage } from 'ipld-explorer-components'
import React, { useState, useEffect } from 'react'
import Header from './components/header/Header'
import UpdateAvailable from './components/update/UpdateAvailable'

const Page = () => {
  const { setExplorePath, exploreState: { path } } = useExplore()

  useEffect(() => {
    const onHashChange = () => {
      setExplorePath(window.location.hash)
    }
    window.addEventListener('hashchange', onHashChange)
    return () => { window.removeEventListener('hashchange', onHashChange) }
  }, [setExplorePath])

  if (path == null || path === '' || path === '#/') {
    return <StartExploringPage />
  }

  return <ExplorePage />
}

const App = ({ registerServiceWorker }) => {
  const [showUpdateAvailable, setShowUpdateAvailable] = useState(false)
  const { helia, doInitHelia } = useHelia()

  useEffect(() => {
    if (helia == null) {
      doInitHelia()
    }
  }, [helia])

  useEffect(() => {
    if (registerServiceWorker) {
      registerServiceWorker({
        onUpdate: () => setShowUpdateAvailable(true)
      })
    }
  }, [registerServiceWorker])

  return (
    <div data-testid="app" className='sans-serif'>
      <Header />
      <div className='ph4-l pt4-l'>
        <Page />
      </div>
      {showUpdateAvailable ? <UpdateAvailable /> : null}
    </div>
  )
}

export default App
