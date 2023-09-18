import React, { createContext, useState, useContext } from "react";
import { connectWallet, getMarketContract } from "../contract scripts/connectWallet";
import { IsArtist, getArtist, getArtistContract } from "../contract scripts/artist";
const StoreContext=createContext();

export default function StoreProvider({children}){
    const [marketContract,setMarketContract]=useState(null)
    const [account,setAccount]=useState(null)
    const [signer,setSigner]=useState(null)
    const [isArtist,setIsArtist]=useState(false)
    const [artist,setArtist]=useState(null)

    const loadStore=async()=>{
        const response=await connectWallet()
        setAccount(response.account)
        setSigner(response.signer)
        console.log(response)
        const contract=await getMarketContract(response.signer)
        console.log(contract)
        setMarketContract(contract)
        const isartist=await IsArtist(contract,response.account)
        console.log(isartist)
        if(isartist)
        {
            const artistContract=await getArtistContract(contract,response.account,response.signer)
            const artist1=await getArtist(artistContract)
            setArtist(artist1)
           
        }
        setIsArtist(isartist)
    }
    const clearStore=()=>{
        setMarketContract(null)
        setAccount(null)
        setSigner(null)
        setIsArtist(false)
        setArtist(null)
    }
    return(
        <StoreContext.Provider value={{
            marketContract,account,signer,isArtist,artist,loadStore,clearStore
        }}>{children}</StoreContext.Provider>
    )
}

export function useStore() {
    const context = useContext(StoreContext);
    return { ...context };
  }