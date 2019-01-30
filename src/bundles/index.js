import { composeBundles } from 'redux-bundler'
import { exploreBundle } from 'ipld-explorer-components'
import ipfsBundle from './ipfs'
import routesBundle from './routes'

export default composeBundles(
  exploreBundle(async () => {
    const [
      // IPLD
      ipld,
      // IPLD Formats
      ipldBitcoin, ipldDagCbor, ipldDagPb, ipldGit, ipldRaw, ipldZcash,
      { ethAccountSnapshot, ethBlock, ethBlockList, ethStateTrie, ethStorageTrie, ethTxTrie, ethTx }
    ] = await Promise.all([
      import(/* webpackChunkName: "ipld" */ 'ipld'),
      import(/* webpackChunkName: "ipld" */ 'ipld-bitcoin'),
      import(/* webpackChunkName: "ipld" */ 'ipld-dag-cbor'),
      import(/* webpackChunkName: "ipld" */ 'ipld-dag-pb'),
      import(/* webpackChunkName: "ipld" */ 'ipld-git'),
      import(/* webpackChunkName: "ipld" */ 'ipld-raw'),
      import(/* webpackChunkName: "ipld" */ 'ipld-zcash'),
      import(/* webpackChunkName: "ipld" */ 'ipld-ethereum')
    ])

    return {
      ipld: ipld,
      formats: [
        ipldBitcoin, ipldDagCbor, ipldDagPb, ipldGit, ipldRaw, ipldZcash,
        ethAccountSnapshot, ethBlock, ethBlockList, ethStateTrie, ethStorageTrie, ethTxTrie, ethTx
      ]
    }
  }),
  routesBundle,
  ipfsBundle
)
