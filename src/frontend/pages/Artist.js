import React, { useState,useEffect } from 'react'
import { useStore } from '../store/StoreContext'
import { getItemsByArtist, getTokensWithMetadata, getUnsoldItemsByArtist } from '../contract scripts/nftQueries.js';
import {getArtistContract,getArtist} from '../contract scripts/artist.js'
import ContentSection from './spotify components/ContentSection';
import { useLocation,useParams } from 'react-router-dom';
import Avatar from 'react-avatar';
import './Artist.scss'
function Artist({artistAdd='',artistName=null,artistShort=false,getUnsold=false}) {
  console.log(artistShort)
  const location=useLocation()
  const {artistId}=useParams();
  const artistAddress=artistAdd===''?artistId:artistAdd;
  const context=useStore();
  const marketContract=context.marketContract;
  //const artist=context.artist;
  const [items,setItems]=useState([])
  const [artist,setArtist]=useState(null)
  //const title=artist.address===artistAddress?'NFT Music Tokens created by me':'NFT Music Tokens created by: '+artistName
  const getArtistt=async()=>{
	  if(context.isArtist &&(context.artist.address.toLowerCase()===artistAddress.toLowerCase()))
	  {
		  setArtist(context.artist)
		  return;
	  }
	  const artistContract=await getArtistContract(marketContract,artistAddress,context.signer);
	  const artist1=await getArtist(artistContract)
	  setArtist(artist1)
  }
  const fetchItems=async()=>{
    let tokens=[]
    if(!getUnsold && context.isArtist &&(context.artist.address.toLowerCase()===artistAddress.toLowerCase()))
    
      
        tokens=await getItemsByArtist(artist.contract)
    
    else
    
        tokens=await getUnsoldItemsByArtist(marketContract,artistAddress,context.signer)
    
    let songs=await getTokensWithMetadata(tokens)
    songs=songs.map((item)=>({...item,link:'/artist/'+artistAddress+'/'+item.itemId}))
	if(artistShort)
	{
		console.log('short')
		songs=songs.slice(0,5)
	}
    setItems(songs)
  }
  useEffect(()=>{!artist&&getArtistt()})
  useEffect(()=>{items.length===0&&fetchItems()})
  return (
  <>
  {artist && !artistShort?(<div className='artistTitle artistPageTitle'>
                            <Avatar size='55px' src={artist.image} round={true} name={artist.name}></Avatar>
                            <h1 className="featuredTitle" >{artist.name}</h1>
							
                            </div>):(<></>)}
    <ContentSection title='Tokens' data={items} />
  </>
  )
}

export default Artist