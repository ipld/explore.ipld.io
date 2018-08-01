import React from 'react'
import { Helmet } from 'react-helmet'
import Box from '../components/box/Box'
import { colorForNode, nameForNode, shortNameForNode } from './object-info/ObjectInfo'
import ipldLogoSrc from './ipld.svg'
import IpldExploreForm from './IpldExploreForm'

const ExploreSuggestion = ({cid, name, type}) => {
  return (
    <a className='flex items-center lh-copy pl3 pl0-l pv3 bb b--black-10 link focus-outline' href={`#/explore/${cid}`}>
      <span className='flex items-center justify-center w3 h3 flex-shrink-0 br-100 tc' style={{background: colorForNode(type)}}>
        <span className='montserrat fw2 f4 snow' title={nameForNode(type)}>{shortNameForNode(type)}</span>
      </span>
      <span className='pl3 flex-auto'>
        <h2 className='ma0 fw4 f5 db black montserrat'>{name}</h2>
        <span className='f7 db blue truncate monospace'>{cid}</span>
      </span>
    </a>
  )
}

const StartExploringPage = ({embed}) => {
  return (
    <div>
      <Helmet>
        <title>Explore - IPFS</title>
      </Helmet>
      <div className='flex-l pl4-l'>
        <div className='flex-none mr3-l'>
          <div className='measure-l'>
            <div className='pl3 pl0-l pt4 pt2-l'>
              <h1 className='f3 f2-l ma0 fw4 montserrat charcoal'>Explore the Merkle Forest</h1>
              <p className='lh-copy f5 avenir charcoal-muted'>Paste a CID into box to fetch the IPLD node it addresses, or choose a featured dataset.</p>
            </div>
            {embed ? <IpldExploreForm /> : null}
            <ul className='list pl0 ma0 mt4 mt0-l bt bn-l b--black-10'>
              <li>
                <ExploreSuggestion name='Project Apollo Archives' cid='QmSnuWmxptJZdLJpKRarxBMS2Ju2oANVrgbr2xWbie9b2D' type='dag-pb' />
              </li>
              <li>
                <ExploreSuggestion name='IGIS git repo' cid='QmaAT6psXz1JguewRcr5vpckd2FCLZQ6bBJuMqf3YiU12r' type='git-raw' />
              </li>
              <li>
                <ExploreSuggestion name='An Ethereum Block' cid='z43AaGEvwdfzjrCZ3Sq7DKxdDHrwoaPQDtqF4jfdkNEVTiqGVFW' type='eth-block' />
              </li>
              <li>
                <ExploreSuggestion name='XKCD' cid='QmdmQXB2mzChmMeKY47C43LxUdg1NDJ5MWcKMKxDu7RgQm' type='dag-pb' />
              </li>
            </ul>
          </div>
        </div>
        <div className='flex-auto tc pt2'>
          <Box className='tl dib pa4 avenir measure-wide-l lh-copy dark-gray ba-l b--black-10'>
            <div className='tc'>
              <a className='link' href='https://ipfs.io/ipns/ipld.io'>
                <img src={ipldLogoSrc} alt='IPLD' style={{height: 60}} />
              </a>
            </div>
            <p>IPLD is <strong>the data model of the content-addressable web.</strong> It allows us to treat all hash-linked data structures as subsets of a unified information space, unifying all data models that link data with hashes as instances of IPLD.</p>
            <p>Content addressing through hashes has become a widely-used means of connecting data in distributed systems, from the blockchains that run your favorite cryptocurrencies, to the commits that back your code, to the web’s content at large. Yet, whilst all of these tools rely on some common primitives, their specific underlying data structures are not interoperable.</p>
            <p>Enter IPLD: a single namespace for all hash-inspired protocols. Through IPLD, links can be traversed across protocols, allowing you explore data regardless of the underlying protocol.</p>
          </Box>
        </div>
      </div>
    </div>
  )
}

export default StartExploringPage
