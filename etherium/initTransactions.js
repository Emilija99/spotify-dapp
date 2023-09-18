require('dotenv').config();
const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3=require("web3")
const {abi,bytecode}=require("./build/contracts/MusicalNFTMarketplace.json");
const {INFURA_API_KEY, MNEMONIC } = process.env;
const provider=new HDWalletProvider(MNEMONIC,INFURA_API_KEY);
const web3=new Web3(provider)
const {address}=require('./marketContractAddress')
const initTransactions=async()=>{
    const accounts=await web3.eth.getAccounts()
    console.log(address)
    const marketContract=new web3.eth.Contract(abi,address);
    //await marketContract.methods.createArtist(web3.utils.toWei('0.01','ether'),'ipfs://bafyreic2vgvqqpegpxdnvv4vea5d26baimt64qi2ei2wurtuedgogmkybm/metadata.json').send({from:accounts[0]});
    //await marketContract.methods.mintToken(web3.utils.toWei('0.02','ether'),'ipfs://bafyreihogbbxp3izwx7sxuogr6ukmqhip4ino2k3pu7rhq3neqnk2lz4gi/metadata.json').send({from:accounts[0],value:web3.utils.toWei('0.01','ether')})
    console.log('1')
    try{
        //await marketContract.methods.createArtist(web3.utils.toWei('0.011','ether'),'ipfs://bafyreiedf55rjupfjvjrgtciqsptjgulitnb37cf7rmvvdiubasua7l4lm/metadata.json').send({from:accounts[1]});
        console.log('11')
    //const transaction= marketContract.methods.mintToken(web3.utils.toWei('0.021','ether'),'ipfs://bafyreiglbmhrctscmclamjjsv64xpkwb2a7kfnood2ojbd6tuvjeyw4ehi/metadata.json').send({from:accounts[0],value:web3.utils.toWei('0.01','ether')});
    console.log('2');
    //console.log(transaction);
    //await transaction;
    //await marketContract.methods.mintToken(web3.utils.toWei('0.022','ether'),'ipfs://bafyreicyu2557dt6phbc54psywnqtjo4reudsaawblzl3k3sp36wyvo3ya/metadata.json').send({from:accounts[0],value:web3.utils.toWei('0.01','ether')});
    console.log('3');
    //await marketContract.methods.mintToken(web3.utils.toWei('0.023','ether'),'ipfs://bafyreiamttwoicucnjrnlff3m5lijtejfqamh63ctahgcrk4d4brblxtna/metadata.json').send({from:accounts[0],value:web3.utils.toWei('0.01','ether')});
    console.log('4');
   // await marketContract.methods.mintToken(web3.utils.toWei('0.024','ether'),'ipfs://bafyreibf4co7ebnyotoovx5nxpd5psxrenn3vyb5y62ylo7xuhcnqa5ium/metadata.json').send({from:accounts[0],value:web3.utils.toWei('0.01','ether')});
    console.log('5')
    const artists=await marketContract.methods.getAllArtists().call({from:accounts[0]});
    const contractAdd1=await marketContract.methods.artists(artists[1]).call({from:accounts[0]});
    console.log(artists)
console.log(contractAdd1)}catch(err){
        console.log(err)
    }
}
initTransactions()