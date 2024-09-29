import React from 'react';
import { useLocation } from 'react-router-dom';
import './Connect.css'; // Ensure this CSS file exists

const ConnectPage = () => {
    // const location = useLocation();
    // const { status, message } = location.state || {};

    return (
        <div className="connect-container">
            <h1>Thanks for funding, we will connect with you shortly</h1>
            
            {/* {status && <h2>Status: {status}</h2>}
            {message && <h2>Message: {message}</h2>} */}
        </div>
    );
}

export default ConnectPage;
