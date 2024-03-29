import { useState } from "react";
import { useParams } from 'react-router-dom';
import Navbar from "../components/Navbar";
import MarketplaceJSON from "../Marketplace.json"
import axios from "axios";
// import guru12 from "../assets/guru12.jpeg"

const NFTPage = () => {
    const [ data, setData ] = useState({});
    const [ message, setMessage ] = useState("");
    const [ isDataFetched, setIsDataFetched ] = useState(false);
    const [ currentAddress, setCurrentAddress ] = useState("0x");

    async function getNFTData(tokenId) {
        const ethers = require("ethers");

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const addr = await signer.getAddress();
        //Pull the deployed contract instance
        let contract = new ethers.Contract(MarketplaceJSON.address, MarketplaceJSON.abi, signer)
        
        // Get token by ID
        const tokenURI = await contract.tokenURI(tokenId);
        const listedToken = await contract.getNFTById(tokenId);
        let metadata = await axios.get(tokenURI);
        metadata = metadata.data;
    
        let NFTData = {
            price: metadata.price,
            tokenId: tokenId,
            seller: listedToken.seller,
            owner: listedToken.owner,
            image: metadata.image,
            name: metadata.name,
            description: metadata.description,
        }

        console.log(NFTData);
        setData(NFTData);
        setIsDataFetched(true);
        console.log("address", addr)
        setCurrentAddress(addr);
    }
    
    async function buyNFT(tokenId) {
        try {
            const ethers = require("ethers");
            //After adding your Hardhat network to your metamask, this code will get providers and signers
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
    
            //Pull the deployed contract instance
            let contract = new ethers.Contract(MarketplaceJSON.address, MarketplaceJSON.abi, signer);
            const salePrice = ethers.utils.parseUnits(data.price, 'ether')
            setMessage("Buying the NFT... Please Wait (Upto 5 mins)")
            //run the executeSale function
            let transaction = await contract.executeSale(tokenId, {value:salePrice});
            await transaction.wait();
    
            alert('You successfully bought the NFT!');
            setMessage("");
        }
        catch(e) {
            alert("Upload Error"+e)
        }
    }
    
    const params = useParams();
    const tokenId = params.tokenId;
    if(!isDataFetched) {
        getNFTData(tokenId);
    }


    return(
        <div style={{"min-height":"100vh"}}>
            <Navbar></Navbar>
            <div className="md:ml-20 md:mt-20 md:flex">
                <img src={data.image} alt="" className="border-2 rounded w-10/12 mx-10 my-5 md:w-2/5" />
                <div className="text-xl mx-10 my-10 md:ml-20 space-y-8 text-white shadow-2xl rounded-lg border-2 p-5">
                    <div>
                        Name: {data.name}
                    </div>
                    <div>
                        Description: {data.description}
                    </div>
                    <div>
                        Price: <span className="">{data.price + " ETH"}</span>
                    </div>
                    <div>
                        Owner: <span className="text-sm">{data.owner}</span>
                    </div>
                    <div>
                        Seller: <span className="text-sm">{data.seller}</span>
                    </div>
                    <div>
                    { currentAddress === data.owner || currentAddress === data.seller ?
                        <div className="text-emerald-700">You are the owner of this NFT</div>
                        : <button
                            onClick={() => buyNFT(tokenId)}
                            className="enableEthereumButton bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm">Buy this NFT</button>
                    }
                    
                    <div className="text-green text-center mt-3">{message}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NFTPage;