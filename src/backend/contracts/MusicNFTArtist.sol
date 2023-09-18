// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.4;
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract MusicNFTArtist is ERC721("DAppFi","DAPP"),Ownable{
   
   
    address public artist;
    uint256 public royaltyFee;
    string public artistURI;

    struct MarketItem{
        uint256 tokenId;
        address payable seller; //in order for seller address to receive ether payment we need to mark it as payable
        uint256 price;
        address artist;
        string tokenURI;
        address owner;
    }

    //an array of market items
    MarketItem[] marketItems;

   
    constructor(uint256 _royaltyFee,address _artist,string memory _artistURI){
        
        royaltyFee=_royaltyFee;
        artist=_artist;
        artistURI=_artistURI;
       

    }
    function mintToken(uint256 price, string memory _tokenURI) external payable onlyOwner(){
        require(msg.value>=royaltyFee,"Royalty fee must be paid");
        uint256 tokenId=marketItems.length;
        _mint(address(this),tokenId);
         marketItems.push(MarketItem(tokenId,payable(artist),price,artist,_tokenURI,address(0)));

    }

    //function that lets fans purchase music NFTs
    function buyToken(uint256 _tokenId,address buyer) external payable onlyOwner{
        uint256 price=marketItems[_tokenId].price;
        address seller=marketItems[_tokenId].seller;
        require(msg.value==price,"Please send the asking price");
        require(marketItems[_tokenId].owner==address(0),"Item is not for sale");
        marketItems[_tokenId].owner=buyer;
        marketItems[_tokenId].seller=payable(address(0));//no one is selling item anymore
        _transfer(address(this), buyer, _tokenId);
        payable(artist).transfer(royaltyFee);
        payable(seller).transfer(msg.value);
        //emit MarketItemBought(_tokenId, seller, msg.sender, price);
    }
    //reselling token function
    function resellToken(uint256 _tokenId,uint256 _price,address seller) external payable onlyOwner{
        require(msg.value==royaltyFee,"Must pay royalty");
        require(_price>0,"Price must be greater than zero");
        require(marketItems[_tokenId].owner==seller,"Only owner can resell an item");
        marketItems[_tokenId].owner=address(0);
        marketItems[_tokenId].price=_price;
        marketItems[_tokenId].seller=payable(seller);
        _transfer(seller, address(this), _tokenId);
        //emit MarketItemRelisted(_tokenId, msg.sender, _price);
    }
    //fetching all tokens currently listed for sale
    function getAllUnsoldTokens() external view returns (MarketItem[] memory){
        uint256 unsoldCount=balanceOf(address(this));
        MarketItem[] memory tokens=new MarketItem[](unsoldCount);
        uint256 currentIndex;
        for(uint256 i=0;i<marketItems.length;i++){
            if(marketItems[i].seller!=address(0)){
                tokens[currentIndex]=marketItems[i];
                currentIndex++;
            }
        }
        return (tokens);
    }
    //fetching all tokens owned by the artist
     function getMyTokens() external view returns (MarketItem[] memory){
       
        return marketItems;
    }
    function getToken(uint256 tokenId) external view returns (MarketItem memory){
        return marketItems[tokenId];
    }

    function getSeller(uint256 _tokenId) external view returns (address){
       return marketItems[_tokenId].seller;
    }
   
    
}
