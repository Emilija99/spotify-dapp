import React, { useState,useEffect } from 'react'
import { useStore } from '../store/StoreContext'
import {getTokensWithMetadata, getUserResales } from '../contract scripts/nftQueries.js'
import ContentSection from './spotify components/ContentSection'
import { useLocation } from 'react-router-dom'
import './Artist.scss'
function MyResales() {
  const {marketContract,account,signer}=useStore()
  const [items,setItems]=useState([])
  const location=useLocation()
  const fecthItems=async()=>{
    const tokens=await getUserResales(marketContract,account,signer);
    console.log(tokens);
    let songs=await getTokensWithMetadata(tokens)
    songs=songs.map((item)=>({...item,link:location.pathname+'/'+item.itemId}))
    setItems(songs)
  }
  useEffect(()=>{
    items.length===0&&fecthItems()
  })
  return (
  <>
    <h1 className='featuredTitle artistPageTitle'>Tokens I Put on Resale:</h1>
    <ContentSection title='My Resales' data={items} />
  </>
  )
}

export default MyResales