import React from 'react';
import '../styles/Features.css';

const Features = () => {
  return (
    <div className="highlights-section">
      <h2 className="topic">DISCOVER OUR EDGE</h2>
      <h3 className="highlights-heading">Revolutionize Your Workflow with Smart Features</h3>
      <div className="highlights-columns">
        <div className="highlight-item">
          <div className="icon-container">
            <i className="fas fa-user-friends"></i>
          </div>
          <h4>Personalized Customer Support</h4>
          <p>Deliver tailored support experiences with advanced tools and detailed customer profiles.</p>
        </div>
        <div className="highlight-item">
          <div className="icon-container">
            <i className="fas fa-chart-line"></i>
          </div>
          <h4>Real-Time Progress Tracking</h4>
          <p>Monitor tasks and campaigns with real-time updates and instant notifications.</p>
        </div>
        <div className="highlight-item">
          <div className="icon-container">
            <i className="fas fa-cogs"></i>
          </div>
          <h4>Customizable Dashboards</h4>
          <p>Design your workspace to fit your needs with flexible and intuitive dashboards.</p>
        </div>
        <div className="highlight-item">
          <div className="icon-container">
            <i className="fas fa-lock"></i>
          </div>
          <h4>Advanced Data Security</h4>
          <p>Keep your information safe with enterprise-grade encryption and secure storage solutions.</p>
        </div>
      </div>
    </div>
  );
};

export default Features;
