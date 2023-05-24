import { composeBundles } from 'redux-bundler'
import { exploreBundle, heliaBundle } from 'ipld-explorer-components/dist-cjs'
import routesBundle from './routes'


export default composeBundles(
  exploreBundle(async () => {

    // import(/* webpackChunkName: "helia" */ '@chainsafe/libp2p-noise')
    // import(/* webpackChunkName: "helia" */ '@chainsafe/libp2p-yamux')
    // import(/* webpackChunkName: "helia" */ '@libp2p/bootstrap')
    // import(/* webpackChunkName: "helia" */ '@libp2p/websockets')
    // import(/* webpackChunkName: "helia" */ 'blockstore-core')
    // import(/* webpackChunkName: "helia" */ 'datastore-core')
    // import(/* webpackChunkName: "helia" */ 'helia')
    // import(/* webpackChunkName: "helia" */ 'libp2p')
    // import(/* webpackChunkName: "helia" */ 'libp2p/identify')
    // import(/* webpackChunkName: "helia" */ 'kubo-rpc-client')
    // import(/* webpackChunkName: "helia" */ '@libp2p/delegated-peer-routing')
    // import(/* webpackChunkName: "helia" */ '@libp2p/delegated-content-routing')
    // import(/* webpackChunkName: "helia" */ '@chainsafe/libp2p-gossipsub')
    // import(/* webpackChunkName: "helia" */ '@libp2p/ipni-content-routing')
    // import(/* webpackChunkName: "helia" */ '@libp2p/kad-dht')
    // import(/* webpackChunkName: "helia" */ '@libp2p/mplex')
    // import(/* webpackChunkName: "helia" */ '@libp2p/webrtc')
    // import(/* webpackChunkName: "helia" */ '@libp2p/webtransport')
    // import(/* webpackChunkName: "helia" */ 'libp2p/autonat')
    // import(/* webpackChunkName: "helia" */ 'libp2p/circuit-relay')
  }),
  routesBundle,
  heliaBundle,
)
