import React from 'react';
import '../styles/Info.css';
import { Link } from 'react-scroll';

const Info = () => {
  return (
    <div className="info-section">
      <h2>Optimize Your Business with Our CRM Software</h2>
      <p>
        Our CRM software is designed to help you build and maintain strong relationships with your customers. With features like contact management, sales automation, and customer support, you can take your business to the next level. Say goodbye to scattered data and missed opportunities. Embrace a smarter way of managing your customer relationships.
      </p>
      <Link
          activeClass="active"
          to="faq-section"
          spy={true}
          smooth={true}
          offset={-70}
          duration={500}
        ><button className="info-button">Learn More</button></Link>
    </div>
  );
};

export default Info;
