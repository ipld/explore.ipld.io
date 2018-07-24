import React from 'react'
import { Helmet } from 'react-helmet'
import { connect } from 'redux-bundler-react'
import StartExploringPage from './StartExploringPage'
import ErrorBoundary from '../components/error/ErrorBoundary'
import CidInfo from './cid-info/CidInfo'
import ObjectInfo from './object-info/ObjectInfo'
import IpldGraph from './graph/IpldGraphCytoscape'
import GraphCrumb from './graph-crumb/GraphCrumb'
import ComponentLoader from '../loader/ComponentLoader'

class ExplorePage extends React.Component {
  constructor (props) {
    super(props)
    this.onLinkClick = this.onLinkClick.bind(this)
  }

  onLinkClick (link) {
    const {doUpdateHash, explore} = this.props
    const {nodes, pathBoundaries} = explore
    const cid = nodes[0].cid
    const basePath = pathBoundaries.map(p => p.path).join('/')
    const path = basePath ? `${basePath}/${link.path}` : link.path
    // Reliably derive the url from the data, rather than the current hash
    const hash = `#/explore/${cid}/${path}`
    doUpdateHash(hash)
  }

  render () {
    let {explore, exploreIsLoading, explorePathFromHash} = this.props
    if (!explorePathFromHash) {
      // No IPLD path to explore so show the intro page
      return <StartExploringPage />
    }
    // Hide the old data while we navigate to the new. We can get much fancier
    // with showing that the request is loading, but for now, this'l hide the
    // now stale info and show a loading spinner.
    explore = explore || {}
    explore = exploreIsLoading ? {} : explore
    const {targetNode, localPath, nodes, pathBoundaries} = explore
    const sourceNode = (nodes && nodes[0]) || null
    return (
      <div className='nl3 nt4'>
        <Helmet>
          <title>Explore - IPFS</title>
        </Helmet>
        {pathBoundaries && targetNode ? (
          <GraphCrumb
            style={{padding: '15px 0 10px'}}
            className='ml4'
            cid={sourceNode.cid}
            pathBoundaries={pathBoundaries}
            localPath={localPath} />
        ) : <div style={{height: 54}} /> }
        <div className='dt-l dt--fixed'>
          <div className='dtc-l w-100 w-two-thirds-l pr3-l v-top'>
            {targetNode ? (
              <ObjectInfo
                style={{background: '#FBFBFB'}}
                cid={targetNode.cid}
                localPath={localPath}
                size={targetNode.size}
                links={targetNode.links}
                data={targetNode.data}
                type={targetNode.type}
                onLinkClick={this.onLinkClick} />
            ) : <ComponentLoader pastDelay /> }
          </div>
          <div className='dn dtc-l w-third-l v-top'>
            {targetNode ? (
              <CidInfo
                style={{background: '#FBFBFB', overflow: 'hidden'}}
                cid={targetNode.cid} />
            ) : null}
            {targetNode ? (
              <ErrorBoundary>
                <IpldGraph
                  style={{width: '100%', height: 300}}
                  path={targetNode.cid}
                  links={targetNode.links}
                  onNodeClick={this.onLinkClick} />
              </ErrorBoundary>
            ) : null}
          </div>
        </div>
      </div>
    )
  }
}

export default connect('selectRouteParams', 'selectExploreIsLoading', 'selectExplore', 'selectExplorePathFromHash', 'doUpdateHash', ExplorePage)
