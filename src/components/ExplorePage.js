import React from 'react'
import { Helmet } from 'react-helmet'
import { connect } from 'redux-bundler-react'
import ErrorBoundary from './error/ErrorBoundary'
import CidInfo from './cid-info/CidInfo'
import ObjectInfo from './object-info/ObjectInfo'
import IpldGraph from './graph/LoadableIpldGraph'
import GraphCrumb from './graph-crumb/GraphCrumb'
import ComponentLoader from './loader/ComponentLoader'

class ExplorePage extends React.Component {
  constructor (props) {
    super(props)
    this.onLinkClick = this.onLinkClick.bind(this)
  }

  onLinkClick (link) {
    const {doUpdateHash, explore} = this.props
    const {nodes, pathBoundaries} = explore
    const cid = nodes[0].cid
    const pathParts = pathBoundaries.map(p => p.path)
    // add the extra path step from the link to the end
    if (link && link.path) {
      pathParts.push(link.path)
    }
    // add the root cid to the start
    pathParts.unshift(cid)
    const path = pathParts.join('/')
    const hash = `#/explore/${path}`
    doUpdateHash(hash)
  }

  render () {
    let {explore, exploreIsLoading, explorePathFromHash} = this.props
    if (!explorePathFromHash) {
      // No IPLD path to explore so show the intro page
      console.log('[IPLD Explorer] ExplorePage loaded without a path to explore')
      return null
    }
    // Hide the old data while we navigate to the new. We can get much fancier
    // with showing that the request is loading, but for now, this'l hide the
    // now stale info and show a loading spinner.
    explore = explore || {}
    explore = exploreIsLoading ? {} : explore
    const {error, targetNode, localPath, nodes, pathBoundaries} = explore
    const sourceNode = (nodes && nodes[0]) || null
    return (
      <div className='nt4-l'>
        <Helmet>
          <title>Exploring - IPLD</title>
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
            {error ? (
              <div className='bg-red white pa3 lh-copy'>
                <span className='mr2'>Path error:</span>{error.message || error}
              </div>
            ) : null}
            {targetNode ? (
              <ObjectInfo
                style={{background: '#FBFBFB'}}
                cid={targetNode.cid}
                localPath={localPath}
                size={targetNode.size}
                links={targetNode.links}
                data={targetNode.data}
                type={targetNode.type}
                format={targetNode.format}
                onLinkClick={this.onLinkClick} />
            ) : null }
            {!error && !targetNode ? (
              <ComponentLoader pastDelay />
            ) : null}
          </div>
          <div className='dtc-l w-third-l v-top pt3 pt0-l'>
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
