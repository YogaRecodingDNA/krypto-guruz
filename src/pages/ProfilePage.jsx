import { useState } from "react";
import { useParams } from 'react-router-dom';
import MarketplaceJSON from "../Marketplace.json";
import Navbar from "../components/Navbar";
import TileNFT from "../components/TileNFT";
import axios from "axios";

export default function Profile () {
    const [ data, setData ] = useState([]);
    const [ address, setAddress ] = useState("0x");
    const [ totalPrice, setTotalPrice ] = useState("0");
    const [ isDataFetched, setIsDataFetched ] = useState(false);

    const getNFTData = async (tokenId) => {
        const ethers = require("ethers");
        let sumPrice = 0;

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const addr = await signer.getAddress();

        //Pull the deployed contract instance
        let contract = new ethers.Contract(MarketplaceJSON.address, MarketplaceJSON.abi, signer)

        // Get user NFTs
        let transaction = await contract.getMyNFTs();

        // Takes metadata from tokenURI and the data returned by getMyNFTs() contract function and creates an object of info to be displayed
        const myItems = await Promise.all(transaction.map(async nft => {
            const tokenURI = await contract.tokenURI(nft.tokenId);
            let metadata = await axios.get(tokenURI);
            metadata = metadata.data;

            let price = ethers.utils.formatUnits(nft.price.toString(), 'ether');
            let item = {
                price,
                tokenId: nft.tokenId.toNumber(),
                seller: nft.seller,
                owner: nft.owner,
                image: metadata.image,
                name: metadata.name,
                description: metadata.description,
            }
            sumPrice += Number(price);
            return item;
        }))

        setData(myItems);
        setIsDataFetched(true);
        setAddress(addr);
        setTotalPrice(sumPrice.toPrecision(3));
    }

    const params = useParams();
    const tokenId = params.tokenId;
    if(!isDataFetched) {
        getNFTData(tokenId);
    }
    
    return (
        <div className="profileClass" style={{"min-height":"100vh"}}>
            <Navbar></Navbar>
            <div className="profileClass">
            <div className="flex text-center flex-col mt-11 md:text-2xl text-white">
                <div className="mb-5">
                    <h2 className="font-bold">Wallet Address</h2>  
                    {address}
                </div>
            </div>
            <div className="flex flex-row text-center justify-center mt-10 md:text-2xl text-white">
                    <div>
                        <h2 className="font-bold">No. of NFTs</h2>
                        {data.length}
                    </div>
                    <div className="ml-20">
                        <h2 className="font-bold">Total Value</h2>
                        {totalPrice} ETH
                    </div>
            </div>
            <div className="flex flex-col text-center items-center mt-11 text-white">
                <h2 className="font-bold">Your NFTs</h2>
                <div className="flex justify-center flex-wrap max-w-screen-xl">
                    {data.map((value, index) => {
                    return <TileNFT data={value} key={index}></TileNFT>;
                    })}
                </div>
                <div className="mt-10 text-xl">
                    {data.length === 0 ? "No NFT data to display (Are you logged in?)":""}
                </div>
            </div>
            </div>
        </div>
    )
};