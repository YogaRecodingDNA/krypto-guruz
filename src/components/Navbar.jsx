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
          <li className='w-4/6'>
            <ul className='lg:flex justify-between space-x-2 font-bold mr-10 text-lg'>
              {location.pathname === "/" ? 
              <li className='w-28 border-b-2 hover:pb-0'>
                <Link to="/">Marketplace</Link>
              </li>
              :
              <li className='w-28 hover:border-b-2 hover:pb-0'>
                <Link to="/">Marketplace</Link>
              </li>              
              }
              {location.pathname === "/sellNFT" ? 
              <li className='w-28 border-b-2 hover:pb-0'>
                <Link to="/sellNFT">List My NFT</Link>
              </li>
              :
              <li className='w-28 hover:border-b-2 hover:pb-0'>
                <Link to="/sellNFT">List My NFT</Link>
              </li>              
              }              
              {location.pathname === "/profile" ? 
              <li className='w-16 border-b-2 hover:pb-0'>
                <Link to="/profile">Profile</Link>
              </li>
              :
              <li className='w-16 hover:border-b-2 hover:pb-0'>
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
        <div className='text-white text-bold text-right mr-10 mt-3 text-sm'>
          {currentAddress !== "0x" ? "Connected to":"Not Connected. Please login to view NFTs"} {currentAddress !== "0x" ? (currentAddress.substring(0,15)+'...'):""}
        </div>
      </div>
    );
  }

  export default Navbar;