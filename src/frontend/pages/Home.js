import React from 'react';
import { Link } from "react-router-dom";
import "./Home.css";
import { Tabs } from "antd";
import { library } from "../helpers/Albums.js";
import { useState, useEffect, useRef } from 'react'
import Identicon from 'identicon.js'
import { useStore } from '../store/StoreContext'
import { getAllArtists } from '../contract scripts/artist';
import Artist from './Artist';
import Avatar from 'react-avatar';
import SectionHeader from './spotify components/SectionHeader.js';
const { TabPane } = Tabs;



const Home = ({ contract }) => {
  const [artists,setArtists]=useState([])
  const {marketContract,signer}=useStore()
  const [loading, setLoading] = useState(true)
  const loadArtists = async () => {
   
    const artists1=await getAllArtists(marketContract,signer)
    setArtists(artists1)
    setLoading(false)
  }
  useEffect(() => {
    artists.length===0 && loadArtists()
  })


return(
  <>
      <>
      <Tabs defaultActiveKey="1" centered>
             
              <TabPane tab="ARTISTS" key="1">
                {artists.map(artist=>(
                            <>
                            <div className='artistTitle'>
                            <Avatar size='55px' src={artist.image} round={true} name={artist.name}></Avatar>
                            <h1 className="featuredTitle" >{artist.name}</h1>
							
                            </div>
                            <div className="albums" >
							  <SectionHeader type="link" title="" linkTo={`/artist/${artist.address}`} />
                              <Artist artistAdd={artist.address} artistShort={true} getUnsold={true}></Artist>
                            </div>
                            </>
                ))}
               

              </TabPane>
           
           
            </Tabs>
    </>
  </>
)
}

export default Home;