import React,{useState,useEffect} from "react";
import { BrowserRouter, Routes, Route, Redirect } from "react-router-dom";
import Home from "../pages/Home";
import BecomeArtist from "../pages/BecomeArtist";
import CreateNFT from "../pages/CreateNFT.js";
import NFT from "../pages/NFT";
import Artist from "../pages/Artist";
import MyTokens from "../pages/MyTokens";
import MyResales from "../pages/MyResales";
import Navbar from "./Navbar";
import {Layout} from "antd";
import { useStore } from "../store/StoreContext";
import LoginPopup from "../pages/LoginPopup";
import Earnings from "../pages/Earnings";
import {useNavigate} from 'react-router-dom'
const {Footer,Sider,Content} = Layout;

function Router(){
    const {account,clearStore}=useStore()
    const [loginMessage,setLoginMessage]=useState('Please connect to your Metamask wallet in order to use this app:')
    const [connected,setConnected]=useState(account?true:false)
	
    useEffect(()=>{
        if(window.ethereum){
            window.ethereum.on('chainChanged',()=>{
                    console.log('chainChanged')
				
                    
                    setConnected(false)
					clearStore()
                    setLoginMessage('Blockchain changed. Please reconnect to your Metamask wallet.')
            })
            window.ethereum.on('accountsChanged',()=>{
                console.log('accountsChanged')
			
                
                setConnected(false)
				clearStore()
                setLoginMessage('Account changed. Please reconnect to your Metamask wallet.')
            })

        }
    })
    return (
        <BrowserRouter>
        
            <Layout>
            <Layout>
            <Navbar />
			  <Content className='contentWindow'>
            {!connected?(<LoginPopup connected={connected} message={loginMessage} setConnected={setConnected}></LoginPopup>):(
              
                <Routes>
                    <Route path='/' element={<Home />}/>
                    <Route path='/become-an-artist' element={<BecomeArtist />}/>
                    <Route path='/mint-nft' element={<CreateNFT />}/>
                    <Route exact path='/my-art' element={<Artist artistAddress={account}/>} />
                    <Route path='/my-art/:itemId' element={<NFT />}></Route>
                    <Route exact path='/artist/:artistId' element={<Artist/>} />
                    <Route path='/artist/:artistId/:itemId' element={<NFT />}></Route>
                    <Route exact path='/my-tokens' element={<MyTokens />} />
                    <Route path='/my-tokens/:itemId' element={<NFT />}></Route>
                    <Route exact path='/my-resales' element={<MyResales />} />
                    <Route path='/my-resales/:itemId' element={<NFT />}></Route>
                    <Route path='/my-earnings' element={<Earnings />}></Route>
                </Routes>
               
            )}
			 </Content>
            
            </Layout>
            </Layout>
        </BrowserRouter>

        
    )
}
export default Router;