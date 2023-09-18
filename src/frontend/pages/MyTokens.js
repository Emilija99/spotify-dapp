import React, { useState,useEffect } from 'react'
import { useStore } from '../store/StoreContext'
import {getTokensWithMetadata, getUserItems } from '../contract scripts/nftQueries.js'
import ContentSection from './spotify components/ContentSection'
import { getUserContract } from '../contract scripts/user'
import { useLocation } from 'react-router-dom'
import './Artist.scss'
function MyTokens() {
    const {marketContract,account,signer}=useStore()
    const [items,setItems]=useState([])
    const location=useLocation()
    const fecthItems=async()=>{
      const userContract=await getUserContract(marketContract,account,signer);
      console.log(userContract)
      const tokens=await getUserItems(userContract);
      let songs=await getTokensWithMetadata(tokens)
      songs=songs.map((item)=>({...item,link:location.pathname+'/'+item.itemId}))
      setItems(songs)
    }
    useEffect(()=>{
      items.length===0&&fecthItems()
    })
    return (
	<>
	<h1 className='featuredTitle artistPageTitle'>Tokens I Purchased:</h1>
      <ContentSection title='My Tokens' data={items} />
	 </>
    )
}

export default MyTokens