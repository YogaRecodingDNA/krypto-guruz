import Navbar from "../components/Navbar";
import TileNFT from "../components/TileNFT";
import { useState } from "react";
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

return (
    <div>
        <Navbar></Navbar>
        <div className="flex flex-col place-items-center mt-20">
            <div className="md:text-xl font-bold text-white">
                Top NFTs
            </div>
            <div className="flex mt-5 justify-between flex-wrap max-w-screen-xl text-center">
                {data.map((value, index) => {
                    return <TileNFT data={value} key={index}></TileNFT>;
                })}
            </div>
        </div>            
    </div>
);

}

export default MarketplacePage;