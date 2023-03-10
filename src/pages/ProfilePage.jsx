import { useState } from "react";
import Navbar from "../components/Navbar";
import TileNFT from "../components/TileNFT";

export default function Profile () {
    const [data, setData] = useState([]);
    const [address, setAddress] = useState("0x");
    const [totalPrice, setTotalPrice] = useState("0");
    
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
                    {data.length == 0 ? "No NFT data to display (Are you logged in?)":""}
                </div>
            </div>
            </div>
        </div>
    )
};