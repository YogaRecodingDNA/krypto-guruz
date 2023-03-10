import Navbar from "../components/Navbar";
import { useState } from "react";

const ListNFTPage = () => {
    const [formParams, setFormParams] = useState({ name: '', description: '', price: ''});
    const [message, setMessage] = useState('');

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
                        placeholder="Min 0.01 ETH"
                        step="0.01"
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
                    <input type={"file"} onChange={""} />
                </div>
                <br></br>
                <div className="text-green text-center">{message}</div>
                <button
                    onClick={""} 
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