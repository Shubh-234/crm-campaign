import React from 'react';
import '../styles/Pricing.css';
import { Link as RouterLink } from 'react-router-dom';

const Pricing = () => {
  return (
    <div className="pricing-section">
      <h2 className="topic">PLANS & PRICING</h2>
      <h3 className="pricing-heading">Select a Plan to Elevate Your Business</h3>
      <p className="pricing-subheading">
        Our pricing is designed to grow with you. Choose the plan that suits your needs.
      </p>
      <div className="pricing-grid">
        <div className="pricing-box">
          <h4>STARTER</h4>
          <p>Perfect for individuals and small teams getting started</p>
          <div className="price">$0</div>
          <ul>
            <li>✔ Essential CRM Features</li>
            <li>✔ Contact Management</li>
            <li>✔ Task Reminders</li>
            <li>✔ Limited Reports</li>
          </ul>
          <RouterLink to="/register">
            <button className="pricing-button">Start for Free</button>
          </RouterLink>
        </div>
        <div className="pricing-box">
          <h4>GROWTH</h4>
          <p>Ideal for growing teams looking to scale their operations</p>
          <div className="price">$39</div>
          <ul>
            <li>✔ Everything in STARTER</li>
            <li>✔ Advanced Reporting Tools</li>
            <li>✔ Sales Funnel Insights</li>
            <li>✔ Workflow Automations</li>
            <li>✔ Email Templates</li>
          </ul>
          <RouterLink to="/register">
            <button className="pricing-button">Choose Growth Plan</button>
          </RouterLink>
        </div>
        <div className="pricing-box">
          <h4>ENTERPRISE</h4>
          <p>All-in-one solution for large teams and enterprises</p>
          <div className="price">$79</div>
          <ul>
            <li>✔ Everything in GROWTH</li>
            <li>✔ Unlimited Custom Fields</li>
            <li>✔ AI-Powered Analytics</li>
            <li>✔ Dedicated Account Manager</li>
            <li>✔ Priority Support</li>
          </ul>
          <RouterLink to="/register">
            <button className="pricing-button">Explore Enterprise</button>
          </RouterLink>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
