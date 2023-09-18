import React,{useState,useEffect} from 'react'
import { ethers } from "ethers"
import Song from './spotify components/Song'
import { useStore } from '../store/StoreContext';
import { buyNFT, resellNFT } from '../contract scripts/nftTransactions';
import { getArtist, getArtistContract } from '../contract scripts/artist';
import { useLocation } from 'react-router-dom';
import Loader from './spotify components/Loader';
import { getToken,  getNFTwithMetadata} from '../contract scripts/nftQueries.js';
import { useParams } from 'react-router-dom';
function NFT() {
  console.log('cao')
  const { state: song} = useLocation()
  const [item,setItem]=useState(song)
  console.log(item)
  const {marketContract,account,signer}=useStore()
  const [artist,setArtist]=useState(null)
  const {artistId,itemId}=useParams()
  const tokenId=itemId;
  console.log(artistId)
  console.log(tokenId)
  const isItemOnResell=()=>{
    return item.owner.toLowerCase()===ethers.constants.AddressZero.toLowerCase()?false:true;
  }
  const isActionNeeded=()=>{
    return isItemOnResell() ||  (item.owner.toLowerCase()===account.toLowerCase())
  }
  
 
  const getStatus=()=>{
    if (item.owner.toLowerCase()===account.toLowerCase())
          return 'My Item'
    if(!isItemOnResell())
          return 'On Sale'
    else return 'Purchased item'
  }
  const loadItem=async()=>{
	console.log('1')
    const token=await getToken(marketContract,artistId,parseInt(tokenId),signer);
	console.log(token)
    const fullToken=await  getNFTwithMetadata(token)
	console.log(fullToken)
    setItem(fullToken)
  }
  const loadArtist=async()=>{
    const artistContract=await getArtistContract(marketContract,item.artist,signer)
    console.log(artistContract)
    const artist1=await getArtist(artistContract)
    console.log(artist1)
    setArtist(artist1)
  }
  const loadEverything=async()=>{
    if(!item)
      await loadItem();
    await loadArtist();
  }
  useEffect(()=>{
    (!artist || !item)&&loadEverything()
  })
  const buyItemFunction=async(artistAddress,tokenId,tokenPrice)=>{
    await buyNFT(marketContract,artistAddress,tokenId,tokenPrice)
  }
  const resellItemFunction=async(artistAddress,tokenId,newTokenPrice,artistFee)=>{
    await resellNFT(marketContract,artistAddress,tokenId,newTokenPrice,artistFee)
  }
  
  if(!item || !account)
    return(<Loader></Loader>)
  return (
    
    <Song item={item} isOnSellInit={!isItemOnResell()} buyAction={buyItemFunction} resellAction={resellItemFunction} artist={artist} isAction={isActionNeeded()} statusInit={getStatus()} />
  )
}

export default NFT