import React from 'react';
import './HomeBu.css';
import { Link } from 'react-router-dom';
import TokenList from './BuToken/TokenList';

const HomeBu = () => {
  return (
    <div className="homepage">

      <header className="homepage-header">
        <h1 className="hpgheader-text">Make your Business as a Token now!</h1>
        <Link to="/tokenize">
          <button className="create-token-button">Create Token</button>
        </Link>
      </header>

      <div className="list-container">
        <h1 className="list-text">List Of Token</h1>
      </div>

      <TokenList/>

      {/* <div className="grid-container">
        <div className="grid-item">
          <h2>Fishing Business</h2>
          <button className="grid-button">Collaboration</button>
        </div>

        <div className="grid-item">
          <h2>Wheat Business</h2>
          <button className="grid-button">Collaboration</button>
        </div>

        <div className="grid-item">
          <h2>Crops Business</h2>
          <button className="grid-button">Collaboration</button>
        </div>

        <div className="grid-item">
          <h2>Plant Business</h2>
          <button className="grid-button">Collaboration</button>
        </div>

      </div> */}
    </div>
  );
};

export default HomeBu;
