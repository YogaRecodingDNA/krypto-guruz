import Navbar from "../components/Navbar";
import { useState } from "react";
import guru12 from "../assets/guru12.jpeg"

const NFTPage = () => {
const [ data, setData ] = useState({});
const [ message, setMessage ] = useState("");
const [ currentAddress, setCurrentAddress ] = useState("0x");

    return(
        <div style={{"min-height":"100vh"}}>
            <Navbar></Navbar>
            <div className="md:ml-20 md:mt-20 md:flex">
                <img src={guru12} alt="" className="border-2 rounded w-10/12 mx-10 my-5 md:w-2/5" />
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
                    { currentAddress == data.owner || currentAddress == data.seller ?
                        <div className="text-emerald-700">You are the owner of this NFT</div>
                        : <button className="enableEthereumButton bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm">Buy this NFT</button>
                    }
                    
                    <div className="text-green text-center mt-3">{message}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NFTPage;