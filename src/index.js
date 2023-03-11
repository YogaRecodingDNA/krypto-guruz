import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Marketplace from './pages/MarketplacePage';
import NFTPage from './pages/NFTPage';
import ProfilePage from './pages/ProfilePage';
import ListNFTPage from './pages/ListNFTPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Marketplace />}/>
        <Route path="/nftPage" element={<NFTPage />}/>
        <Route path="/profile" element={<ProfilePage />}/>
        <Route path="/listNFT" element={<ListNFTPage />}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
