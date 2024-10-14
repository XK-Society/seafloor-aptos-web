import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import '../InvTokenList/InvTokenList.css'
import TokenImage from '../../assets/turtle.gif';
import { AptosClient, AptosAccount, FaucetClient, TokenClient } from "aptos";
import { useNavigate } from 'react-router-dom';

const MODULE_ADDRESS = "0xdb9e0c026f8b61da781e54bbfab64de72d85fff537c0ca872648aa0cac7f3c07";
const NODE_URL = "https://fullnode.devnet.aptoslabs.com";
const FAUCET_URL = "https://faucet.devnet.aptoslabs.com";
const EXPLORER_URL = "https://explorer.aptoslabs.com/txn";

const investors = [
    { id: 1, name: 'Fishing Business ', price: '1000 APT', desc: 'Buy the CRAB Tokens'},
    { id: 2, name: 'Agriculture Business', price: '2000 APT', desc: 'Buy the CRAB Tokens' },
    { id: 3, name: 'Fruit business', price: '3000 APT', desc: 'Buy the CRAB Tokens' },
    { id: 4, name: 'Animal farm business', price: '4000 APT', desc: 'Buy the CRAB Tokens' },
];

const InvTokenList = ({ tokens = defaultTokens }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTokenName, setSelectedTokenName] = useState('');
  const [walletAddress, setWalletAddress] = useState(null);
  const [client, setClient] = useState(null);
  const [transactionHash, setTransactionHash] = useState('');
  // const slideAnim = useRef(0);
  const navigate = useNavigate();

  useEffect(() => {
      const initializeAptos = async () => {
          if ("aptos" in window) {
              const aptosWallet = window.aptos;
              try {
                  const response = await aptosWallet.connect();
                  setWalletAddress(response.address);
                  const newClient = new AptosClient(NODE_URL);
                  setClient(newClient);
              } catch (error) {
                  console.error("Failed to connect to Aptos wallet:", error);
              }
          }
      };

      initializeAptos();
  }, []);

  const goToPrevious = () => {
      setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : tokens.length - 1));
  };

  const goToNext = () => {
      setCurrentIndex((prevIndex) => (prevIndex < tokens.length - 1 ? prevIndex + 1 : 0));
  };

  const handleButtonPress = (token) => {
      setSelectedTokenName(token.name);
      setModalVisible(true);
  };

  const handleCloseModal = () => {
      setModalVisible(false);
      setTransactionHash(''); // Reset transaction hash when closing the modal
  };

  const handleConfirmPurchase = async () => {
      if (!client || !walletAddress) {
          console.error("Wallet not connected");
          return;
      }

      try {
          const payload = {
              type: "entry_function_payload",
              function: `${MODULE_ADDRESS}::crab_token::mint`,
              type_arguments: [],
              arguments: [walletAddress, "1000000000"] // Minting 10 CRAB tokens (assuming 8 decimal places)
          };

          const pendingTransaction = await window.aptos.signAndSubmitTransaction(payload);
          await client.waitForTransaction(pendingTransaction.hash);
          setTransactionHash(pendingTransaction.hash);
          console.log("CRAB tokens minted successfully");
      } catch (error) {
          console.error("Failed to mint CRAB tokens:", error);
      }
  };

  const openExplorerLink = () => {
      if (transactionHash) {
          window.open(`${EXPLORER_URL}/${transactionHash}`, '_blank');
      }
  };


  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % investors.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + investors.length) % investors.length);
  };

  return (
    <div className="slider-container">
      <div className="slider-content">
        {investors.map((investor, index) => (
          <div
            key={investor.name}
            className={`slider-item ${index === currentIndex ? 'active' : ''}`}
            style={{
              transform: `translateX(${(index - currentIndex) * 100}%)`,
              opacity: index === currentIndex ? 1 : 0,
              transition: 'transform 0.5s ease, opacity 0.5s ease',
            }}
          >
            <div className="business-info">
            <img src={TokenImage} alt={investor.name} className="business-image" />
            <h2>{investor.name}</h2>
            <p>{investor.desc}</p>
            <p>{investor.price}</p>
            </div>
            <button className="tokenButton" onClick={() => handleButtonPress(token)}>
            Buy Tokens
            </button>
          </div>
        ))}
      </div>
      <button onClick={prevSlide} className="slider-button prev">
        <ChevronLeft size={24} />
      </button>
      <button onClick={nextSlide} className="slider-button next">
        <ChevronRight size={24} />
      </button>

      {modalVisible && (
                <div className="modalOverlay">
                    <div className="modalContent">
                        {!transactionHash ? (
                            <>
                                <h3 className="purchased-noty">Buy {selectedTokenName}?</h3>
                                <div className="modalButtons">
                                    <button className="modalButton" onClick={handleConfirmPurchase}>
                                        Confirm
                                    </button>
                                    <button className="modalButton closeButton" onClick={handleCloseModal}>
                                        Cancel
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <h3 className="purchased-noty">Yeay! You received {selectedTokenName}.</h3>
                                <div className="modalButtons">
                                    <button className="modalButton" onClick={openExplorerLink}>
                                        View Transaction
                                    </button>
                                    <button className="modalButton closeButton" onClick={handleCloseModal}>
                                        Close
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
    </div>
    
  );
};

export default InvTokenList;