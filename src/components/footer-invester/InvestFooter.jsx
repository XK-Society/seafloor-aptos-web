import { FaHome, FaFolder, FaUser } from 'react-icons/fa';
import './InvestFooter.css';
import { Link } from 'react-router-dom';

const InvestFooter = () => {

return (
    <footer className="footer">
        <div className="footer-container">
            <Link to='/invest-home' className="footer-item">
                <FaHome className="footer-icon" />
                <span>Home</span>
            </Link>
            <Link to='/invest-dashboard' className="footer-item">
                <FaFolder className="footer-icon" />
                <span>Dashboard</span>
            </Link>
            <Link to='/invest-profile' className="footer-item">
                <FaUser className="footer-icon" />
                <span>Profile</span>
            </Link>
        </div>
    </footer>
);
};

export default InvestFooter;
