import { useState } from 'react';
import { useLocation } from 'react-router';
import { Link } from "react-router-dom";
import fullLogo from '../full_logo.png';

function Navbar() {
  const [ isConnected, setIsConnected ] = useState(false);
  const [ currentAddress, setCurrentAddress ] = useState('0x');
  const location = useLocation();


    return (
      <div className="">
        <nav className="w-screen bg-gray-800">
          <ul className='flex items-center justify-between py-3 bg-transparent text-violet-400 pr-5'>
          <li className='flex items-end ml-5 pb-2'>
            <Link to="/" className='flex items-center'>
            <img src={fullLogo} alt="" width={60} height={60} />
            <div className='self-center font-bold text-4xl text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-amber-400 to-cyan-300 ml-2'>
              Krypto Guruz
            </div>
            </Link>
          </li>
          <li className='w-2/6'>
            <ul className='lg:flex justify-between font-bold mr-10 text-lg'>
              {location.pathname === "/" ? 
              <li className='border-b-2 hover:pb-0'>
                <Link to="/">Marketplace</Link>
              </li>
              :
              <li className='hover:border-b-2 hover:pb-0'>
                <Link to="/">Marketplace</Link>
              </li>              
              }
              {location.pathname === "/sellNFT" ? 
              <li className='border-b-2 hover:pb-0'>
                <Link to="/sellNFT">List My NFT</Link>
              </li>
              :
              <li className='hover:border-b-2 hover:pb-0'>
                <Link to="/sellNFT">List My NFT</Link>
              </li>              
              }              
              {location.pathname === "/profile" ? 
              <li className='border-b-2 hover:pb-0'>
                <Link to="/profile">Profile</Link>
              </li>
              :
              <li className='hover:border-b-2 hover:pb-0'>
                <Link to="/profile">Profile</Link>
              </li>              
              }  
              <li>
                <button className="enableEthereumButton border-2 border-cyan-400 bg-gradient-to-r from-amber-500 to-cyan-400 hover:bg-gradient-to-l hover:from-amber-600 hover:to-cyan-500 text-white font-bold py-2 px-4 rounded text-sm">{isConnected? "Connected":"Connect Wallet"}</button>
              </li>
            </ul>
          </li>
          </ul>
        </nav>
        <div className='text-white text-bold text-right mr-10 text-sm'>
          {currentAddress !== "0x" ? "Connected to":"Not Connected. Please login to view NFTs"} {currentAddress !== "0x" ? (currentAddress.substring(0,15)+'...'):""}
        </div>
      </div>
    );
  }

  export default Navbar;












// /* eslint-disable no-unused-vars */


// import { useState } from 'react';
// import { Link } from "react-router-dom";
// import { useLocation } from 'react-router';
// import logoGuru from '../assets/logoGuru.png';

// const Navbar = () => {
//   const [ isConnected, setIsConnected ] = useState(false);
//   const [ currentAddress, setCurrentAddress ] = useState('0x');
//   const location = useLocation();

//   return (
//     <div>
//       <nav className="w-screen">
//         <ul className='flex items-end justify-between py-3 bg-transparent text-white pr-5'>
//         <li className='flex items-end ml-5 pb-2'>
//           <Link to="/">
//           <img src={logoGuru} alt="" width={120} height={120} className="inline-block -mt-2"/>
//           <div className='inline-block font-bold text-xl ml-2'>
//             Krypto_Guruz NFT Marketplace
//           </div>
//           </Link>
//         </li>
//         <li className='w-2/6'>
//           <ul className='lg:flex justify-between font-bold mr-10 text-lg'>
//             {location.pathname === "/" ? 
//             <li className='border-b-2 hover:pb-0 p-2'>
//               <Link to="/">Marketplace</Link>
//             </li>
//             :
//             <li className='hover:border-b-2 hover:pb-0 p-2'>
//               <Link to="/">Marketplace</Link>
//             </li>              
//             }
//             {location.pathname === "/sellNFT" ? 
//             <li className='border-b-2 hover:pb-0 p-2'>
//               <Link to="/sellNFT">Mint My NFT</Link>
//             </li>
//             :
//             <li className='hover:border-b-2 hover:pb-0 p-2'>
//               <Link to="/sellNFT">Mint My NFT</Link>
//             </li>              
//             }              
//             {location.pathname === "/profile" ? 
//             <li className='border-b-2 hover:pb-0 p-2'>
//               <Link to="/profile">Profile</Link>
//             </li>
//             :
//             <li className='hover:border-b-2 hover:pb-0 p-2'>
//               <Link to="/profile">Profile</Link>
//             </li>              
//             }  
//             <li>
//               <button className="enableEthereumButton bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm">{isConnected ? "Connected" : "Connect Wallet"}</button>
//             </li>
//           </ul>
//         </li>
//         </ul>
//       </nav>
//       <div className='text-white text-bold text-right mr-10 text-sm'>
//         {currentAddress !== "0x" ? "Connected to" : "Not Connected. Please login to view NFTs"} {currentAddress !== "0x" ? (currentAddress.substring(0,15)+'...'):""}
//       </div>
//     </div>
//   )
// }

// export default Navbar;