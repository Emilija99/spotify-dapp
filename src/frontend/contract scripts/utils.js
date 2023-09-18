import {ipfsGateway} from './config.js';


export const contentFromURI=async(uri)=>{
    const response=await fetch(ipfsGateway+uri.substring(7));
    const blob=await response.blob();
    const contentUrl=URL.createObjectURL(blob);
    return contentUrl;

}