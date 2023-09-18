import React from 'react';
import { useState, useEffect, useRef } from 'react'
import { ethers } from "ethers"
import Audio from '../../images/song.mp3'
import './Song.scss'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
import NotificationPopup from './NotificationPopup';
import Loader from './Loader';
import Avatar from 'react-avatar';

const Song = ({item={image: "https://i.pinimg.com/originals/49/a0/7a/49a07a20041787942f62dbe900573ecb.jpg",name:'Hills Have Eyes',price:2000000000000,audio:Audio,artistName:'Rihanna'},isOnSellInit=false,buyAction,resellAction,artist,statusInit='initial'}) => {
  console.log(item)
  console.log(artist)
  const [isPlaying, setIsPlaying] = useState(null)
  const [resellPrice,setResellPrice]=useState(0)
  const [isLoading1,setIsLoading1]=useState(false)
  const [isLoading2,setIsLoading2]=useState(false)
  const [message,setMessage]=useState(null)
  const [type,setType]=useState('')
  const [isOnSell,setIsOnSell]=useState(isOnSellInit)
  const [status,setStatus]=useState(statusInit)
  const [price,setPrice]=useState(item.price)
  const buyItem = async () => {
    try{
    setIsLoading1(true)
    const result=await buyAction(item.artist,item.itemId,price)
    console.log(result)
    setIsLoading1(false)
    setMessage('Transaction executed successfully!')
    setType('success')
    setIsOnSell(false)
    setStatus('My item')
    }catch(err){
      setMessage('Error occured: '+err)
      setType('error')
      setIsLoading1(false)
    }
}
const resellItem=async ()=>{
  try{
  setIsLoading2(true)
  const result=await resellAction(item.artist,item.itemId,resellPrice,artist.fee)
  console.log(result)
  setIsLoading2(false)
  setMessage('Transaction executed successfully!')
  setType('success')
  setIsOnSell(true)
  setStatus('On sale')
  setPrice(ethers.utils.parseEther(resellPrice.toString()))
  }catch(err){
    setMessage('Error occured: '+err)
    setType('error')
    setIsLoading2(false)
  }
}
const audioRef = useRef(null);
 
useEffect(() => {
  if (isPlaying) {
    audioRef.current.play()
  } else if (isPlaying !== null) {
    audioRef.current.pause()
  }
})
  if (!item || !artist)
    return (<Loader></Loader>)
  return (
  <>
  <NotificationPopup message={message} setMessage={setMessage} type={type} />
  <div className="albumContent">
        <div className="topBan">
            <div className='albumDeets'>
          <img
            src={item.image}
            alt="albumcover"
            className="albumCover"
          ></img>
          
          
          </div>
          <div className="albumDeets">
          <div>ARTIST</div>
            <div className='title'>
           
             <label>{item.artistName}</label>
             <Avatar size='55px' src={artist.image} round={true} name={artist.name}></Avatar>
            </div>
            <div>SONG</div>
            <div className="title">{item.name}</div>
            <div className="playButton" onClick={() => setIsPlaying(!isPlaying)} >
            {isPlaying?(<div>  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-pause" viewBox="0 0 16 16">
                            <path d="M6 3.5a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5zm4 0a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5z" />
                          </svg>PAUSE</div>):(<div> <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-play" viewBox="0 0 16 16">
                            <path d="M10.804 8 5 4.633v6.734L10.804 8zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692z" />
                          </svg>PLAY</div>)}
          </div>
          <div>Status of a song: {status}</div>
			  {status==='Purchased item'?(<></>):(
			  <> {isOnSell?(
          <>{isLoading1?(<Loader></Loader>):(  <div
            className="openButton"
            onClick={() => buyItem()} 
          >
           
            Buy for ${ethers.utils.formatEther(price)} ETH
            </div>)}</>):(
            <>
            {isLoading2?(<Loader></Loader>):(
                 <Popup trigger={<button className='openButton'>Resell item</button>} modal nested>
                 {close=>(
                   <div>
						 <div>Current price: ${ethers.utils.formatEther(price)}ETH</div>
						<div>Resell item for new price:</div>
						<div>
						<input type='number' step='any' onChange={(event)=>{setResellPrice(event.target.value)}}></input> ETH
					   
						</div>
						 <div>Artist fee you'll have to pay in order to resell:  ${ethers.utils.formatEther(artist.fee)}ETH</div>
						<button onClick={()=>{resellItem();close()}}>Resell</button>
               
                </div>)}
              </Popup>
            )}
             
           </>
             )}</>)}
         
              
           
          </div>
        </div>
        
        <div className="tableHeader">
           <audio src={item.audio} ref={audioRef} controls className='player'></audio>
         
        </div>
       
      </div>
  </>
)
}

export default Song;