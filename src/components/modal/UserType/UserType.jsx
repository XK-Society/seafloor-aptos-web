import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { ZkMeWidget, verifyKycWithZkMeServices } from '@zkmelabs/widget';
import '@zkmelabs/widget/dist/style.css';
import gifImage from './assets/fishing-cat.gif';
import MainPage from './MainPage';
import '../UserType/UserType.css'

const API_KEY = '';
const APP_ID = '';
const PROGRAM_NO = '';

function UserType () {
  //const location = useLocation();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(true); // Manage modal visibility
  const [userType, setUserType] = useState(''); // Track if Business or Investor
  const [zkMeWidget, setZkMeWidget] = useState(null);
  const [error, setError] = useState(null);
  
  useLayoutEffect(() => {
    document.body.style.backgroundColor = "#032B5F"
  });

  useEffect(() => {
    initializeZkMeWidget();
  }, []);

  const fetchAccessToken = async () => {
    try {
      console.log('Fetching access token with:', { API_KEY, APP_ID });
      const response = await fetch('https://nest-api.zk.me/api/token/get', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          apiKey: API_KEY,
          appId: APP_ID,
          apiModePermission: 0,
          lv: 1,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error response from token API:', errorData);
        throw new Error(`Failed to fetch access token: ${errorData.msg}`);
      }

      const data = await response.json();
      console.log('Access token fetched successfully');
      return data.accessToken;
    } catch (error) {
      console.error('Error fetching access token:', error);
      throw error;
    }
  };

  const initializeZkMeWidget = () => {
    // Clear any potentially persisted tokens
    localStorage.removeItem('zkme_token'); // Adjust this key if needed

    const provider = {
      async getAccessToken() {
        try {
          const token = await fetchAccessToken();
          console.log('Access token fetched successfully');
          return token;
        } catch (error) {
          console.error('Error fetching access token:', error);
          throw error;
        }
      },
      async getUserAccounts() {
        if ('aptos' in window) {
          const wallet = window.aptos;
          try {
            const response = await wallet.account();
            return [response.address];
          } catch (error) {
            console.error('Failed to get user account:', error);
            return [];
          }
        }
        return [];
      },
      async delegateAptosTransaction(tx) {
        if ('aptos' in window) {
          const wallet = window.aptos;
          try {
            const txResponse = await wallet.signAndSubmitTransaction(tx);
            return txResponse.hash;
          } catch (error) {
            console.error('Failed to delegate Aptos transaction:', error);
            throw error;
          }
        }
        throw new Error('Aptos wallet not found');
      },
    };

    try {
      console.log('Initializing ZkMeWidget with:', { APP_ID, PROGRAM_NO });
      const widget = new ZkMeWidget(
        APP_ID,
        'Seafloor Finance',
        1, // Chain ID for Aptos
        provider,
        {
          lv: 'zkKYC',
          theme: 'auto',
          programNo: PROGRAM_NO
        }
      );

      widget.on('kycFinished', handleKycFinished);
      setZkMeWidget(widget);
      console.log('ZkMeWidget initialized successfully');
    } catch (error) {
      console.error('Error initializing ZkMeWidget:', error);
      setError('Failed to initialize KYC widget. Please try again later.');
    }
  };

  const handleKycFinished = async (results) => {
    const { isGrant, associatedAccount } = results;
    if (isGrant) {
      console.log('KYC completed for account:', associatedAccount);
      // TODO: Update your backend or local state to mark the user as KYC verified
      navigate(userType === 'business' ? '/business-user' : '/invest-dashboard');
    } else {
      console.log('KYC process failed or was not completed');
      setError('KYC verification failed. Please try again.');
    }
  };

  // const showNavbar = !location.pathname.startsWith('/invest') && !location.pathname.startsWith('/business');

  const handleExistingUser = () => {
    if (userType === 'business') {
      navigate('/homebu');
    } else if (userType === 'investor') {
      navigate('/invest-home');
    }
    closeModal();
  };

  const handleNewUser = async () => {
    if (!APP_ID || !PROGRAM_NO) {
      console.error('APP_ID or PROGRAM_NO is not defined');
      setError('Application configuration error. Please contact support.');
      return;
    }

    if (!zkMeWidget) {
      console.error('zkMeWidget is not initialized');
      setError('KYC widget is not ready. Please try again later.');
      return;
    }

    if ('aptos' in window) {
      const wallet = window.aptos;
      try {
        const isConnected = await wallet.isConnected();
        if (!isConnected) {
          console.log('Wallet is not connected, attempting to connect...');
          await wallet.connect();
        }

        const response = await wallet.account();
        console.log('Wallet account response:', response);
        const userAccount = response.address;
        console.log('User account:', userAccount);
        
        // Check if the user has already completed KYC
        console.log('Verifying KYC status...');
        const { isGrant } = await verifyKycWithZkMeServices(
          APP_ID, 
          userAccount,
          { programNo: PROGRAM_NO }
        );
        console.log('KYC verification result:', isGrant);
        
        if (isGrant) {
          console.log('User has completed KYC, navigating to dashboard...');
          navigate(userType === 'business' ? '/business-user' : '/invest-dashboard');
        } else {
          console.log('User needs to complete KYC, launching widget...');
          zkMeWidget.launch();
        }
      } catch (error) {
        console.error('Detailed error in handleNewUser:', error);
        console.error('Error stack:', error.stack);
        setError(`Failed to verify KYC status: ${error.message}`);
      }
    } else {
      console.error('Aptos wallet not found in window object');
      setError('Aptos wallet not found. Please install the Petra wallet and try again.');
    }
    closeModal();
  };

  const openModal = (type) => {
    setUserType(type);
    setShowModal(true);
    setError(null); // Clear any previous errors
    console.log('Modal opened for: ${type}');
  };

  const closeModal = () => {
    setShowModal(false);
    setUserType('');
    setError(null); // Clear any errors when closing the modal
  };

  return (
    <div>
      <MainPage openModal={openModal} />

       {showModal && (
        <div className="modal-overlay">
          <div className="modal-content border-home"> 
            {/* Close Button */}
             <button className="close-button" onClick={closeModal}>&times;</button>

            {/* Displaying the GIF */}
            <div className="gif-container">
              <img src={gifImage} alt="Description of the GIF" />
            </div>
            <h2 className="heading-role">Welcome, {userType === 'business' ? 'Business User' : 'Investor'}!</h2>
            <p className="modal-paragraph">Are you an existing user or a new user?</p>
            <div className="modal-buttons">
              <button className="button" onClick={handleExistingUser}>Existing User</button>
              <button className="button" onClick={handleNewUser}>New User</button>
            </div>
            {error && <p className="error-message">{error}</p>}
          </div>
        </div>
      )}
    </div>
  )
}

export default UserType