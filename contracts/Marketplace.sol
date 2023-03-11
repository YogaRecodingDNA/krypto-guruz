// SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.0;

import "hardhat/console.sol"; // solidity console logging
import "@openzeppelin/contracts/utils/Counters.sol"; // Secure incrementor (counter)
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol"; // Store token URI
import "@openzeppelin/contracts/token/ERC721/ERC721.sol"; // ERC721 Standard (quick and secure)

contract Marketplace is ERC721URIStorage {

  address payable owner;

  uint256 listPrice = 0.001 ether;

  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;
  Counters.Counter private _itemsSold;

  constructor() ERC721("Marketplace", "MKT") {
    owner = payable (msg.sender);
  }

  // Listed NFT Data
  struct ListedToken {
    uint256 tokenId;
    address payable owner;
    address payable seller;
    uint256 price;
    bool currentlyListed;
  }
  mapping(uint256 => ListedToken) private tokenIdOfListedNFT;

  // Get current NFT token's ID
  function getCurrentToken() public view returns (uint256) {
    return _tokenIds.current(); // OPEN ZEPPELIN
  }

  // Get ID for latest created NFT Token
  function getIdForLatestToken() public view returns (ListedToken memory) {
    uint256 currentTokenId = _tokenIds.current(); // OPEN ZEPPELIN
    return tokenIdOfListedNFT[currentTokenId];
  }

  // Get listed NFT token by ID
  function  getNFTById(uint256 _tokenId) public view returns (ListedToken memory) {
    return tokenIdOfListedNFT[_tokenId];
  }

  // Get list price
  function getListPrice() public view returns (uint256) {
    return listPrice;
  }

  // Update list price
  function updateListPrice(uint256 _listPrice) public payable {
    require(owner == msg.sender, "Only owner may update teh listing price"); // Check for ownership
    listPrice = _listPrice;
  }


  // ==================================== MINTING =============================================
  // ==========================================================================================
  // =============================== CREATE NFT TOKEN ==========================================
  function createNFTToken(string memory tokenURI, uint256 price) public payable returns(uint) {
    // Creator pays listing fee for minting on marketplace | Check for sufficient value
    require(msg.value == listPrice, "Provide enough ether to mint your NFT");
    require(price > 0, "Make sure the price is not negative");

    _tokenIds.increment(); // OPEN ZEPPELIN
    uint256 currentTokenId = _tokenIds.current();
    // Ensures validity of recipient location so no lost NFTs
    _safeMint(msg.sender, currentTokenId); // OPEN ZEPPELIN

    _setTokenURI(currentTokenId, tokenURI); // OPEN ZEPPELIN

    createListedNFTToken(currentTokenId, price);

    return currentTokenId;
  }


  // SET DATA TO "ListedToken" STRUCT FOR NEWLY MINTED NFTs AND ADD TO "tokenIdOfListedNFT" MAPPING
  function createListedNFTToken(uint256 _tokenId, uint256 _price) private {
    tokenIdOfListedNFT[_tokenId] = ListedToken(
      _tokenId,
      payable(address(this)), // Function caller / Smart Contract 
      payable(msg.sender),
      _price,
      true
    );

    // Transfer Minted NFT to the contract
    _transfer(msg.sender, address(this), _tokenId); // Contract now the owner, has right to transfer
  }

  // GET ALL NFTs LISTED FOR SALE IN MARKETPLACE
  function getAllNFTs() public view returns(ListedToken[] memory) {
    // Tokem IDs are the number of NFTs listed "prior-to and including" this one
    uint256 nftCount = _tokenIds.current(); // Get NFT Count
    // Create array called "tokens" of ListedTokens - will hold all the NFTs
    ListedToken[] memory tokens = new ListedToken[](nftCount);

    for(uint256 i = 0; i < nftCount; i++) { // Itereate over each NFT
      uint256 currentIndex = i;
      // For Each ID ..
      uint256 currentId = i + 1;
      // ..create object/struct by fetching NFTs data from the mapping
      ListedToken storage currentItem = tokenIdOfListedNFT[currentId];
      // ..store that NFT object into the array
      tokens[currentIndex] = currentItem;
      currentIndex++;
    }

    return tokens; // return array of all NFTs
  }

  // GET ALL NFTs OF CURRENT CALLER IN MARKETPLACE =======================
  function getMyNFTs() public view returns(ListedToken[] memory){
    uint256 totalNFTCount = _tokenIds.current(); // Get NFT Count
    uint256 ownedNFTCount = 0; // Get count of NFTs owned by user

    // Must retrieve number of owned NFTs to set future array length
    for (uint256 i = 0; i < totalNFTCount; i++) {
      // For the token @ ID [i + 1], If the function caller (msg.sender) is the owner or the seller
      if (tokenIdOfListedNFT[i + 1].owner == msg.sender || tokenIdOfListedNFT[i + 1].seller == msg.sender) {
        ownedNFTCount ++;
      }
    }

    // Create array called "myNFTs" of ListedToken ... will hold all user's NFTs
    ListedToken[] memory myNFTs = new ListedToken[](ownedNFTCount);
    for(uint256 i = 0; i < totalNFTCount; i++) { // Itereate over each NFT
      if (tokenIdOfListedNFT[i + 1].owner == msg.sender || tokenIdOfListedNFT[i + 1].seller == msg.sender) {
        uint256 currentIndex = i;
        uint256 currentId = i + 1;
        // ..create object/struct by fetching NFTs data from the mapping
        ListedToken storage currentItem = tokenIdOfListedNFT[currentId];
        // ..store that NFT object/struct into the array
        myNFTs[currentIndex] = currentItem;
        currentIndex++;
      }
    }

    return myNFTs; // return array of all NFTs
  }

  // Executes the sale transaction on the marketplace / Transfers ownership of th NFT
  function executeSale(uint tokenId) public payable {
    uint price = tokenIdOfListedNFT[tokenId].price;
    address seller = tokenIdOfListedNFT[tokenId].seller;
    require(msg.value == price, "Please submit the asking price for the NFT in order to purchase");

    // Update the details of the token
    tokenIdOfListedNFT[tokenId].currentlyListed = true;
    tokenIdOfListedNFT[tokenId].seller = payable(msg.sender);
    _itemsSold.increment();

    // Transfer ownership from contract address to the new owner / sale executor
    _transfer(address(this), msg.sender, tokenId); // msg.sender new owner
    // Contract now cannot sell this NFT on behalf of the owner so...
    // The Owner must approve the marketplace contract to be able to resell the NFT on their behalf
    approve(address(this), tokenId); // OPEN ZEPPELIN FUNCTION

    // Transfer listing fee to marketplace creator
    payable(owner).transfer(listPrice);
    // Transfer the proceeds from the sale to the seller of the NFT
    payable(seller).transfer(msg.value);

  }

  // Later.. will extend the contract's functionality to host minted NFTs without immediately listing them to the marketplace.. Allowing for resale, as well as requesting to be listed.
  //  Until then, the "currentlyListed" variable will always default to true, and list the NFTs immediately upon creation.
}