import React from 'react';
import './InvestDashboard.css';
import { FaArrowRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const InvestDashboard = () => {
    const navigate = useNavigate();

    const handleNavigate = (category) => {
        navigate('/investor', { state: { selectedCategory: category } });
    };

    return (
        <div className="dashboard">
            <h1 className='dashboard-title'>Dashboard</h1>
            <div className="grid-container">
                <div className="grid-item">
                    <h2>Maschain</h2>
                    <p className="dashboard-description">
                        Maschain is a virtual reality space in which users can interact with a computer-generated environment and other users.
                    </p>
                    <button className="arrow-button" onClick={() => handleNavigate('Maschain')}>
                        <FaArrowRight />
                    </button>
                </div>
                <div className="grid-item">
                    <h2>Aptos</h2>
                    <p className="dashboard-description">
                        Aptos is a blockchain-based project focused on creating a high-performance, scalable, and secure platform for decentralized applications.
                    </p>
                    <button className="arrow-button" onClick={() => handleNavigate('Aptos')}>
                        <FaArrowRight />
                    </button>
                </div>
                <div className="grid-item">
                    <h2>Ethereum</h2>
                    <p className="dashboard-description">
                        Ethereum is a decentralized, open-source blockchain system that features smart contract functionality and its own cryptocurrency, Ether.
                    </p>
                    <button className="arrow-button" onClick={() => handleNavigate('Ethereum')}>
                        <FaArrowRight />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default InvestDashboard;
