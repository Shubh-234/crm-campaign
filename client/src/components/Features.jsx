import React from 'react';
import '../styles/Features.css';

const Features = () => {
  return (
    <div className="features-section">
      <h2 className="topic">FEATURES</h2>
      <h3 className="features-heading">Powerful Features to Boost Your Business</h3>
      <p className="features-subheading">
        Discover the key features that will streamline your workflow and drive growth
      </p>
      <div className="features-grid">
        <div className="feature-box">
          <h4>Contact Management</h4>
          <p>Easily organize and access all your contacts in one place</p>
        </div>
        <div className="feature-box">
          <h4>Sales Pipeline Tracking</h4>
          <p>Visualize and manage your sales pipeline efficiently</p>
        </div>
        <div className="feature-box">
          <h4>Task Automation</h4>
          <p>Automate repetitive tasks to save time and increase productivity</p>
        </div>
        <div className="feature-box">
          <h4>Reporting and Analytics</h4>
          <p>Generate detailed reports and gain valuable insights with analytics tools</p>
        </div>
      </div>
    </div>
  );
};

export default Features;
