import Navbar from "./Navbar";
import NFTTile from "./NFTTile";
import { useState } from "react";
import guru5 from "../assets/guru5.jpeg"
import guru9 from "../assets/guru9.avif"
import guru10 from "../assets/guru10.jpeg"

export default function Marketplace() {
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
const [data, updateData] = useState(sampleData);

return (
    <div>
        <Navbar></Navbar>
        <div className="flex flex-col place-items-center mt-20">
            <div className="md:text-xl font-bold text-white">
                Top NFTs
            </div>
            <div className="flex mt-5 justify-between flex-wrap max-w-screen-xl text-center">
                {data.map((value, index) => {
                    return <NFTTile data={value} key={index}></NFTTile>;
                })}
            </div>
        </div>            
    </div>
);

}






// import Navbar from "./Navbar";
// import NFTTile from "./NFTTile";
// import guru1 from "../assets/guru1.jpeg";
// import guru2 from "../assets/guru2.jpg";
// import guru3 from "../assets/guru3.jpeg";
// import { useState } from "react";

// const Marketplace = () => {

//   const sampleNFTs = [
//     {
//       "name": "GURU#1",
//       "description": "Tribal Youth's First NFT",
//       "image": `${guru1}`,
//       "price":"0.01ETH",
//       "currentlyAvailable":"True",
//       "address":"0xCFb744B032B5220E27259282F1fC1E048b3C5434",
//     },
//     {
//       "name": "GURU#2",
//       "description": "Tribal Youth's Second NFT",
//       "image": `${guru2}`,
//       "price":"0.01ETH",
//       "currentlyAvailable":"True",
//       "address":"0xCFb744B032B5220E27259282F1fC1E048b3C5434",
//     },
//     {
//       "name": "GURU#3",
//       "description": "Tribal Youth's Third NFT",
//       "image": `${guru3}`,
//       "price":"0.01ETH",
//       "currentlyAvailable":"True",
//       "address":"0xCFb744B032B5220E27259282F1fC1E048b3C5434",
//     },
//   ];

//   // eslint-disable-next-line no-unused-vars
//   const [ dataNft, setDataNft ] = useState(sampleNFTs);

//   return (
//     <div>
//       <Navbar></Navbar>
//       <div className="flex flex-col place-items-center mt-20">
//         <div className="md:text-xl font-bold text-white">
//             Top NFTs
//         </div>
//         <div className="flex mt-5 justify-between flex-wrap max-w-screen-xl text-center">
//             {dataNft.map((value, index) => {
//                 return <NFTTile data={value} key={index}></NFTTile>;
//             })}
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Marketplace;