import root from 'window-or-global'

const defaultState = {
  apiOpts: {
    host: '127.0.0.1',
    port: '5001',
    protocol: 'http'
  },
  provider: null, // 'window.ipfs' | 'js-ipfs-api' | 'js-ipfs'
  ipfsReady: false
}

export default {
  name: 'ipfs',

  reducer(state, { type, payload, error }) {
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

  getExtraArgs() {
    return { getIpfs: () => root._ipfs }
  },

  selectIpfsReady: state => state.ipfs.ipfsReady,

  selectIpfsIdentity: state => state.ipfs.identity,

  doInitIpfs: () => async ({ dispatch, getState }) => {
    console.log('Looking for IPFS')
    console.time('IPFS_INIT')
    dispatch({ type: 'IPFS_INIT_STARTED' })

    let ipfs = null
    let identity = null

    // TRY window.ipfs!
    if (root.ipfs) {
      try {
        if (root.ipfs.enable) {
          root._ipfs = await root.ipfs.enable({ commands: ['id', 'block.get'] })
        } else {
          root._ipfs = root.ipfs
        }
        identity = await root._ipfs.id()
        console.log('Found `window.ipfs`. Nice!', root._ipfs)
        console.timeEnd('IPFS_INIT')
        return dispatch({
          type: 'IPFS_INIT_FINISHED',
          payload: {
            identity,
            provider: 'window.ipfs'
          }
        })
      } catch (error) {
        console.log('Failed to get id from window.ipfs', error)
      }
    } else {
      console.log(
        'No window.ipfs found. Consider Installing the IPFS Companion web extension - https://github.com/ipfs-shipyard/ipfs-companion'
      )
    }

    // TRY js-ipfs-api!
    const apiOpts = Object.assign(
      {},
      getState().ipfs.apiOpts,
      getUserOpts('ipfsApi')
    )
    try {
      console.time('IPFS_INIT_API')
      const { default: ipfsClient } = await import('ipfs-http-client')
      console.log('Trying ipfs-http-client', apiOpts)
      console.info(
        "🎛️ Customise your js-ipfs-api opts by setting an `ipfsApi` value in localStorage. e.g. localStorage.setItem('ipfsApi', JSON.stringify({port: '1337'}))"
      )
      ipfs = ipfsClient(apiOpts)
      identity = await ipfs.id()
      console.log('js-ipfs-api ready!')
      root._ipfs = ipfs
      console.timeEnd('IPFS_INIT_API')
      console.timeEnd('IPFS_INIT')
      return dispatch({
        type: 'IPFS_INIT_FINISHED',
        payload: {
          identity,
          provider: 'js-ipfs-api',
          apiOpts
        }
      })
    } catch (error) {
      console.log('No ipfs-api found', error)
    }

    const ipfsOpts = getUserOpts('ipfsOpts')
    // TRY js-ipfs!
    try {
      console.time('IPFS_INIT_JS_IPFS')
      console.log('Trying js-ipfs', ipfsOpts)
      console.info(
        "🎛️ Customise your js-ipfs opts by setting an `ipfsOpts` value in localStorage. e.g. localStorage.setItem('ipfsOpts', JSON.stringify({relay: {enabled: true}}))"
      )
      const { default: Ipfs } = await import('ipfs')
      console.log('got Ipfs')
      const ipfs = await initJsIpfs(Ipfs, ipfsOpts)
      console.log('got ipfs')
      identity = await ipfs.id()
      console.log('js-ipfs ready!')
      root._ipfs = ipfs
      console.timeEnd('IPFS_INIT_JS_IPFS')
      console.timeEnd('IPFS_INIT')
      return dispatch({
        type: 'IPFS_INIT_FINISHED',
        payload: {
          identity,
          provider: 'js-ipfs'
        }
      })
    } catch (error) {
      console.log('Failed to initialise js-ipfs', error)
      console.timeEnd('IPFS_INIT')
      return dispatch({ type: 'IPFS_INIT_FAILED', error })
    }
  }
}

function getUserOpts(key) {
  let userOpts = {}
  if (root.localStorage) {
    try {
      const optsStr = root.localStorage.getItem(key) || '{}'
      userOpts = JSON.parse(optsStr)
    } catch (error) {
      console.log(`Error reading '${key}' value from localStorage`, error)
    }
  }
  return userOpts
}

function initJsIpfs(Ipfs, opts) {
  return new Promise((resolve, reject) => {
    const ipfs = new Ipfs(opts)
    ipfs.once('ready', () => resolve(ipfs))
    ipfs.once('error', err => reject(err))
  })
}
