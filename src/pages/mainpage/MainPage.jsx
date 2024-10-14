import React from 'react';
import '../mainpage/MainPage.css';
import seafloorLogo from '../../assets/3d-logo.png';


function MainPage({ openModal }) {
  return (
      <div className='container'>
        <div className='border-home'>
          <div className='logo-home'>
            <img src={seafloorLogo} className="logo" alt="Seafloor Finance logo" />
          </div>
          <p>Welcome to Seafloor Finance!<br/>
            where raising funds is just one click away.
            </p>
          <div className="card">
            <button className="button" onClick={() => { console.log('Business User clicked'); openModal('business');}}>
              Business User
            </button>
            <br />
            <button className="button" onClick={() => { console.log('Investor clicked'); openModal('investor');}}>
              Investor
            </button>
          </div>
        </div>
      </div>
  );
}

export default MainPage;
