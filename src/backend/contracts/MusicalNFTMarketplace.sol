// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.4;
import "./MusicNFTArtist.sol";
import "./MusicNFTUser.sol";
contract MusicalNFTMarketplace{
     event MarketItemBought(
        uint256 indexed tokenId,
        address indexed seller,
        address buyer,
        address artist
        

    );
    event MarketItemRelisted(
        uint256 indexed tokenId,
        address indexed seller,
        uint256 price,
        address artist
    );
    address[] artistAddresses;
    mapping(address => MusicNFTArtist) public artists;
    address public userContract;

    constructor(){
        userContract=address(new MusicNFTUser());
    }

    function createArtist(uint256 artistRoyaltyFee,string memory artistURI) external{
       artists[msg.sender]=new MusicNFTArtist(artistRoyaltyFee,msg.sender,artistURI);
       artistAddresses.push(msg.sender);
    }
    function mintToken(uint256 price,string memory tokenURI) external payable{
        artists[msg.sender].mintToken{value:msg.value}(price,tokenURI);
    }
    function buyToken(address artist, uint256 tokenId) external payable{
        artists[artist].buyToken{value:msg.value}(tokenId,msg.sender);
        MusicNFTUser(userContract).addItem(msg.sender,address(artists[artist]),tokenId);
        emit MarketItemBought(tokenId, MusicNFTArtist(artists[artist]).getSeller(tokenId), msg.sender,artist);
    }
    function resellToken(address artist,uint256 tokenId,uint256 price) external payable{
        artists[artist].resellToken{value:msg.value}(tokenId,price,msg.sender);
        MusicNFTUser(userContract).removeItem(msg.sender,address(artists[artist]),tokenId);
        emit MarketItemRelisted(tokenId, msg.sender, price,artist);
    }
   
    

     //fetching all tokens currently listed for sale
    /*function getAllUnsoldTokens(address artist) external view returns (MusicNFTArtist.MarketItem[] memory){
        return MusicNFTArtist(artists[artist]).getAllUnsoldTokens();

    }*/
   
   function getAllArtists() external view returns (address[] memory){
        return artistAddresses;

    }
   
}