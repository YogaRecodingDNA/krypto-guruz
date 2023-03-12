import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { uploadFileToIPFS, uploadJSONToIPFS } from "../pinata";
import Navbar from "../components/Navbar";
import Marketplace from "../Marketplace.json";


const ListNFTPage = () => {
    const [ formParams, setFormParams ] = useState({ name: "", description: "", price: ""});
    const [ fileURL, setFileURL ] = useState(null);
    const [ message, setMessage ] = useState("");
    const navigate = useNavigate();
    const ethers = require("ethers");


    // Upload File (IMAGE) to Pinata
    const onChangeFile = async (e) => {
        var file = e.target.files[0];

        try {
            const response = await uploadFileToIPFS(file);
            if(response.success === true){
                console.log("Uploaded image to Pinata: ", response.pinataURL);
                setFileURL(response.pinataURL);
            }
        } catch(error) {
            console.log("Error during the file upload:", error);
        }
    }

    
    // Upload metadata to IPFS and Fetch URL from PINATA
    const uploadMetadataToIPFS = async () => {
        console.log("formParams", formParams);
        // Check for missing form params
        const { name, description, price } = formParams;
        if (!name || !description || !price || !fileURL) {
            return;
        }

        // Set params for JSON Object
        const nftJSON = { name, description, price, image: fileURL }

        // Upload to IPFS and Return URL
        try {
            const response = await uploadJSONToIPFS(nftJSON);

            if(response.success === true) {
                console.log("Successfully uploaded JSON to Pinata: ", response);
                return response.pinataURL;
            }
        }
        catch (error) {
            console.log("Error uploading metadata to Pinata", error);
        }
    }


    // MINT AND LIST NFT (SUBMITTED FORM)
    const listNFT = async (e) => {
        e.preventDefault();

        try {
            // Get URL
            const metadataURL = await uploadMetadataToIPFS();
            const provider = new ethers.providers.Web3Provider(window.ethereum); // Gateway to Goerli Testnet -> Metamask injects into the browser window
            const signer = provider.getSigner(); // Get the address
            setMessage("Uploading now... please wait (up to 5 mins)");
            
            // Retrieve correct contract by passing the address, abi, and signer
            let contract = new ethers.Contract(Marketplace.address, Marketplace.abi, signer);
            
            // Convert decimal val to ethers val so contract understands the values it calculates
            const price = ethers.utils.parseUnits(formParams.price, "ether");
            // Get listed price from contract and convert to string
            let listingPrice = await contract.getListPrice();
            listingPrice = listingPrice.toString();
            
            // Mint NFT
            let transaction = await contract.createNFTToken(metadataURL, price, {value: listingPrice});
            await transaction.wait();

            // Message user, reset state fields, redirect to marketplace
            alert("Successfully Minted your NFT!");
            setMessage("");
            setFormParams({ name: "", description: "", price: ""});
            navigate("/");

        } catch (error) {
            console.log("Oops! Upload error", error);
            alert("Oops! Upload error", error);
        }
    }



    return (
        <div className="">
        <Navbar></Navbar>
        <div className="flex flex-col place-items-center mt-10" id="nftForm">
            <form className="bg-white shadow-md rounded px-8 pt-4 pb-8 mb-4">
            <h3 className="text-center font-bold text-purple-500 mb-8">Upload your NFT to the marketplace</h3>
                <div className="mb-4">
                    <label 
                        className="block text-purple-500 text-sm font-bold mb-2" htmlFor="name">NFT Name</label>
                    <input 
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="name"
                        type="text"
                        placeholder="Guru#4563"
                        onChange={e => setFormParams({...formParams, name: e.target.value})} value={formParams.name} />
                </div>
                <div className="mb-6">
                    <label 
                        className="block text-purple-500 text-sm font-bold mb-2"
                        htmlFor="description"
                    >
                        NFT Description
                    </label>
                    <textarea 
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        cols="40"
                        rows="5"
                        id="description"
                        type="text"
                        placeholder="Guru Enlightened Collection"
                        value={formParams.description}
                        onChange={e => setFormParams({...formParams, description: e.target.value})}
                    />
                </div>
                <div className="mb-6">
                    <label 
                        className="block text-purple-500 text-sm font-bold mb-2"
                        htmlFor="price"
                    >
                        Price (in ETH)
                    </label>
                    <input 
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                        type="number"
                        placeholder="Min 0.001 ETH"
                        step="0.001"
                        value={formParams.price}
                        onChange={e => setFormParams({...formParams, price: e.target.value})}
                    />
                </div>
                <div>
                    <label 
                        className="block text-purple-500 text-sm font-bold mb-2" 
                        htmlFor="image"
                    >
                        Upload Image
                    </label>
                    <input id="image" type={"file"} accept="image/*" onChange={onChangeFile} />
                </div>
                <br></br>
                <div className="text-green text-center">{message}</div>
                <button
                    onClick={listNFT} 
                    className="font-bold mt-10 w-full bg-purple-500 text-white rounded p-2 shadow-lg"
                >
                    List NFT
                </button>
            </form>
        </div>
        </div>
    )
}

export default ListNFTPage;