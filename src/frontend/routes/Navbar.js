import React,{useState} from 'react'
import {
    Link,
  } from "react-router-dom";
import {Layout} from "antd";
import Logo from '../images/pngwing.png';
import { useStore } from '../store/StoreContext';

import Popup from 'reactjs-popup'
import Avatar from 'react-avatar';
const {Sider} = Layout;

function Navbar() {
    const {marketContract,account,signer,isArtist,artist,loadStore}=useStore()
    
    const loadContext=async()=>{
        await loadStore()
    }
  return (

    <Sider  class='side' width={250}> 
      <img src={Logo} alt='logo' className='logo'></img>
    
      {isArtist?(<div className='searchBar'><Avatar size='80px' src={artist.image} round={true} name={artist.name}></Avatar><label>{artist.name}</label></div>):(<></>)}
      
      <Link to="/">
        <p style={{ color: "#1DB954" }}> Home </p>
      </Link>    
     
      {isArtist?(<Link to={'/artist/'+account}><p> My Art </p></Link>):(<></>)}
      <Link to='/my-tokens'><p> My Tokens </p></Link>
      <Link to="/my-earnings"><p> My Earnings </p></Link>
      <Link to="/my-resales"><p> My Resales </p></Link>
      {isArtist?(<Link to="/mint-nft"><p> Mint Tokens </p></Link>):(<></>)}
      {!isArtist?(<Link to="/become-an-artist"><p>Become an artist </p></Link>):(<></>)}
      <div className="recentPlayed">
        
        <div className="install">
         {account?(
                      <div><div>Your account address:</div><Link  to={`https://sepolia.etherscan.io/address/${account}`} target='_blank' variant="outline-light">
                       {account.slice(0, 5) + '...' + account.slice(38, 42)}
                      </Link></div>):(<div>Waiting for connection</div>)
}

                   
                
           
        </div>
      </div>
      </Sider>
    
      
  )//return end
}
//component end
export default Navbar