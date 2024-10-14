import React from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import MainPage from './pages/mainpage/MainPage';
import HomeBu from './pages/home-business/HomeBu';
import ProfileBu from './pages/profile-business/ProfileBu';
import ProfileCreate from './pages/profilecreate-business/ProfileCreate';
import ThankBusiness from './components/thank-business/ThankBusiness';
import DashboardBu from './pages/dashboard-business/DashboardBu';
import Choose from './components/choose-business/Choose';
import Collab from './pages/collab/Collab';
import BusinessUser from './pages/home-business/HomeBu';
import Investor from './pages-investor/HomeInvestor';
import InvestDashboard from './pages-investor/invest-dashboard/InvestDashboard';
import InvestProfile from './pages-investor/invest-profile/InvestProfile';
import Tokenize from './pages/home-business/BuToken/CreateToken/UploadImage/Tokenize';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          path: "/",
          element: <MainPage />
        },
        {
          path: "/choose",
          element: <Choose />
        },
        {
          path: "/collab",
          element: <Collab />
        },
        {
          path: "/homebu",
          element: <HomeBu />
        },
        {
          path: "/dashboardbu",
          element: <DashboardBu />
        },
        {
          path: "/profilebu",
          element: <ProfileBu />
        },
        {
          path: "/profilecreate",
          element: <ProfileCreate />
        },
        {
          path: "/thankbu",
          element: <ThankBusiness />
        },
        {
          path: "/business-user",
          element: <BusinessUser />
        },
        {
          path: "/tokenize",
          element: <Tokenize />
        },
        {
          path: "/investor",
          element: <Investor />
        },
        {
          path: "/invest-dashboard",
          element: <InvestDashboard />
        },
        {
          path: "/invest-home",
          element: <Investor />
        },
        {
          path: "/invest-profile",
          element: <InvestProfile />
        },
    ]
    }
  ])

  return ( 
    <RouterProvider router={router} />
  );  
}

export default App;