// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.4;
import "./MusicNFTArtist.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MusicNFTUser is Ownable{
     struct TokenInfo{
        address artistContract;
        uint256 tokenId;
     }
     mapping(address=>TokenInfo[]) public myItems;

     function addItem(address user,address _artist,uint256 _tokenId) external onlyOwner{
        myItems[user].push(TokenInfo(_artist,_tokenId));
     }
    function removeItem(address user,address _artist, uint256 _tokenId) external onlyOwner{
        uint8 index;
        bool found=false;
        for(uint8 i=0;i<myItems[user].length;i++){
            if(myItems[user][i].tokenId==_tokenId && myItems[user][i].artistContract==_artist)
            {
                index=i;
                found=true;
            }
        }
        require(found==true,"Item you wish to remove must exist");
        for(uint8 j=index;j<myItems[user].length-1;j++){
            myItems[user][j]= myItems[user][j+1];
        }
        myItems[user].pop();
    }
    function getMyItems() external view returns (MusicNFTArtist.MarketItem[] memory){
        MusicNFTArtist.MarketItem[] memory items=new MusicNFTArtist.MarketItem[](myItems[msg.sender].length);
        for(uint i=0;i<myItems[msg.sender].length;i++){
            items[i]= MusicNFTArtist(myItems[msg.sender][i].artistContract).getToken(myItems[msg.sender][i].tokenId);
        }
        return items;

    }

    

}