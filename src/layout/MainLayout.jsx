import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import '../layout/MainLayout.css'
import FooterBu from '../components/footer-business/FooterBu.jsx';
import InvestFooter from '../components/footer-invester/InvestFooter.jsx';
import InvestNavbar from '../components/navbar-investor/InvestNavbar.jsx';

const MainLayout = () => {
    const location = useLocation();

    let footerBar;
    switch (location.pathname) {
        case '/homebu':
            footerBar= <FooterBu />;
            break;
        case '/dashboardbu':
            footerBar= <FooterBu />;
            break;
        case '/profilebu':
            footerBar= <FooterBu />;
            break;
        case '/tokenize':
            footerBar= <FooterBu />;
            break;
        case '/investor':
            footerBar= <InvestFooter />;
            break;    
        case '/invest-dashboard':
            footerBar= <InvestFooter />;
            break;  
        case '/invest-home':
            footerBar= <InvestFooter />;
            break; 
        case '/invest-profile':
            footerBar= <InvestFooter />;
            break;      
        }     

  return (
    <div className="main-container">
        <header className="main-header">
            <InvestNavbar />
        </header>

        <main className="main-body">
            <Outlet />
        </main>

        <footer className="main-footer">
            <div className="footer-content">
                {footerBar}
            </div>
        </footer>
    </div>
  )
}

export default MainLayout