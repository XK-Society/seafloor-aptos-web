import React, { useEffect, useRef, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './HomeInvestor.css';
import { useNavigate } from 'react-router-dom';

const defaultTokens = [
    { id: 1, name: 'Token 1', price: 'Token price', image: 'https://via.placeholder.com/50' },
    { id: 2, name: 'Token 2', price: 'Token price', image: 'https://via.placeholder.com/50' },
    { id: 3, name: 'Token 3', price: 'Token price', image: 'https://via.placeholder.com/50' },
    { id: 4, name: 'Token 4', price: 'Token price', image: 'https://via.placeholder.com/50' },
    { id: 5, name: 'Token 5', price: 'Token price', image: 'https://via.placeholder.com/50' },
    { id: 6, name: 'Token 6', price: 'Token price', image: 'https://via.placeholder.com/50' },
];

const InTokenList = ({ tokens = defaultTokens }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const slideAnim = useRef(0); // No need for animation as we use CSS for sliding
    const navigate = useNavigate();

    useEffect(() => {
        // Move slide index logic, handled by CSS for actual sliding
    }, [currentIndex]);

    const goToPrevious = () => {
        setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : tokens.length - 1));
    };

    const goToNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex < tokens.length - 1 ? prevIndex + 1 : 0));
    };

    const handleButtonPress = (token) => {
        navigate('', { state: { token } });
        console.log(`Click Details Token ${token.id}`);
    };

    return (
        <div className="container">
            <h2 className="investText">Invest in Interested Business!</h2>
            <div className="primaryContainer">
                <h3 className="tokentitle">List Of Tokens</h3>
                <div className="tokenContainer">
                    <div className="tokenSlider" style={{ transform: `translateX(${-currentIndex * 100}%)` }}>
                        {tokens.map((token) => (
                            <div key={token.id} className="tokenItem">
                                <img src={token.image} alt={token.name} className="tokenImage" />
                                <h4 className="tokenName">{token.name}</h4>
                                <p className="tokenDescription">{token.price}</p>
                                <button className="tokenButton" onClick={() => handleButtonPress(token)}>
                                    Detail
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="arrowsContainer">
                        <button className="arrowButton leftArrow" onClick={goToPrevious}>
                            <FaChevronLeft />
                        </button>
                        <button className="arrowButton rightArrow" onClick={goToNext}>
                            <FaChevronRight />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InTokenList;
