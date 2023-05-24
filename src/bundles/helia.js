/* globals globalThis */
import { noise } from '@chainsafe/libp2p-noise'
// import { yamux } from '@chainsafe/libp2p-yamux'
import { bootstrap } from '@libp2p/bootstrap'
import { webSockets } from '@libp2p/websockets'
import { MemoryBlockstore } from 'blockstore-core'
import { MemoryDatastore } from 'datastore-core'
import { createHelia } from 'helia'
import { createLibp2p } from 'libp2p'
import { identifyService } from 'libp2p/identify'
import { create as kuboClient } from 'kubo-rpc-client'
import { delegatedPeerRouting } from '@libp2p/delegated-peer-routing'
import { delegatedContentRouting } from '@libp2p/delegated-content-routing'
// import { gossipsub } from '@chainsafe/libp2p-gossipsub'
import { ipniContentRouting } from '@libp2p/ipni-content-routing'
import { kadDHT } from '@libp2p/kad-dht'
import { mplex } from '@libp2p/mplex'
import { webRTC, webRTCDirect } from '@libp2p/webrtc'
import { webTransport } from '@libp2p/webtransport'
import { autoNATService } from 'libp2p/autonat'
import { circuitRelayTransport, circuitRelayServer } from 'libp2p/circuit-relay'

const defaultState = {
  apiOpts: {
    host: '127.0.0.1',
    port: '5001',
    protocol: 'http'
  },
  provider: null, // 'ipfs-http-client' | 'js-ipfs'
  ipfsReady: false
}

function getUserOpts (key) {
  let userOpts = {}
  if (globalThis.localStorage) {
    try {
      const optsStr = globalThis.localStorage.getItem(key) || '{}'
      userOpts = JSON.parse(optsStr)
    } catch (error) {
      console.log(`Error reading '${key}' value from localStorage`, error)
    }
  }
  return userOpts
}

const bundle = {
  name: 'ipfs',

  reducer (state, { type, payload, error }) {
    state = state || defaultState
    if (type === 'IPFS_INIT_FINISHED') {
      return Object.assign({}, state, {
        ipfsReady: true,
        identity: payload.identity,
        provider: payload.provider,
        apiOts: payload.apiOpts || state.apiOpts
      })
    }

    if (type === 'IPFS_INIT_FAILED') {
      return Object.assign({}, state, { ipfsReady: false, error: error })
    }

    return state
  },

  getExtraArgs () {
    return { getIpfs: () => globalThis._ipfs }
  },

  selectIpfsReady: state => state.ipfs.ipfsReady,

  selectIpfsIdentity: state => state.ipfs.identity,

  doInitIpfs: () => async ({ dispatch, getState }) => {
    console.log('Looking for IPFS')
    console.time('IPFS_INIT')
    dispatch({ type: 'IPFS_INIT_STARTED' })

    let ipfs = null
    let identity = null

    // TODO: use delegatedContent&Peer routing via helia instead of kubo-rpc-client directly.
    // TRY kubo-rpc-client (kubo-rpc-client)
    const apiOpts = Object.assign(
      {},
      getState().ipfs.apiOpts,
      getUserOpts('ipfsApi')
    )
    // TRY helia!
    try {
      console.time('HELIA_INIT')
      console.log('Trying to start in-page helia')
      console.info(
        "🎛️ Customise your kubo-rpc-client opts by setting an `ipfsApi` value in localStorage. e.g. localStorage.setItem('ipfsApi', JSON.stringify({port: '1337'}))"
      )
      ipfs = await initHelia(apiOpts)
      console.log('got ipfs')
      // identity = await ipfs.libp2p.identify()
      identity = 'helia-TBD'
      console.log('in-page helia instance ready!', identity)
      globalThis._ipfs = ipfs
      console.timeEnd('HELIA_INIT')
      console.timeEnd('IPFS_INIT')
      return dispatch({
        type: 'IPFS_INIT_FINISHED',
        payload: {
          identity,
          provider: 'helia'
        }
      })
    } catch (error) {
      if (error.message && error.message.includes('subtle is undefined')) {
        console.warn('IPLD Explorer requires access to window.crypto, redirecting to canonical URL that is known to provide it in all browsers')
        // This error means js-ipfs was loaded in a context that is not marked
        // as Secure Context by the browser vendor.  (example: *.localhost in
        // Firefox until https://bugzilla.mozilla.org/show_bug.cgi?id=1220810
        // is addresssed)
        // This is difficult to debug for regular user, as Explorer simply fails to load anything from IPFS.
        // For now, we detect this failure and redirect to canonical version with TLS, so it always works.
        const url = new URL('https://explore.ipld.io/?x-ipfs-companion-no-redirect')
        // url.hash = window.location.hash
        // window.location.replace(url.toString())
        return
      }
      console.log('Failed to initialise helia', error)
      console.timeEnd('IPFS_INIT')
      return dispatch({ type: 'IPFS_INIT_FAILED', error })
    }
  }
}
export default bundle

