import React, { useState, useEffect, useContext } from 'react';
import '../styles/Campaigns.css';
import AuthContext from '../context/AuthContext';
import CampaignStats from './CampaignStats';
import { Link as RouterLink } from 'react-router-dom';

const Campaigns = () => {
  const { user,setUser } = useContext(AuthContext);
  const [campaigns, setCampaigns] = useState([]);
  const [newCampaign, setNewCampaign] = useState({ audienceCriteria: {}, message: '' });
  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    window.location.href = '/login';
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    try {
      const res = await fetch('http://localhost:4000/campaigns', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const result = await res.json();
      setCampaigns(result);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCriteriaChange = (event) => {
    const { name, value } = event.target;
    setNewCampaign({ ...newCampaign, audienceCriteria: { ...newCampaign.audienceCriteria, [name]: value } });
  };

  const handleMessageChange = (event) => {
    const { name, value } = event.target;
    setNewCampaign({ ...newCampaign, [name]: value });
  };

  const createCampaign = async () => {
    try {
      await fetch('http://localhost:4000/campaigns', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(newCampaign),
      });
      alert('Campaign created successfully');
      fetchCampaigns();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
    <nav className="dash-navbar">
        <h1 className="logo"><RouterLink to="/" id="logo-link"><a>Mini CRM</a></RouterLink></h1>
        <div>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      </nav>
    <div className="campaigns">
      <h2>Create Campaign</h2>
      <form className="campaign-form">
        <label>
          Total Spends:
          <input type="number" name="totalSpends" onChange={handleCriteriaChange} />
        </label>
        <label>
          Max Visits:
          <input type="number" name="maxVisits" onChange={handleCriteriaChange} />
        </label>
        <label>
          Last Visit Before:
          <input type="date" name="lastVisit" onChange={handleCriteriaChange} />
        </label>
        <label>
          Message:
          <textarea name="message" onChange={handleMessageChange}></textarea>
        </label>
        <button type="button" onClick={createCampaign}>Create Campaign</button>
      </form>
      <div className="campaign-list">
        <h2>Previous Campaigns</h2>
        {campaigns.map((campaign) => (
          <div key={campaign._id} className="campaign-item">
            <p>Message: {campaign.message}</p>
            <CampaignStats campaignId={campaign._id} />
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default Campaigns;
