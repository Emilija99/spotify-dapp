//import { ethers,providers } from "ethers"

const getEventValue=async (event)=>{
    return (await event.getTransaction()).value;
}
const getBlockTimestamp=async (event)=>{
    console.log(await event.getBlock())
    return (await event.getBlock()).timestamp
}

const getMarketItemRelistedEvents=async(marketContract,account,signer)=>{
    const filter = marketContract.filters.MarketItemBought(null, null, null,account)
    const resaleEvents= await marketContract.queryFilter(filter)
    return await Promise.all(resaleEvents.map(async resaleEvent=>({
    transactionHash:resaleEvent.transactionHash,
    artist:resaleEvent.args.artist,
    tokenId:resaleEvent.args.tokenId,
    type:'resale',
    value:await getEventValue(resaleEvent),
    timestamp:await getBlockTimestamp(resaleEvent)})));
}
const getMarketItemBoughtEvents=async(marketContract,account,signer)=>{
    const filter = marketContract.filters.MarketItemBought(null, account, null,null)
    const purchaseEvents= await marketContract.queryFilter(filter)
    console.log(purchaseEvents);
    console.log('cao')
    return await Promise.all(purchaseEvents.map(async purchaseEvent=>({
        transactionHash:purchaseEvent.transactionHash,
        artist:purchaseEvent.args.artist,
        tokenId:purchaseEvent.args.tokenId,
        type:'purchase',
        value:await getEventValue(purchaseEvent),
        timestamp:await getBlockTimestamp(purchaseEvent)})))
}

export const getIncomeEvents=async (marketContract,account,signer)=>{
    const resaleEvents=await getMarketItemRelistedEvents(marketContract,account,signer);
    const purchaseEvents=await getMarketItemBoughtEvents(marketContract,account,signer);
    const allEvents=resaleEvents.concat(purchaseEvents);
    return allEvents.sort((ev1,ev2)=>ev2.timestamp-ev1.timestamp);
}

