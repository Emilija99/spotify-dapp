require('dotenv').config();
const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3=require("web3")
const {abi,bytecode}=require("./build/contracts/MusicalNFTMarketplace.json");
const {INFURA_API_KEY, MNEMONIC } = process.env;
const path=require('path');
const fs=require('fs-extra');
const provider=new HDWalletProvider(MNEMONIC,INFURA_API_KEY);
const web3=new Web3(provider)

const getAccountsBalances=async(accounts)=>{
    const balances=await Promise.all(accounts.map(async(account)=>(await web3.eth.getBalance(account))))
    const readableBalances=balances.map(balance=>(web3.utils.fromWei(balance,'ether')))
    return readableBalances;
}
const deploy=async()=>{
    console.log('Starting deployment')
    const accounts=await web3.eth.getAccounts()
    
    console.log(accounts)
    let result;
    try{
        console.log(abi)
        const contract=new web3.eth.Contract(abi)
        contract.options.data=bytecode
        const deployTx=contract.deploy()
        const deployedContract=await deployTx.send({from:accounts[0],gas:await deployTx.estimateGas()}).once('transactionHash',(txhash)=>{

        })
        console.log(deployedContract.options.address);
        fs.outputFileSync(path.resolve(__dirname,'marketContractAddress.js'),`const address='${deployedContract.options.address}';\nmodule.exports={address};\n`);
    }catch(err){
        console.log('Error ',err)
    }
   
}
deploy();