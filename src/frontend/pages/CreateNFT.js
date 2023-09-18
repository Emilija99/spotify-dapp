import React from 'react'
import MintNFT from './spotify components/MintNFT'
import { useStore } from '../store/StoreContext'
import { mintNFT } from '../contract scripts/nftTransactions'

function CreateNFT() {
  const {marketContract,artist,isArtist}=useStore()
  const mintFunction=isArtist?async(song)=>{
    await mintNFT(marketContract,song,artist.fee,artist.name)
  }:null
  return(
    <>{
      isArtist?(
        <MintNFT mintNFTFunction={mintFunction} artistFee={artist.fee} artistName={artist.name}></MintNFT>):
        (<h1 style={{color:'white'}}>You can't mint tokens until you become an artist.</h1>)
      
    }</>
  )
}

export default CreateNFT