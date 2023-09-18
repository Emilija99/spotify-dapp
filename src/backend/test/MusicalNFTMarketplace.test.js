const { expect } = require("chai");
const toWei = (num) => ethers.utils.parseEther(num.toString())
const fromWei = (num) => ethers.utils.formatEther(num)

describe("MusicalNFTMarketplace", function () {
    let marketplaceContract;
    let deployer, artist, user1, user2, users;
    beforeEach(async function (){
        // Get the ContractFactory and Signers here.
        const NFTMarketplaceFactory = await ethers.getContractFactory("MusicalNFTMarketplace");
        [deployer, artist, user1, user2, ...users] = await ethers.getSigners();
        // Deploy music nft marketplace contract 
        marketplaceContract = await NFTMarketplaceFactory.deploy();
    });

    describe("Deployment",function(){
        it("Should deploy users contract",async function(){
            const usersContractAddress=await marketplaceContract.userContract();
            expect(usersContractAddress).to.not.equal(ethers.constants.AddressZero);
        })
    }); 
    describe("Create artist",function(){
        it("Should create new artist and push it into artists' array",async function(){
            await marketplaceContract.createArtist(toWei(0.001),"artistUri");
            const artistContractAddress=await marketplaceContract.getAllArtists();
            expect(artistContractAddress.length).to.equal(1);
        })
    });

    describe("Buy token",function(){
        beforeEach(async function(){
            await marketplaceContract.createArtist(toWei(0.001),"artistUri");
            await marketplaceContract.mintToken(toWei(2),"tokenUri",{value:toWei(0.001)})
        })
        it("Should emit MarketItemBought event",async function(){
            await expect(marketplaceContract.buyToken(deployer.address,0,{value:toWei(2)})).to.emit(marketplaceContract,"MarketItemBought")
        })
    });

    describe("Resell token",function(){
        beforeEach(async function(){
            await marketplaceContract.createArtist(toWei(0.001),"artistUri");
            await marketplaceContract.mintToken(toWei(2),"tokenUri",{value:toWei(0.001)})
            await marketplaceContract.buyToken(deployer.address,0,{value:toWei(2)})
        })
        it("Should emit MarketItemRelisted event",async function(){
            await expect(marketplaceContract.resellToken(deployer.address,0,toWei(3),{value:toWei(0.001)})).to.emit(marketplaceContract,"MarketItemRelisted")
        })
    });


});