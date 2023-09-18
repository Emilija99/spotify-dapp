import React from 'react'
import { useStore } from '../store/StoreContext'
import { createArtist } from '../contract scripts/artist';
import CreateArtist from './spotify components/CreateArtist';
import './BecomeArtist.scss'
function BecomeArtist() {
  const {marketContract,loadStore}=useStore();
  const createArtistFunction=async(artist)=>{
   const result= await createArtist(artist,marketContract)
   console.log(result)
    await loadStore()
  }
  return (
    <CreateArtist className='becomeArtist' createArtistFunction={createArtistFunction} />
  )
}

export default BecomeArtist