import React, { useState, useEffect } from 'react';
import { getHeaders } from '../../appUtils';
import './InvestProfile.css'; // Assuming you want to use the same styles as ProfileBu

const InvestProfile = () => {
    const [investorData, setInvestorData] = useState({
        walletAddress: '',
        name: 'Anonymous',
        balance: ''
    });

    useEffect(() => {
        // Fetch investor data or investment details from an API if available
        const fetchInvestorData = async () => {
            try {
                // First request: Get Wallet by address
                const walletResponse = await fetch(
                  'https://service-testnet.maschain.com/api/wallet/wallet/0xa55eae503f7Bfcaf6357e464c5009110cD6711E6',
                  {
                    method: 'GET',
                    headers: getHeaders(),
                  }
                );
        
                const walletData = await walletResponse.json();
                const walletInfo = walletData.result;
        
                // Update profile data with wallet address and name
                setInvestorData(prevState => ({
                  ...prevState,
                  walletAddress: walletInfo.address,
                  name: walletInfo.name
                }));
        
                // Second request: Get Token Balance
                const balanceResponse = await fetch(
                  'https://service-testnet.maschain.com/api/token/balance',
                  {
                    method: 'POST',
                    headers: getHeaders(),
                    body: JSON.stringify({
                      wallet_address: walletInfo.address,
                      contract_address: '0xF5757012879C259A1c78f6eE6D60f1d13B42f4f5',
                    }),
                  }
                );
        
                const balanceData = await balanceResponse.json();
        
                // Update profile data with the amount
                setInvestorData(prevState => ({
                  ...prevState,
                  balance: `${balanceData.result} SAND`
                }));
              } catch (error) {
                console.error('Error fetching profile data:', error);
              }
        };

        fetchInvestorData();
    }, []);

    return (
        <div className="profile-page"> {/* Using the same class as ProfileBu for consistency */}
            <h1>Investor Profile</h1>
            <div className="profile-info">
                <div className="profile-item">
                    <span className="profile-label">Wallet Address:</span>
                    <span className="profile-value">{investorData.walletAddress}</span>
                </div>
                <div className="profile-item">
                    <span className="profile-label">Name:</span>
                    <span className="profile-value">{investorData.name}</span>
                </div>
                <div className="profile-item">
                    <span className="profile-label">Balance:</span>
                    <span className="profile-value">{investorData.balance}</span>
                </div>
            </div>
        </div>
    );
}

export default InvestProfile;