async function initHelia (ipfsApi) {

  const delegatedClient1 = kuboClient(ipfsApi)
  const delegatedClient2 = kuboClient({
    protocol: 'https',
    port: 443,
    host: 'node3.delegate.ipfs.io'
  })
  const blockstore = new MemoryBlockstore()
  const datastore = new MemoryDatastore()
  // const { gossipsub } = await import('@chainsafe/libp2p-gossipsub')
  // import { yamux } from '@chainsafe/libp2p-yamux'
  const { yamux } = await import('./node_modules/@chainsafe/libp2p-yamux/dist/index.min.js')

  /**
   * based on https://github.com/ipfs/helia/blob/ed4985677b62021f76541354ad06b70bd53e929a/packages/helia/src/utils/libp2p.browser.ts#L20
   */
  const libp2p = await createLibp2p({
    addresses: {
      listen: [
        '/webrtc'
      ]
    },
    peerRouters: [
      delegatedPeerRouting(delegatedClient1),
      delegatedPeerRouting(delegatedClient2)
    ],
    contentRouters: [
      ipniContentRouting('https://cid.contact'),
      delegatedContentRouting(delegatedClient1),
      delegatedContentRouting(delegatedClient2)
    ],
    datastore,
    transports: [
      webRTC(),
      webRTCDirect(),
      webTransport(),
      webSockets(),
      circuitRelayTransport({
        discoverRelays: 1
      })
    ],
    connectionEncryption: [
      noise()
    ],
    streamMuxers: [
      yamux(),
      mplex()
    ],
    peerDiscovery: [
      bootstrap({
        list: [
          '/dnsaddr/bootstrap.libp2p.io/p2p/QmNnooDu7bfjPFoTZYxMNLWUQJyrVwtbZg5gBMjTezGAJN',
          '/dnsaddr/bootstrap.libp2p.io/p2p/QmQCU2EcMqAqQPR2i9bChDtGNJchTbq5TbXJJ16u19uLTa',
          '/dnsaddr/bootstrap.libp2p.io/p2p/QmbLHAnMoJPWSCR5Zhtx6BHJX9KiKNN6tpvbUcqanj75Nb',
          '/dnsaddr/bootstrap.libp2p.io/p2p/QmcZf59bWwK5XFi76CZX8cbJ4BhTzzA3gU1ZjYZcYW3dwt',
          '/ip4/104.131.131.82/tcp/4001/p2p/QmaCpDMGvV2BGHeYERUEnRQAwe3N8SzbUtfsmvsqQLuvuJ'
        ]
      })
    ],
    services: {
      identify: identifyService(),
      autoNAT: autoNATService(),
      // pubsub: gossipsub(),
      dht: kadDHT({
        clientMode: true
      }),
      relay: circuitRelayServer({
        advertise: true
      })
    }
  })
  console.info('Starting Helia')
  const helia = await createHelia({
    datastore,
    blockstore,
    libp2p
  })

  console.log('helia', helia)

  return helia
}
