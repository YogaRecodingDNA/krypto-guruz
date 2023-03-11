import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { Link } from "react-router-dom";
import fullLogo from '../full_logo.png';

function Navbar() {
  const [ isConnected, setIsConnected ] = useState(false);
  const [ currentAddress, setCurrentAddress ] = useState('0x');
  const location = useLocation();

  // Get address of users currently connected wallet
  const getAddress = async () => {
    const ethers = require("ethers");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    setCurrentAddress(address);
  }

  const updateButton = async () => {
    const ethereumButton = document.querySelector('.enableEthereumButton');
    ethereumButton.textContent = "Connected";
    ethereumButton.classList.remove("border-rose-600");
    ethereumButton.classList.remove("bg-gradient-to-r");
    ethereumButton.classList.remove("from-rose-600");
    ethereumButton.classList.remove("via-yellow-400");
    ethereumButton.classList.remove("to-cyan-400");
    ethereumButton.classList.remove("hover:bg-gradient-to-l");
    ethereumButton.classList.remove("hover:from-amber-600");
    ethereumButton.classList.remove("hover:to-cyan-500");
    ethereumButton.classList.remove("border-2");
    ethereumButton.classList.add("bg-green-500");
    ethereumButton.classList.add("hover:bg-green-70");
  }
  
  // Connect to wallet
  const connectWebsite = async () => {
      // Check if user is on Goerli testnet
      const chainId = await window.ethereum.request({ method: 'eth_chainId' });
      if(chainId !== '0x5') // Goerli's chainID
      {
        // alert('Incorrect network! Switch your metamask network to Goerli');
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain', // If not on Goerli, asks to switch
          params: [{ chainId: '0x5' }],
       })
      }

      // Request connection to account 
      await window.ethereum.request({ method: 'eth_requestAccounts' })
        .then(() => {
          updateButton();
          getAddress();
          window.location.replace(location.pathname)
        });
  }
  
  // Reload the page when the account is changed
  useEffect(() => {
    let val = window.ethereum.isConnected();

    if(val)
    {
      getAddress();
      setIsConnected(val);
      updateButton();
    }
    // Event listener for changed account
    window.ethereum.on('accountsChanged', function(accounts){
      window.location.replace(location.pathname)
    })
  });


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
                <Link to="/listNFT">List My NFT</Link>
              </li>
              :
              <li className='w-28 hover:border-b-2 hover:pb-0'>
                <Link to="/listNFT">List My NFT</Link>
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
                <button
                  onClick={connectWebsite}
                  className="enableEthereumButton border-2 border-rose-600 bg-gradient-to-r from-rose-600 via-yellow-400 to-cyan-400 hover:bg-gradient-to-l hover:from-amber-600 hover:to-cyan-500 text-white font-bold py-2 px-4 rounded text-sm"
                >
                  {isConnected? "Connected":"Connect Wallet"}
                </button>
              </li>
            </ul>
          </li>
          </ul>
        </nav>
        <div
          className='text-white text-bold text-right mr-10 mt-3 text-sm'
        >
          {currentAddress !== "0x" ? "Connected to":"Not Connected. Please login to view NFTs"} {currentAddress !== "0x" ? (currentAddress.substring(0,15)+'...'):""}
        </div>
      </div>
    );
  }

  export default Navbar;