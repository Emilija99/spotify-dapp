import React from 'react'
import Popup from 'reactjs-popup'
import {Button } from 'react-bootstrap'
import './NotificationPopup.scss'

function NotificationPopup({message,setMessage,type}) {
    console.log(type)
  return (
    <Popup className='popup' open={message?true:false} closeOnEscape={false} closeOnDocumentClick={true} modal nested>{close=>(<div className={'popup '+type}>
    <h5>{message}</h5>
    <Button className={'okButton '+type+'Btn'} variant={type==='success'?'success':'danger'} onClick={()=>{setMessage(null);close()}}>OK</Button>
   
</div>)}</Popup>
  )
}

export default NotificationPopup