const { expect } = require("chai");

const toWei = (num) => ethers.utils.parseEther(num.toString())
const fromWei = (num) => ethers.utils.formatEther(num)

describe("MusicNFTUser", function () {

    let nftUser;
    let deployer,artist, user1, user2, users;
    beforeEach(async function () {

        const NFTUserFactory = await ethers.getContractFactory("MusicNFTUser");
        [deployer,artist, user1, user2, ...users] = await ethers.getSigners();
        nftUser=await NFTUserFactory.deploy();
    });

    describe("Adding item",function(){
      beforeEach(async function(){
            await nftUser.addItem(user1.address,artist.address,33);
      });
      it('Should have user enrty in mapping and create token info with appropriate values',async function(){

         //expect(await nftUser.myItems(user1.address)).to.not.equal([]);
         const tokenInfo=await nftUser.myItems(user1.address,0);
         expect(tokenInfo.tokenId).to.equal(33);
         expect(tokenInfo.artistContract).to.equal(artist.address);
      })
    });

    describe("Removing item",function(){
        beforeEach(async function(){
            await nftUser.addItem(user1.address,artist.address,33);
            await nftUser.addItem(user1.address,artist.address,14);
           
      });
      it('Should remove token from users array',async function(){
         //removing item
         await nftUser.removeItem(user1.address,artist.address,33);
      
        const tokenInfo=await nftUser.myItems(user1.address,0);
         expect(tokenInfo.tokenId).to.equal(14);
         expect(tokenInfo.artistContract).to.equal(artist.address);

      })
      it('Should revert if user tries removing non existing item',async function(){
        await expect(nftUser.removeItem(user1.address,artist.address,77)).to.be.revertedWith('Item you wish to remove must exist');
      })
    })



})