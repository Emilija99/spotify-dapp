const path=require('path')
const fs=require('fs-extra')
const solc=require('solc')

const musicalNFTMarketplacePath=path.resolve(__dirname,'contracts','MusicalNFTMarketplace.sol');
const musicNFTArtistPath=path.resolve(__dirname,'contracts','MusicNFTArtist.sol');
const musicNFTUserPath=path.resolve(__dirname,'contracts','MusicNFTUser.sol');

const sources={
    'MusicalNFTMarketplace.sol':{content:fs.readFileSync(musicalNFTMarketplacePath,'utf8')},
    'MusicNFTArtist.sol':{content:fs.readFileSync(musicNFTArtistPath,'utf8')},
    'MusicNFTUser.sol':{content:fs.readFileSync(musicNFTUserPath,'utf8')}
}
const input={
    language:'Solidity',
    sources:sources,
    settings:{outputSelection:{'*':{'*':['abi','evm.bytecode']}}}
}

const output=solc.compile(JSON.stringify(input),{import:findImports});
const contracts=JSON.parse(output).contracts
console.log(contracts);
const buildPath=path.resolve(__dirname,'build1');
fs.removeSync(buildPath);
fs.ensureDir(buildPath);

const MusicalNFTMarketplace=contracts['MusicalNFTMarketplace.sol'].MusicalNFTMarketplace
const MusicNFTArtist=contracts['MusicNFTArtist.sol'].MusicNFTArtist
const MusicNFTUser=contracts['MusicNFTUser.sol'].MusicNFTUser

const artifact1={abi:MusicalNFTMarketplace.abi,bytecode:MusicalNFTMarketplace.evm.bytecode.object}
 fs.writeFileSync(path.resolve(buildPath,'MusicalNFTMarketplace.json'),JSON.stringify(artifact1,null,2))

 const artifact2={abi:MusicNFTArtist.abi,bytecode:MusicNFTArtist.evm.bytecode.object}
 fs.writeFileSync(path.resolve(buildPath,'MusicNFTArtist.json'),JSON.stringify(artifact2,null,2))

 const artifact3={abi:MusicNFTUser.abi,bytecode:MusicNFTUser.evm.bytecode.object}
 fs.writeFileSync(path.resolve(buildPath,'MusicNFTUser.json'),JSON.stringify(artifact3,null,2))
/*for(let contract in contracts){
    fs.outputJSONSync(path.resolve(buildPath,contract.substring(contract.indexOf(':')+1)+'json'),output[contract]);
}*/

function findImports(relativePath){
    const apsolutePath=path.resolve('C:\\Users\\user\\Desktop\\blockchain\\music-nft-dapp','node_modules',relativePath)
    const source=fs.readFileSync(apsolutePath,'utf8')
    return {contents:source}
}
