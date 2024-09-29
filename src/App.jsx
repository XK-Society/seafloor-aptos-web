import React from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import HomeBu from './pages/home-business/HomeBu'
import ProfileBu from './pages/profile-business/ProfileBu'
import ProfileCreate from './pages/profilecreate-business/ProfileCreate'
import ThankBusiness from './components/thank-business/ThankBusiness'
import DashboardBu from './pages/dashboard-business/DashboardBu'
import Choose from './components/choose-business/Choose'
import Collab from './pages/collab/Collab'
import BusinessUser from './pages/home-business/HomeBu'
import Investor from './pages-investor/HomeInvestor';
import ConnectPage from './pages-investor/comp-investor/Connect';
import InvestDashboard from './pages-investor/invest-dashboard/InvestDashboard';
import InvestProfile from './pages-investor/invest-profile/InvestProfile';
import seafloorLogo from './assets/logo.png'
import './App.css'

function MainPage() {
  const navigate = useNavigate();

  return (
    <>
    <div className='container'>
    <div className='border-home'>
    <div className='logo-home'>
        <img src={seafloorLogo} className="logo" alt="Seafloor Finance logo" />
    </div>
      <h1>Seafloor Finance</h1>
      <div className="card">
        <button onClick={() => navigate('/business-user')}>
          Business User
        </button>
        <br />
        <button onClick={() => navigate('/invest-dashboard')}>
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
  return (
    <>
      <Routes>
        <Route path='/' element={<MainPage/>} />
        <Route path='/homebu' element={<HomeBu/>} />
        <Route path='/dashboardbu' element={<DashboardBu/>} />
        <Route path='/profilebu' element={<ProfileBu/>} />
        <Route path='/profilecreate' element={<ProfileCreate/>} />
        <Route path='/thankbu' element={<ThankBusiness/>} />
        <Route path='/choose' element={<Choose/>} />
        <Route path='/collab' element={<Collab/>} />
        <Route path="/business-user/*" element={<BusinessUser />}/>
        <Route path="/investor" element={<Investor />}/>
        <Route path="/invest-connect-message" element={<ConnectPage />}/>
        <Route path="/invest-dashboard" element={<InvestDashboard />}/>
        <Route path="/invest-home" element={<Investor />}/>
        <Route path="/invest-profile" element={<InvestProfile />}/>
      </Routes>
    </>
  )
}

export default App
