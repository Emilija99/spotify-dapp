import FileSelector from './FileSelector';
import {useState} from 'react'
import "./skeleton.css";
import "./normalize.css";
import { ethers } from "ethers"
import './Form.scss'
import Loader from './Loader';
import NotificationPopup from './NotificationPopup';


const MintNFT=({mintNFTFunction,artistFee,artistName})=>{
  
    const [song,setSong]=useState({});
    const [isLoading,setIsLoading]=useState(false)
    const [message,setMessage]=useState(null)
    const [type,setType]=useState('')
    const setName = (event) => {
        const name = event.target.value;
        setSong({...song, name});
      }
      const setPrice = (event) => {
        const price = event.target.value;
        setSong({...song, price});
      }
      const handleSubmit=async (event)=>{
        try{
        event.preventDefault();
        console.log(song);
        setIsLoading(true)
        await mintNFTFunction(song);
        setIsLoading(false)
        setMessage('Transaction executed successfully!')
        setType('success')
        //console.log(result);
        }catch(err){
          console.log(err)
          setMessage('Error occured: '+err)
          setType('error')
          setIsLoading(false)
        }
        
      }
     
    
      return(
        <div className='forma'>
            <NotificationPopup message={message} setMessage={setMessage} type={type} />
      <form onSubmit={handleSubmit}>
        <h3>Mint NFT token</h3>
        <div className="row">
            <FileSelector song={song} setSong={setSong} label='Image' />
            <FileSelector song={song} setSong={setSong} label='Audio' />
            <div>
            <label for="nameInput">Name of a song</label>
            <input
              className="u-full-width"
              type="text"
              placeholder="Song name"
              id="nameInput"
              onChange={setName}
            />
            </div>
            <div>
            <label for="priceInput">Enter price of a song (ETH):</label>
            <input
              className="u-full-width"
              type="number"
              step='any'
              placeholder="0.0 ETH"
              id="nameInput"
              onChange={setPrice}
            />
            </div>
           <div>Your artist fee: {artistFee?ethers.utils.formatEther(artistFee):0} ETH</div>
          </div>
          {isLoading?(<Loader></Loader>):(<input className="button-primary" type="submit" value="Mint" />)}
        
      </form>
    </div>
      )
    
}

export default MintNFT;
