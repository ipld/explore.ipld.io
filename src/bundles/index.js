import { composeBundles } from 'redux-bundler'
import { exploreBundle } from 'ipld-explorer-components'
import ipfsBundle from './ipfs'
import routesBundle from './routes'

export default composeBundles(
  exploreBundle(async () => {
    const ipldDeps = await Promise.all([
      import(/* webpackChunkName: "ipld" */ 'ipld'),
      import(/* webpackChunkName: "ipld" */ 'ipld-bitcoin'),
      import(/* webpackChunkName: "ipld" */ 'ipld-dag-cbor'),
      import(/* webpackChunkName: "ipld" */ 'ipld-dag-pb'),
      import(/* webpackChunkName: "ipld" */ 'ipld-git'),
      import(/* webpackChunkName: "ipld" */ 'ipld-raw'),
      import(/* webpackChunkName: "ipld" */ 'ipld-zcash'),
      import(/* webpackChunkName: "ipld" */ 'ipld-ethereum')
    ])

    // CommonJs exports object is .default when imported ESM style
    const [ipld, ...formats] = ipldDeps.map(mod => mod.default)
    // ipldEthereum is an Object, each key points to a ipld format impl
    const ipldEthereum = formats.pop()
    formats.push(...Object.values(ipldEthereum))
    return {
      ipld,
      formats
    }
  }),
  routesBundle,
  ipfsBundle
)
