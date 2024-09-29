import React, { useState, useEffect } from 'react';
import { FaWallet } from 'react-icons/fa';
import './InvestNavbar.css';
import Logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';

const InvestNavbar = () => {
  const [account, setAccount] = useState(null);
  const [walletType, setWalletType] = useState(null);

  useEffect(() => {
    checkForConnectedWallet();
  }, []);

  const checkForConnectedWallet = async () => {
    if (window.ethereum && window.ethereum.selectedAddress) {
      setAccount(window.ethereum.selectedAddress);
      setWalletType('metamask');
    } else if ('aptos' in window) {
      const wallet = window.aptos;
      try {
        const response = await wallet.account();
        if (response.address) {
          setAccount(response.address);
          setWalletType('petra');
        }
      } catch (error) {
        console.error('Failed to connect to Petra wallet:', error);
      }
    }
  };

  const connectMetaMask = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);
        setWalletType('metamask');
      } catch (error) {
        console.error('Failed to connect to MetaMask:', error);
      }
    } else {
      window.open('https://metamask.io/download/', '_blank');
    }
  };

  const connectPetraWallet = async () => {
    if ('aptos' in window) {
      const wallet = window.aptos;
      try {
        const response = await wallet.connect();
        setAccount(response.address);
        setWalletType('petra');
      } catch (error) {
        console.error('Failed to connect to Petra wallet:', error);
      }
    } else {
      window.open('https://petra.app/', '_blank');
    }
  };

  const disconnectWallet = async () => {
    if (walletType === 'petra' && 'aptos' in window) {
      const wallet = window.aptos;
      try {
        await wallet.disconnect();
      } catch (error) {
        console.error('Failed to disconnect from Petra wallet:', error);
      }
    }
    // Note: MetaMask doesn't have a disconnect method
    setAccount(null);
    setWalletType(null);
  };

  const switchWallet = () => {
    disconnectWallet();
    if (walletType === 'metamask') {
      connectPetraWallet();
    } else {
      connectMetaMask();
    }
  };

  const formatAddress = (address) => {
    if (address && address.length > 10) {
      return `${address.slice(0, 6)}...${address.slice(-4)}`;
    }
    return address;
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo">
          <Link to='/'>
            <img src={Logo} alt="Logo" className="logo-image" />
          </Link>
        </div>
        <div className="wallet">
          {!account ? (
            <>
              <button className="wallet-button" onClick={connectMetaMask}>
                <FaWallet className="wallet-icon" />
                <p>Connect MetaMask</p>
              </button>
              <button className="wallet-button" onClick={connectPetraWallet}>
                <FaWallet className="wallet-icon" />
                <p>Connect Petra</p>
              </button>
            </>
          ) : (
            <div className="wallet-info">
              <p>{`${formatAddress(account)} (${walletType})`}</p>
              <button onClick={disconnectWallet}>Disconnect</button>
              <button onClick={switchWallet}>Switch Wallet</button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default InvestNavbar;