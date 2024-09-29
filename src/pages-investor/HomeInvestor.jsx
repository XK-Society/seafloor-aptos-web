import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getHeaders } from '../appUtils';
import { AptosClient, AptosAccount, FaucetClient, HexString } from 'aptos';
import { ethers } from 'ethers';
import './HomeInvestor.css';

// ABI for the SANDToken contract
const SANDTokenABI = [
    "function transfer(address to, uint256 amount) public returns (bool)",
    "function balanceOf(address account) public view returns (uint256)",
    "function decimals() public view returns (uint8)"
];

const Investor = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { selectedCategory } = location.state || {};
    const [wallets, setWallets] = useState([]);

    useEffect(() => {
        const fetchWallets = async () => {
            if (selectedCategory === 'Maschain') {
                try {
                    const response = await fetch('https://service-testnet.maschain.com/api/wallet/wallet?type=2', {
                        method: 'GET',
                        headers: getHeaders(),
                    });

                    const data = await response.json();

                    if (data.status === 200) {
                        setWallets(data.result);
                    } else {
                        console.error('Failed to fetch wallets:', data);
                    }
                } catch (error) {
                    console.error('Error fetching wallets:', error);
                }
            }
        };

        fetchWallets();
    }, [selectedCategory]);

    const handleButtonClick = async (walletAddress) => {
        if (selectedCategory === 'Maschain') {
            const amount = prompt("Enter the amount to invest:");

            if (amount) {
                try {
                    const response = await fetch('https://service-testnet.maschain.com/api/token/token-transfer', {
                        method: 'POST',
                        headers: getHeaders(),
                        body: JSON.stringify({
                            wallet_address: walletAddress,
                            to: "0xFB033caae1eb318F1821204150A57fB7671c86Ba",
                            amount: amount,
                            contract_address: "0xF5757012879C259A1c78f6eE6D60f1d13B42f4f5",
                            callback_url: "http://localhost:5173/invest-connect-message"
                        })
                    });

                    const data = await response.json();

                    if (data.status === 200) {
                        const { result } = data;
                        console.log('Transaction Result:', result);
                        navigate('/invest-connect-message', { state: { status: result.status, message: 'Transaction Successful' } });
                    } else {
                        console.error('Transaction failed:', data);
                        navigate('/invest-connect-message', { state: { status: 'failed', message: 'Transaction Failed' } });
                    }
                } catch (error) {
                    console.error('Error in transaction:', error);
                    navigate('/invest-connect-message', { state: { status: 'failed', message: 'Transaction Failed due to an error' } });
                }
            } else {
                console.log('Transaction cancelled.');
            }
        } else if (walletAddress === 'Fishing Business') {
            try {
                const client = new AptosClient('https://fullnode.devnet.aptoslabs.com/v1');
                const faucetClient = new FaucetClient('https://fullnode.devnet.aptoslabs.com/v1', 'https://faucet.devnet.aptoslabs.com');

                const account = new AptosAccount();
                await faucetClient.fundAccount(account.address(), 100_000_000);

                const payload = {
                    type: "entry_function_payload",
                    function: "0x85c32608321dad0f1021d9ba4af303e8e05951c98fce73217a658fb9c7ff8685::sand_token::transfer",
                    type_arguments: [],
                    arguments: [
                        "0xb1c52baf095e058aa36ec4c6e9bf341a9871e72fc7338946f02df78c3d9bf139",
                        "1000"
                    ]
                };

                const txnRequest = await client.generateTransaction(account.address(), payload);
                const signedTxn = await client.signTransaction(account, txnRequest);
                const transactionRes = await client.submitTransaction(signedTxn);
                await client.waitForTransaction(transactionRes.hash);

                console.log(`Transaction successful! Hash: ${transactionRes.hash}`);
                
                const explorerLink = `https://explorer.aptoslabs.com/txn/${transactionRes.hash}?network=devnet`;
                
                alert(`Investment successful!\nTransaction Hash: ${transactionRes.hash}\nView on Explorer: ${explorerLink}`);
                
                navigate('/invest-connect-message', { 
                    state: { 
                        status: 'success', 
                        message: 'Transaction Successful',
                        txHash: transactionRes.hash,
                        explorerLink: explorerLink
                    } 
                });
            } catch (error) {
                console.error('Transaction failed:', error);
                alert('Investment failed. Please try again.');
                navigate('/invest-connect-message', { 
                    state: { 
                        status: 'failed', 
                        message: 'Transaction Failed'
                    } 
                });
            }
        } else if (walletAddress === 'Wheat Business') {
            try {
                // Connect to the Ethereum network (replace with your provider URL)
                const provider = new ethers.providers.JsonRpcProvider('');
                
                // You need the private key of the sender account (0x1AB67c4ac117F3c850D5A93784B7701Cc5816387)
                // WARNING: Never expose private keys in frontend code. This should be handled securely, preferably on a backend.
                const privateKey = '';
                const signer = new ethers.Wallet(privateKey, provider);

                // SANDToken contract address
                const contractAddress = '0xfa8e2568a20de2e998332fcf2793549ab56aee52';
                
                // Create contract instance
                const sandTokenContract = new ethers.Contract(contractAddress, SANDTokenABI, signer);

                // Get the number of decimals for the token
                const decimals = await sandTokenContract.decimals();

                // Amount to transfer (1000 SAND tokens)
                const amount = ethers.utils.parseUnits('1000', decimals);

                // Recipient address
                const recipientAddress = '0x64C376C1dc001FeDc5b0420A9be569c5B75F8d6D';

                // Check balance before transfer
                const balance = await sandTokenContract.balanceOf(signer.address);
                if (balance.lt(amount)) {
                    throw new Error("Insufficient balance");
                }

                // Perform the transfer
                const tx = await sandTokenContract.transfer(recipientAddress, amount);
                
                // Wait for the transaction to be mined
                const receipt = await tx.wait();

                console.log(`Transaction successful! Hash: ${receipt.transactionHash}`);
                
                const explorerLink = `https://etherscan.io/tx/${receipt.transactionHash}`;
                
                alert(`Investment successful!\nTransferred 1000 SAND tokens\nTransaction Hash: ${receipt.transactionHash}\nView on Explorer: ${explorerLink}`);
                
                navigate('/invest-connect-message', { 
                    state: { 
                        status: 'success', 
                        message: 'SANDToken Transfer Successful (1000 SAND)',
                        txHash: receipt.transactionHash,
                        explorerLink: explorerLink
                    } 
                });
            } catch (error) {
                console.error('Transaction failed:', error);
                alert(`Investment failed. Error: ${error.message}`);
                navigate('/invest-connect-message', { 
                    state: { 
                        status: 'failed', 
                        message: `SANDToken Transfer Failed: ${error.message}`
                    } 
                });
            }
        } else {
            navigate('/invest-connect-message');
        }
    };

    return (
        <div className="investor-container">
            <h2>Invest Now!</h2>
            {selectedCategory && <p>Selected Category: {selectedCategory}</p>}

            <div className="boxes-container">
                {selectedCategory === 'Maschain' && wallets.length > 0 ? (
                    wallets.map((wallet) => (
                        <div key={wallet.id} className="box">
                            <button
                                className="circle-button"
                                onClick={() => handleButtonClick(wallet.address)}
                            >
                                +
                            </button>
                            {wallet.name}
                        </div>
                    ))
                ) : (
                    <>
                        <div className="box">
                            <button
                                className="circle-button"
                                onClick={() => handleButtonClick('Fishing Business')}
                            >
                                +
                            </button>
                            Fishing Business
                        </div>
                        <div className="box">
                            <button
                                className="circle-button"
                                onClick={() => handleButtonClick('Wheat Business')}
                            >
                                +
                            </button>
                            Wheat Business
                        </div>
                        <div className="box">
                            <button
                                className="circle-button"
                                onClick={() => handleButtonClick('Crops Business')}
                            >
                                +
                            </button>
                            Crops Business
                        </div>
                        <div className="box">
                            <button
                                className="circle-button"
                                onClick={() => handleButtonClick('Plant Business')}
                            >
                                +
                            </button>
                            Plant Business
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default Investor;