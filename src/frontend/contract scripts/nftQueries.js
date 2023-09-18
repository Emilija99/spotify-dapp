import { getArtistContract } from './artist.js';
import {ipfsGateway} from './config.js';
import {contentFromURI} from './utils.js'
import { ethers } from "ethers"

export const getNFTwithMetadata=async(token)=>{
	console.log(token)
    const url=ipfsGateway+token.tokenURI.substring(7)
    const response=await fetch(url)
    const metadata=await response.json();
    const imageSrc=await contentFromURI(metadata.image)
    const audioSrc=await contentFromURI(metadata.audio)
    // define item object
  let item = {
    artist:token.artist,
    price: token.price,
    itemId: token.tokenId,
    name: metadata.name,
    artistName:metadata.artistName,
    audio: audioSrc,
    image:imageSrc,
    seller:token.seller,
    owner:token.owner
  }
  return item
}
export const getToken=async(marketContract,artistAddress,tokenId,signer)=>{
	
    const artistContract=await getArtistContract(marketContract,artistAddress,signer);
	
    const token=await artistContract.getToken(tokenId);
	
	
    return token;
}
export const getTokensWithMetadata=async (tokens)=>{
    return await Promise.all(tokens.map(async i=>getNFTwithMetadata(i)));
    
}

export const getItemsByArtist=async(artistContract)=>{
    return await artistContract.getMyTokens();
   }

export const getUnsoldItemsByArtist=async (marketContract,artistAddress,signer)=>{
    const artistContract=await getArtistContract(marketContract,artistAddress,signer)
    const result= await artistContract.getAllUnsoldTokens();
    return result
}

export const getUserItems=async(userContract)=>{
    return await userContract.getMyItems();
}

export const getUserResales=async(marketContract,account,signer)=>{
   
    const filter = marketContract.filters.MarketItemRelisted(null, account, null,null)
    const resaleEvents= await marketContract.queryFilter(filter)
    let tokens=await Promise.all(resaleEvents.map((event)=>(getToken(marketContract,event.args.artist,event.args.tokenId,signer))))
	console.log(tokens)
	tokens=removeDuplicates(tokens);
    return tokens.filter(token=>token.owner.toLowerCase()===ethers.constants.AddressZero.toLowerCase())
}

const removeDuplicates=(data)=>{
	return data.reduce((accumulator,current)=>{
		if(!accumulator.find((item)=>(item.artist===current.artist && item.itemId===current.itemId))){
			accumulator.push(current)
		}
		return accumulator;
	},[])
}