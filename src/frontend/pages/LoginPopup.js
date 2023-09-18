import React,{useState} from 'react'
import Popup from 'reactjs-popup'
import { useStore } from '../store/StoreContext';
import {Button } from 'react-bootstrap'
import './LoginPopup.scss'
import Loader from './spotify components/Loader';
import { useNavigate } from "react-router-dom";
function LoginPopup({connected=false,message='Please connect to your Metamask wallet in order to use this app:',setConnected}) {
    const {account,loadStore}=useStore()
    const [isLoading,setIsLoading]=useState(false)
	 const navigate=useNavigate()
    const loadContext=async()=>{
        setIsLoading(true)
        await loadStore()
        setConnected(true)
        setIsLoading(false)
		navigate('/')
    }
  return (
    <Popup className='popup' open={!connected} closeOnEscape={false} closeOnDocumentClick={false} modal nested>{close=>(<div className='popup'>
        <h4>{message}</h4>
       {isLoading?(<Loader></Loader>):
       ( <Button onClick={()=>{loadContext()}} className='popButton'>Connect Wallet</Button>)
        }
    </div>)}</Popup>
  )
}

export default LoginPopup