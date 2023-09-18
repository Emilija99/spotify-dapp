import { ethers } from "ethers"
import MusicalNFTMarketplaceAbi from '../contractsData/MusicalNFTMarketplace.json'
//import MusicalNFTMarketplaceAddress from '../contractsData/MusicalNFTMarketplace-address.json'
//import MusicalNFTMarketplaceAbi from '../../../etherium/build/contracts/MusicalNFTMarketplace.json'
const MusicalNFTMarketplaceAddress='0xb15245DDd0e9c0683cbc10d30222476E9427F8e5'
export const connectWallet=async()=>{
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const account=accounts[0]
    // Get provider from Metamask
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    // Get signer
    const signer = provider.getSigner()
    return {account,signer}
}

export const getMarketContract=async(signer)=>{
    const contract = new ethers.Contract(MusicalNFTMarketplaceAddress, MusicalNFTMarketplaceAbi.abi, signer)
    return contract
}