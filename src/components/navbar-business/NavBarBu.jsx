import React from 'react';
import { FaWallet } from 'react-icons/fa';
import './NavBarBu.css';
import Logo from '../../assets/logo.png'
import { Link } from 'react-router-dom';

const NavbarBu = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo">
            <Link to='/'>
                <img src={Logo} alt="Logo" className="logo-image" />
            </Link>
        </div>
        <div className="wallet">
          <button className="wallet-button">
            <FaWallet className="wallet-icon" />
            <p>Connect Wallet</p>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavbarBu;
