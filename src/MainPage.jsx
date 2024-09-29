import React from 'react';
import './App.css'
import seafloorLogo from './assets/logo.png';

function MainPage({ openModal }) {
    return (
      <>
        <div className='container'>
          <div className='border-home'>
            <div className='logo-home'>
              <img src={seafloorLogo} className="logo" alt="Seafloor Finance logo" />
            </div>
            <h1>Seafloor Finance</h1>
            <div className="card">
              <button onClick={() => openModal('business')}>
                Business User
              </button>
              <br />
              <button onClick={() => openModal('investor')}>
                Investor
              </button>
            </div>
            <p className="footer-home">
              Welcome to Seafloor Finance where raising funds is just one click away.
            </p>
          </div>
        </div>
      </>
    );
  }

  export default MainPage;