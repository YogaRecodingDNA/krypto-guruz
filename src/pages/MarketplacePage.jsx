import { useState } from "react";
import Navbar from "../components/Navbar";
import TileNFT from "../components/TileNFT";
import MarketplaceJSON from "../Marketplace.json";
import axios from "axios";
import guru5 from "../assets/guru5.jpeg"
import guru9 from "../assets/guru9.avif"
import guru10 from "../assets/guru10.jpeg"

const MarketplacePage = () => {
    const sampleData = [
        {
            "name": "#1",
            "description": "Be The Change",
            "image":`${guru5}`,
            "price":"0.03ETH",
            "currentlySelling":"True",
            "address":"0xe81Bf5A757CB4f7F82a2F23b1e59bE45c33c5b13",
        },
        {
            "name": "#2",
            "description": "Namaste Alive",
            "image":`${guru9}`,
            "price":"0.03ETH",
            "currentlySelling":"True",
            "address":"0xe81Bf5A757C4f7F82a2F23b1e59bE45c33c5b13",
        },
        {
            "name": "#3",
            "description": "Break Mental Barriers",
            "website":"http://axieinfinity.io",
            "image":`${guru10}`,
            "price":"0.03ETH",
            "currentlySelling":"True",
            "address":"0xe81Bf5A757C4f7F82a2F23b1e59bE45c33c5b13",
        },
    ];
    const [ data, setData ] = useState(sampleData);
    const [ isDataFetched, setIsDataFetched ] = useState(false);

    // Retrieve all NFTs to display
    const getAllNFTs = async () => {
        const ethers = require("ethers");

        // Get providers and signers after adding Hardhat network to metamask
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        // Pull the deployed contract instance
        let contract = new ethers.Contract(MarketplaceJSON.address, MarketplaceJSON.abi, signer);

        // Get All NFTs
        let allNFTs = await contract.getAllNFTs();

        // Fetch all the details of every NFT from the contract and display
        const listOfNFTs = await Promise.all(allNFTs.map(async nft => {
            const tokenURI = await contract.tokenURI(nft.tokenId);
            let metadata = await axios.get(tokenURI);
            metadata = metadata.data;

            let price = ethers.utils.formatUnits(nft.price.toString(), "ether");

            let currentNFT = {
                price,
                tokenId: nft.tokenId.toNumber(),
                seller: nft.seller,
                owner: nft.owner,
                image: metadata.image,
                name: metadata.name,
                description: metadata.description,
            }

            return currentNFT;
        }));

        setIsDataFetched(true);
        setData(listOfNFTs);
    }

    if (!isDataFetched) {
        getAllNFTs();
    }

    return (
        <div>
            <Navbar></Navbar>
            <div className="flex flex-col place-items-center mt-20">
                <div className="md:text-xl font-bold text-white">
                    Top NFTs
                </div>
                <div className="flex mt-5 justify-between flex-wrap max-w-screen-xl text-center">
                    {data.map((value, index) => {
                    console.log(`Value ${index}: `, value);
                        return <TileNFT data={value} key={index}></TileNFT>;
                    })}
                </div>
            </div>            
        </div>
    );
}

export default MarketplacePage;