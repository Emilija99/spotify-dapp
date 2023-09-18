import FileSelector from './FileSelector';
import {useState} from 'react'
import "./skeleton.css";
import "./normalize.css";
import {Form,Input,Button,Segment, Label} from 'semantic-ui-react'
import { AutoComplete } from 'antd';
import './Form.scss'
import Loader from './Loader';
import NotificationPopup from './NotificationPopup';



const CreateArtist=({createArtistFunction})=>{
    const [artist,setArtist]=useState({})
    const [isLoading,setIsLoading]=useState(false)
    const [message,setMessage]=useState(null)
    const [type,setType]=useState('')
    const setName = (event) => {
        const name = event.target.value;
        setArtist({...artist, name});
      }
      const setFee = (event) => {
        const artistFee = event.target.value;
        setArtist({...artist, artistFee});
      }
      const handleSubmit=async (event)=>{
        try{
        event.preventDefault();
        setIsLoading(true)
        console.log(artist)
        await createArtistFunction(artist);
        setIsLoading(false)
        setMessage('Transaction executed successfully!')
        setType('success')
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
      <Segment inverted>
      <Form onSubmit={handleSubmit} inverted>
        <h3>Become an artist</h3>
       
        <div className="row">
        <label for="nameInput">Your name:</label>
            <input
              className="u-full-width"
              type="text"
              placeholder="John Doe"
              id="nameInput"
              onChange={setName}
            />
             </div>
             <div className='row'>
            <FileSelector song={artist} setSong={setArtist} label='Image' />
        
           
           
            </div>
            <div className='row'>
            <label for="feeInput">Enter fee you would like to receive everytime someone purchases your song (ETH):</label>
            <input
              className="u-full-width"
              type="number"
              step='any'
              placeholder="0.0 ETH"
              id="nameInput"
              onChange={setFee}
            />
            </div>
          
            {isLoading?(
          <Loader></Loader>
        ):(<></>)}
         
        <Button className="button-primary subButton" type="submit" value="Create yout artist account">Submit</Button>
       
      </Form>
      </Segment>
    </div>
      )
}

export default CreateArtist;