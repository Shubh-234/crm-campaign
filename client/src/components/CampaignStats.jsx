import React, { useState, useEffect } from 'react';
import '../styles/CampaignStats.css'

const CampaignStats = ({ campaignId }) => {
  const [stats, setStats] = useState({ audienceSize: 0, sent: 0, failed: 0 });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await fetch(`http://localhost:4000/campaigns/${campaignId}/stats`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const result = await res.json();
      setStats(result);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="campaign-stats">
      <p>Audience Size: {stats.audienceSize}</p>
      <p>Sent: {stats.sent}</p>
      <p>Failed: {stats.failed}</p>
    </div>
  );
};

export default CampaignStats;
