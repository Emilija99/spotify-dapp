const { expect } = require("chai");

const toWei = (num) => ethers.utils.parseEther(num.toString())
const fromWei = (num) => ethers.utils.formatEther(num)

describe("MusicNFTArtist", function () {

  let nftArtist
  let deployer, artist, user1, user2, users;
  let royaltyFee = toWei(0.01); // 1 ether = 10^18 wei
  let URI = "https://bafybeidhjjbjonyqcahuzlpt7sznmh4xrlbspa3gstop5o47l6gsiaffee.ipfs.nftstorage.link/"
  let prices = [toWei(1), toWei(2), toWei(3), toWei(4), toWei(5), toWei(6), toWei(7), toWei(8)]
  let deploymentFees = toWei(prices.length * 0.01)
  beforeEach(async function () {
    // Get the ContractFactory and Signers here.
    const NFTMarketplaceFactory = await ethers.getContractFactory("MusicNFTArtist");
    [deployer, artist, user1, user2, ...users] = await ethers.getSigners();

    // Deploy music nft marketplace contract 
    nftArtist = await NFTMarketplaceFactory.deploy(
      toWei(0.01),
      artist.address,
      URI
    );

  });

  describe("Deployment", function () {

    it("Should track name, symbol, URI, royalty fee and artist", async function () {
      const nftName = "DAppFi"
      const nftSymbol = "DAPP"
      const fee=toWei(0.01)
      expect(await nftArtist.name()).to.equal(nftName);
      expect(await nftArtist.symbol()).to.equal(nftSymbol);
      expect(await nftArtist.artistURI()).to.equal(URI);
      expect(await nftArtist.royaltyFee()).to.equal(fee);
      expect(await nftArtist.artist()).to.equal(artist.address);
    });
  

  });

  describe("Mint token function", function(){
    beforeEach(async function () {
        const price=toWei(1);
        const URI='uri'
        await nftArtist.mintToken(price,URI,{value:royaltyFee});
    })
    it("Contract NFT token balance should be 1",async function(){
        
      expect(await nftArtist.balanceOf(nftArtist.address)).to.equal(1);
    });
    it("Ether balance should equal deployment fee", async function () {
      expect(await ethers.provider.getBalance(nftArtist.address)).to.equal(toWei(0.01))
    });
    it("Token properties should be valid", async function () {
      const token=await nftArtist.getToken(0)
      expect(token.tokenId).to.equal(0);
      expect(token.seller).to.equal(artist.address);
      expect(token.price).to.equal(toWei(1));
      expect(token.artist).to.equal(artist.address);
      expect(token.tokenURI).to.equal('uri');
      expect(token.owner).to.equal(ethers.constants.AddressZero);


    });
  });
  describe("Buying tokens", function () {
    beforeEach(async function () {
      const price=toWei(1);
      const URI='uri'
      await nftArtist.mintToken(price,URI,{value:royaltyFee});
  })
    it("Should update seller to zero address, transfer NFT, pay seller, pay royalty to artist and emit a MarketItemBought event", async function () {
      //const deployerInitalEthBal = await deployer.getBalance()
     
      const artistInitialEthBal = await artist.getBalance()
      await nftArtist.buyToken(0,user1.address, { value: toWei(1) });
      //const deployerFinalEthBal = await deployer.getBalance()
      const artistFinalEthBal = await artist.getBalance()
      
      // Item seller should be zero addr
      expect((await nftArtist.getToken(0)).seller).to.equal("0x0000000000000000000000000000000000000000")
      // Seller should receive payment for the price of the NFT sold.
      //expect(+fromWei(deployerFinalEthBal)).to.equal(+fromWei(prices[0]) + +fromWei(deployerInitalEthBal))
      // Artist should receive royalty
      const price=toWei(1)
    
      expect(+fromWei(artistFinalEthBal)).to.equal(+fromWei(price)+ +fromWei(royaltyFee)+ +fromWei(artistInitialEthBal))
      // The buyer should now own the nft
      expect(await nftArtist.ownerOf(0)).to.equal(user1.address);
    })
    it("Should fail when ether amount sent with transaction does not equal asking price", async function () {
      // Fails when ether sent does not equal asking price
      await expect(
        nftArtist.buyToken(0,user1.address, { value:toWei(0.2) })
      ).to.be.revertedWith("Please send the asking price");
    });
  })
  describe("Reselling tokens", function () {
    beforeEach(async function () {
      const price=toWei(1);
      const URI='uri'
      await nftArtist.mintToken(price,URI,{value:royaltyFee});
      // user1 purchases an item.
      await nftArtist.buyToken(0,user1.address, { value: toWei(1) })
    })

    it("Should track resale item, incr. ether bal by royalty fee, transfer NFT to marketplace and emit MarketItemRelisted event", async function () {
      const resaleprice = toWei(2)
      const initMarketBal = await ethers.provider.getBalance(nftArtist.address)
      // user1 lists the nft for a price of 2 hoping to flip it and double their money
      await nftArtist.resellToken(0,resaleprice,user1.address, { value: toWei(0.01) });
      const finalMarketBal = await ethers.provider.getBalance(nftArtist.address)
      // Expect final market bal to equal inital + royalty fee
      expect(+fromWei(finalMarketBal)).to.equal(+fromWei(royaltyFee) + +fromWei(initMarketBal))
      // Owner of NFT should now be the marketplace
      expect(await nftArtist.ownerOf(0)).to.equal(nftArtist.address);
      // Get item from items mapping then check fields to ensure they are correct
      const item = await nftArtist.getToken(0)
      expect(item.tokenId).to.equal(0)
      expect(item.seller).to.equal(user1.address)
      expect(item.price).to.equal(resaleprice)
    });

    it("Should fail if price is set to zero and royalty fee is not paid", async function () {
      await expect(
        nftArtist.resellToken(0, 0,user1.address, { value: royaltyFee })
      ).to.be.revertedWith("Price must be greater than zero");
      await expect(
        nftArtist.resellToken(0, toWei(1),user1.address, { value: 0 })
      ).to.be.revertedWith("Must pay royalty");
    });
  });
  describe("Getter functions", function () {
    let soldItems = [0, 1, 3]
    let ownedByUser1 = [0, 1]
    let ownedByUser2 = [3]
    const prices=[toWei(1),toWei(1.5),toWei(0.5),toWei(2)];
    const uris=['uri1','uri2','uri3','uri4']
   
    beforeEach(async function () {
      await nftArtist.mintToken(prices[0],uris[0],{value:royaltyFee});
      await nftArtist.mintToken(prices[1],uris[1],{value:royaltyFee});
      await nftArtist.mintToken(prices[2],uris[2],{value:royaltyFee});
      await nftArtist.mintToken(prices[3],uris[3],{value:royaltyFee});
      // user1 purchases item 0.
      await (await nftArtist.buyToken(0, user1.address,{ value: prices[0] })).wait();
      // user1 purchases item 1.
      await (await nftArtist.buyToken(1,user1.address, { value: prices[1] })).wait();
      // user2 purchases item 3.
      await (await nftArtist.buyToken(3,user2.address, { value: prices[3] })).wait();
    })

    it("getAllUnsoldTokens should fetch all the marketplace items up for sale", async function () {
      const unsoldItems = await nftArtist.getAllUnsoldTokens()
      // Check to make sure that all the returned unsoldItems have filtered out the sold items.
      expect(unsoldItems.every(i => !soldItems.some(j => j === i.tokenId.toNumber()))).to.equal(true)
      // Check that the length is correct
      expect(unsoldItems.length === prices.length - soldItems.length).to.equal(true)
    });
   
  });
})