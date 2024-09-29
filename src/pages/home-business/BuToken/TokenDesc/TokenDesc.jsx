import React, { useState } from 'react';
import './TokenDesc.css';

const TokenDesc = () => {
  const [tokenName, setTokenName] = useState('');
  const [tokenDescription, setTokenDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (tokenName && tokenDescription) {
      setSubmitted(true);
    }
  };

  return (
    <div className="token-desc-content">
      <h1>Create Token</h1>
      <div className="token-desc-container">
      {!submitted ? (
        <form className="token-desc" onSubmit={handleSubmit}>
          <div className="desc-group">
            <label htmlFor="tokenName">Token Name</label>
            <input
              type="text"
              id="tokenName"
              value={tokenName}
              onChange={(e) => setTokenName(e.target.value)}
              placeholder="Enter Token Name"
              required
            />
          </div>
          <div className="desc-group">
            <label htmlFor="tokenDescription">Token Description</label>
            <textarea
              id="tokenDescription"
              value={tokenDescription}
              onChange={(e) => setTokenDescription(e.target.value)}
              placeholder="Enter Token Description"
              required
            />
          </div>
          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
      ) : (
        <div className="token-summary">
          <h2>Token Summary</h2>
          <p><strong>Token Name:</strong> {tokenName}</p>
          <p><strong>Token Description:</strong> {tokenDescription}</p>
          <button className="new-token-button" onClick={() => setSubmitted(false)}>
            Create Another Token
          </button>
        </div>
      )}
      </div>
    </div>
  );
};

export default TokenDesc;
