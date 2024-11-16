import React, { useContext } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import '../styles/Dashboard.css';


const Dashboard = () => {
  const { setUser } = useContext(AuthContext);
  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    window.location.href = '/login';
  };
  return (
    <div className="dashboard">
      <nav className="dash-navbar">
        <h1 className="logo"><RouterLink to="/" id="logo-link"><a>Mini CRM</a></RouterLink></h1>
        <div>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      </nav>
      <div className="container">
      <div className="dashboard-content">
        <h2>Welcome to Your Dashboard</h2>
        <p>Select an option from the menu to get started.</p>
      </div>
      <div className="dash-links">
          <RouterLink to="/audience"><button>Create Audience</button></RouterLink>
          <RouterLink to="/campaigns"><button>Manage Campaigns</button></RouterLink>
        </div>
    </div>
    </div>
  );
};

export default Dashboard;