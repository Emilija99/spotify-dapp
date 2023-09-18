
import {
  Link,
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import { useState } from 'react'
import { ethers } from "ethers"
import MusicalNFTMarketplaceAbi from '../contractsData/MusicalNFTMarketplace.json'
import MusicalNFTMarketplaceAddress from '../contractsData/MusicalNFTMarketplace-address.json'
import { Spinner, Navbar, Nav, Button, Container } from 'react-bootstrap'
import logo from './logo.png'
import Home from './Home.js'
import '../pages/App.css'
import {Layout} from "antd";
import Logo from '../images/pngwing.png';
import { SearchOutlined, DownCircleOutlined } from "@ant-design/icons";
import Artist from "../pages/Artist";

import ContentSection from "../pages/spotify components/ContentSection";
import Song from "../pages/spotify components/Song";
import StoreProvider from "../store/StoreContext";
import Router from "../routes/Router";


const {Footer,Sider,Content} = Layout;

function App() {
  const [loading, setLoading] = useState(true)
  const [account, setAccount] = useState(null)
  const [contract, setContract] = useState({})
 const[signer1,setSigner]=useState({})
  const web3Handler = async () => {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    setAccount(accounts[0])
    // Get provider from Metamask
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    // Get signer
    const signer = provider.getSigner()
   
    console.log(signer)
    loadContract(signer)
  }
  const loadContract = async (signer) => {
    // Get deployed copy of music nft marketplace contract
    const contract = new ethers.Contract(MusicalNFTMarketplaceAddress.address, MusicalNFTMarketplaceAbi.abi, signer)
    setContract(contract)
    setSigner(signer)
    setLoading(false)
  }
  return (
    <StoreProvider>
    <div className='App'>
      <Router />
    </div>
    </StoreProvider>

  );
}

export default App;