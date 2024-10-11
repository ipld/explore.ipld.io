import React, { Component, useState, useEffect } from 'react'
import Header from './components/header/Header'
import UpdateAvailable from './components/update/UpdateAvailable'
import { ExplorePage, StartExploringPage } from 'ipld-explorer-components/pages'



const Page = () => {
  const [route, setRoute] = useState(window.location.hash.slice(1) ?? '/')

  useEffect(() => {
    const onHashChange = () => { setRoute(window.location.hash.slice(1) ?? '/') }
    window.addEventListener('hashchange', onHashChange)
    return () => { window.removeEventListener('hashchange', onHashChange) }
  }, [])

  const RenderPage = () => {
    switch (true) {
      case route.startsWith('/explore'):
        return <ExplorePage />
      case route === '/':
      default:
        return <StartExploringPage />
    }
  }

  return (
    <RenderPage />
  )
}

export class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      showUpdateAvailable: false,
    }
    if (props.registerServiceWorker) {
      props.registerServiceWorker({
        onUpdate: () => this.setState({ showUpdateAvailable: true })
      })
    }
  }

  render() {
    const { showUpdateAvailable } = this.state
    const embed = false
    return (
      <div data-testid="app" className='sans-serif'>
        {embed ? null : <Header />}
        <div className='ph4-l pt4-l'>
          <Page />
        </div>
        {showUpdateAvailable ? <UpdateAvailable /> : null}
      </div>
    )
  }

}

export default App
