const toWei = (num) => ethers.utils.parseEther(num.toString())
async function main() {
  let royaltyFee = toWei(0.01);
  let prices = [toWei(1), toWei(2), toWei(3), toWei(4), toWei(5), toWei(6), toWei(7), toWei(8)]
  const [deployer,artist1,artist2] = await ethers.getSigners();
  let deploymentFees = toWei(prices.length * 0.01)
  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  // deploy contracts here:
  const NFTUsersFactory=await ethers.getContractFactory("MusicNFTUser");
  //const nftUsers = await NFTUsersFactory.deploy();
  //marketplace
  const NFTMarketplaceFactory=await ethers.getContractFactory("MusicalNFTMarketplace");
  const nftMarketplace = await NFTMarketplaceFactory.deploy();
  //await nftMarketplace.createArtist(0.2,'')
  //await nftMarketplace.mintToken(2,'')
  console.log("Smart contract address: ",nftMarketplace.address);
  // For each contract, pass the deployed contract and name to this function to save a copy of the contract ABI and address to the front end.
  saveFrontendFiles(nftMarketplace,"MusicalNFTMarketplace");
  //saveFrontendFiles(nftUsers,"MusicNFTUser");
  const name='MusicNFTArtist';
  const nameUser='MusicNFTUser'
  const contractArtifact = artifacts.readArtifactSync(name);
  const contractArtifactUser=artifacts.readArtifactSync(nameUser)
  const fs = require("fs");
  const contractsDir = __dirname + "/../../frontend/contractsData";

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }
  fs.writeFileSync(
    contractsDir + `/${name}.json`,
    JSON.stringify(contractArtifact, null, 2)
  );
  fs.writeFileSync(
    contractsDir + `/${nameUser}.json`,
    JSON.stringify(contractArtifactUser, null, 2)
  );
 
  const maketContract1=nftMarketplace.connect(artist1)
  await maketContract1.createArtist(toWei(0.2),'ipfs://bafyreiedf55rjupfjvjrgtciqsptjgulitnb37cf7rmvvdiubasua7l4lm/metadata.json');
  await maketContract1.mintToken(toWei(1),'ipfs://bafyreiambz3rzwcpdvshheik75zei6x77bf7joc3u2qzqmu6g7a4ujxgmi/metadata.json',{value:toWei(0.2)});
  await maketContract1.mintToken(toWei(1.5),'ipfs://bafyreialytzka45eb7mf4w54c7v4oxjygbygmoaryumkdvpdobacmk5pfe/metadata.json',{value:toWei(0.2)});
  await maketContract1.mintToken(toWei(2),'ipfs://bafyreieqr473wzp4nvn75dwjtxkcu5pav4xrsyizaorsaxeh5fdwostfla/metadata.json',{value:toWei(0.2)});
  await maketContract1.mintToken(toWei(2.5),'ipfs://bafyreidk7s64muupw7ztggy6bgqfxqblmxwh2ybmeyh2fc5oatvzz6eejq/metadata.json',{value:toWei(0.2)});

  const maketContract2=nftMarketplace.connect(artist2)
  await maketContract2.createArtist(toWei(0.1),'ipfs://bafyreic2vgvqqpegpxdnvv4vea5d26baimt64qi2ei2wurtuedgogmkybm/metadata.json');
  await maketContract2.mintToken(toWei(3),'ipfs://bafyreihogbbxp3izwx7sxuogr6ukmqhip4ino2k3pu7rhq3neqnk2lz4gi/metadata.json',{value:toWei(0.1)});
  await maketContract2.mintToken(toWei(0.5),'ipfs://bafyreiglbmhrctscmclamjjsv64xpkwb2a7kfnood2ojbd6tuvjeyw4ehi/metadata.json',{value:toWei(0.1)});
  await maketContract2.mintToken(toWei(2.3),'ipfs://bafyreicyu2557dt6phbc54psywnqtjo4reudsaawblzl3k3sp36wyvo3ya/metadata.json',{value:toWei(0.1)});
  await maketContract2.mintToken(toWei(2),'ipfs://bafyreiamttwoicucnjrnlff3m5lijtejfqamh63ctahgcrk4d4brblxtna/metadata.json',{value:toWei(0.1)});
  await maketContract2.mintToken(toWei(2.5),'ipfs://bafyreibf4co7ebnyotoovx5nxpd5psxrenn3vyb5y62ylo7xuhcnqa5ium/metadata.json',{value:toWei(0.1)});
  console.log('done')
}

function saveFrontendFiles(contract, name) {
  const fs = require("fs");
  const contractsDir = __dirname + "/../../frontend/contractsData";

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  fs.writeFileSync(
    contractsDir + `/${name}-address.json`,
    JSON.stringify({ address: contract.address }, undefined, 2)
  );

  const contractArtifact = artifacts.readArtifactSync(name);

  fs.writeFileSync(
    contractsDir + `/${name}.json`,
    JSON.stringify(contractArtifact, null, 2)
  );
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
