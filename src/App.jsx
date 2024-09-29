import React, { useState, useLayoutEffect } from 'react';
import './App.css';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import HomeBu from './pages/home-business/HomeBu';
import ProfileBu from './pages/profile-business/ProfileBu';
import ProfileCreate from './pages/profilecreate-business/ProfileCreate';
import ThankBusiness from './components/thank-business/ThankBusiness';
import DashboardBu from './pages/dashboard-business/DashboardBu';
import Choose from './components/choose-business/Choose';
import Collab from './pages/collab/Collab';
import BusinessUser from './pages/home-business/HomeBu';
import Investor from './pages-investor/HomeInvestor';
import ConnectPage from './pages-investor/comp-investor/Connect';
import InvestDashboard from './pages-investor/invest-dashboard/InvestDashboard';
import InvestProfile from './pages-investor/invest-profile/InvestProfile';
import seafloorLogo from './assets/logo.png';
import InvestNavbar from './components/navbar-investor/InvestNavbar'; // Import the InvestNavbar
import UploadImage from './pages/home-business/BuToken/CreateToken/UploadImage/UploadImage';
import TokenDesc from './pages/home-business/BuToken/TokenDesc/TokenDesc';

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
            {/* Show modal when Business User or Investor is clicked */}
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

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false); // Manage modal visibility
  const [userType, setUserType] = useState(''); // Track if Business or Investor
  
  useLayoutEffect(() => {
    document.body.style.backgroundColor = "#032B5F"
  });

  // Conditionally render the navbar based on the route
  const showNavbar = !location.pathname.startsWith('/invest') && !location.pathname.startsWith('/business');

  // Open the modal and set user type (business or investor)
  const openModal = (type) => {
    setUserType(type);
    setShowModal(true);
  };

  // Close the modal
  const closeModal = () => {
    setShowModal(false);
    setUserType('');
  };

  // Handle Existing User navigation
  const handleExistingUser = () => {
    if (userType === 'business') {
      navigate('/business-user');
    } else if (userType === 'investor') {
      navigate('/invest-dashboard');
    }
    closeModal();
  };

  // Handle New User navigation
  const handleNewUser = () => {
    if (userType === 'business') {
      navigate('/profilecreate');
    } else if (userType === 'investor') {
      navigate('/invest-profile');
    }
    closeModal();
  };

  return (
    <>
      {showNavbar && <InvestNavbar />} {/* Show the navbar if not on /invest or /business */}
      <Routes>
        <Route path='/' element={<MainPage openModal={openModal} />} />
        <Route path='/choose' element={<Choose />} />
        <Route path='/collab' element={<Collab />} />

        {/* Business */}
        <Route path='/homebu' element={<HomeBu />} />
        <Route path='/dashboardbu' element={<DashboardBu />} />
        <Route path='/profilebu' element={<ProfileBu />} />
        <Route path='/profilecreate' element={<ProfileCreate />} />
        <Route path='/thankbu' element={<ThankBusiness />} />
        <Route path="/business-user/*" element={<BusinessUser />} />
        <Route path="/upload-token-image" element={<UploadImage />} />
        <Route path="/token-desc" element={<TokenDesc />} />

        {/* Investor */}
        <Route path="/investor" element={<Investor />} />
        <Route path="/invest-connect-message" element={<ConnectPage />} />
        <Route path="/invest-dashboard" element={<InvestDashboard />} />
        <Route path="/invest-home" element={<Investor />} />
        <Route path="/invest-profile" element={<InvestProfile />} />
      </Routes>
      
      {/* Modal Popup */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>{userType === 'business' ? 'Business User' : 'Investor'}</h2>
            <p>Are you an existing user or a new user?</p>
            <div className="modal-buttons">
              <button onClick={handleExistingUser}>Existing User</button>
              <button onClick={handleNewUser}>New User</button>
            </div>
            <button className="close-modal" onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
