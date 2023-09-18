import { ethers } from "ethers"
import MusicNFTArtistAbi from '../contractsData/MusicNFTArtist.json'
//import MusicNFTArtistAbi from '../../../etherium/build/contracts/MusicNFTArtist.json'
import {ipfsGateway,ARTIST_API_KEY} from './config.js'
import {contentFromURI} from './utils.js'
import { NFTStorage, File } from 'nft.storage';

export const IsArtist=async(contract,account)=>{
  const artistAddress=await contract.artists(account);
  if (artistAddress===ethers.constants.AddressZero)
    return false;
  return true;
}
export const getArtistContract=async (contract,account,signer)=>{
  const artistAddress=await contract.artists(account);
  const artistContract = new ethers.Contract(artistAddress, MusicNFTArtistAbi.abi, signer);
  return artistContract;
}

export const getArtist= async (artistContract)=>{
    const artistURL=await artistContract.artistURI();
    const artistAddress=await artistContract.artist();
    const artistFee=await artistContract.royaltyFee();
    const url=ipfsGateway+artistURL.substring(7);
    console.log(url)
    const artistMetadataResponse=await fetch(url);
    const artistMetadata=await artistMetadataResponse.json()
    const artistImage=await contentFromURI(artistMetadata.image)
    return {
      address:artistAddress,
      contract:artistContract,
      image:artistImage,
      name:artistMetadata.name,
      fee:artistFee
    }
  
}
export const getArtistsAddresses=async (marketContract)=>{
  const artistAddresses=await marketContract.getAllArtists();
  console.log(artistAddresses)
  return artistAddresses;
}
export const getAllArtists=async (marketContract,signer)=>{
  const addresses=await getArtistsAddresses(marketContract);
  const artistsContracts=await Promise.all(addresses.map(address=>(
     getArtistContract(marketContract,address,signer)
    
  )));
  console.log(artistsContracts)
  const artists=await Promise.all(artistsContracts.map(contract=>(
    getArtist(contract)
  )))
  console.log(artists)
  return artists;
}

export const createArtist=async(artist,marketContract)=>{
  console.log(ARTIST_API_KEY)
  const storage = new NFTStorage({ token: ARTIST_API_KEY });
  let metadata = await storage.store({
      name:artist.name,
      image: artist.imgFile && new File([artist.imgFile], `${artist.name}.jpg`, { type: 'image/jpg' }),
      royaltyFee:artist.artistFee,
      description: `${artist.name}'s metadata`,
    });
    console.log(metadata.url);
    const price = ethers.utils.parseEther(artist.artistFee.toString())
    const transaction=await marketContract.createArtist(price,metadata.url);
    const receipt=await transaction.wait()
    return receipt;
}