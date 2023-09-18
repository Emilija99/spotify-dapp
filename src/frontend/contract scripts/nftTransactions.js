import {NFT_API_KEY} from './config.js'
import { NFTStorage, File } from 'nft.storage';
import { ethers } from "ethers"

export const mintNFT=async(marketContract,songNFT,artistFee,artistName)=>{
    const storage = new NFTStorage({ token: NFT_API_KEY });
        
    let metadata = await storage.store({
        name:songNFT.name,
        artistName:artistName,
        image: songNFT.imgFile && new File([songNFT.imgFile], `${songNFT.name}.jpg`, { type: 'image/jpg' }),
        audio: songNFT.audioFile && new File([songNFT.audioFile], `${songNFT.name}.mp3`, { type: 'audio/mp3' }),
        description: `${songNFT.name}'s metadata`,
    });
    console.log(metadata.url)

    const price = ethers.utils.parseEther(songNFT.price.toString())
    const result=await (await marketContract.mintToken(price,metadata.url,{value:artistFee})).wait();
    console.log(result)
    return result;
}

export const buyNFT=async(marketContract,artistAddress,tokenId,tokenPrice)=>{
    //const price=ethers.utils.formatEther(tokenPrice)
    //const price1=BigNumber.from(tokenPrice._hex)
    const result=await (await marketContract.buyToken(artistAddress,tokenId,{value:tokenPrice})).wait()
    return result;
}

export const resellNFT=async(marketContract,artistAddress,tokenId,newTokenPrice,artistFee)=>{
    const price = ethers.utils.parseEther(newTokenPrice.toString())
    const result=await (await marketContract.resellToken(artistAddress,tokenId,price, { value:artistFee })).wait()
    return result;
}