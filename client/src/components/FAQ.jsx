import React from 'react';
import '../styles/FAQ.css';

const FAQ = () => {
  return (
    <div className="faq-section">
      <div className="left-section">
        <h2>Common questions</h2>
        <p>Here are some of the most common questions that we get.</p>
      </div>
      <div className="right-section">
        <div className="faq-item">
          <h3>What is CRM?</h3>
          <p>CRM stands for Customer Relationship Management. It is a technology for managing all your company's relationships and interactions with customers and potential customers.</p>
        </div>
        <div className="faq-item">
          <h3>Why is CRM important for businesses?</h3>
          <p>CRM is important for businesses as it helps in improving customer relationships, increasing sales, streamlining processes, and enhancing customer service.</p>
        </div>
        <div className="faq-item">
          <h3>How can CRM benefit my business?</h3>
          <p>CRM can benefit your business by providing a centralized database for customer information, automating tasks, improving communication, and analyzing customer data for better decision-making.</p>
        </div>
        <div className="faq-item">
          <h3>Is CRM only for large enterprises?</h3>
          <p>No, CRM solutions are available for businesses of all sizes, from small startups to large enterprises. There are options that can be tailored to fit the specific needs and budget of any business.</p>
        </div>
        <div className="faq-item">
          <h3>How do I choose the right CRM system for my business?</h3>
          <p>To choose the right CRM system for your business, consider factors such as your business size, industry requirements, budget, integration capabilities, ease of use, and scalability.</p>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
