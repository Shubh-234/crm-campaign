import React from 'react';
import '../styles/Pricing.css';
import {Link as RouterLink} from 'react-router-dom'

const Pricing = () => {
  return (
    <div className="pricing-section">
      <h2 className="topic">PRICING</h2>
      <h3 className="pricing-heading">Choose the Right Plan for Your Business</h3>
      <p className="pricing-subheading">
        Select a plan that fits your needs and helps you grow your business
      </p>
      <div className="pricing-grid">
        <div className="pricing-box">
          <h4>FREE</h4>
          <p>Get started with our basic CRM features for free</p>
          <div className="price">$0</div>
          <ul>
            <li>✔ Contact Management</li>
            <li>✔ Email Integration</li>
            <li>✔ Task Tracking</li>
            <li>✔ Basic Reporting</li>
          </ul>
          <RouterLink to="/register"><button className="pricing-button">Continue with Free</button></RouterLink>
        </div>
        <div className="pricing-box">
          <h4>BASIC</h4>
          <p>Upgrade to unlock more advanced CRM capabilities</p>
          <div className="price">$29</div>
          <ul>
            <li>✔ All features of FREE plan</li>
            <li>✔ Customizable Dashboards</li>
            <li>✔ Sales Pipeline Management</li>
            <li>✔ Email Campaigns</li>
            <li>✔ Advanced Reporting</li>
          </ul>
          <RouterLink to="/register"><button className="pricing-button">Try the Basic plan</button></RouterLink>
        </div>
        <div className="pricing-box">
          <h4>PRO</h4>
          <p>Experience the full power of our CRM solution for your business</p>
          <div className="price">$59</div>
          <ul>
            <li>✔ All features of BASIC plan</li>
            <li>✔ Automation Workflows</li>
            <li>✔ Custom Fields and Tags</li>
            <li>✔ Integration with Third-Party Apps</li>
            <li>✔ Dedicated Customer Support</li>
          </ul>
          <RouterLink to="/register"><button className="pricing-button">Try the PRO plan</button></RouterLink>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
