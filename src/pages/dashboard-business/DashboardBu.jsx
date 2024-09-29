import React from'react';
import'./DashboardBu.css';
import { FaArrowRight } from 'react-icons/fa';

const DashboardBu = () => {
  return (
    <div className="dashboard">
      <h1 className='dashboard-title'>Dashboard</h1>
      <div className="grid-container">
        <div className="grid-item">
          <h2>Maschain</h2>
          <p className="dashboard-description">
            Small funds and immediate
          </p>
          <button className="arrow-button"><FaArrowRight /></button>
        </div>
        <div className="grid-item">
          <h2>Aptos</h2>
          <p className="dashboard-description">
            Medium funds and immediate
          </p>
          <button className="arrow-button"><FaArrowRight /></button>
        </div>
        <div className="grid-item">
          <h2>Ethereum</h2>
          <p className="dashboard-description">
            Large funds and longer
          </p>
          <button className="arrow-button"><FaArrowRight /></button>
        </div>
      </div></div>
  );
};

export default DashboardBu;
