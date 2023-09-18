import MusicNFTUserAbi from '../contractsData/MusicNFTUser.json'
import MusicNFTArtistAbi from '../contractsData/MusicNFTArtist.json'
import { ethers } from "ethers"
//import MusicNFTUserAbi from '../../../etherium/build/contracts/MusicNFTUser.json'
//import MusicNFTArtistAbi from '../../../etherium/build/contracts/MusicNFTArtist.json'
export const getUserContract=async(contract,account,signer)=>{
    const userContractAddress=await contract.userContract();
    const userContract= new ethers.Contract(userContractAddress, MusicNFTUserAbi.abi, signer);
    return userContract;
}