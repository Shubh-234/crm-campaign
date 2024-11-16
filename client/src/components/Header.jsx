import React from 'react';
import '../styles/Header.css';
import {Link as RouterLink} from 'react-router-dom'
import { Link } from 'react-scroll';

const Header = () => {
  return (
    <div className="header-section">
      <h1 className="main-heading">Streamline Your Customer Relationships</h1>
      <p className="sub-heading">Manage your interactions efficiently with our CRM solution</p>
      <div className="button-group">
      <RouterLink to="/register"><button className="primary-button">Get Started</button></RouterLink>
      <Link
          activeClass="active"
          to="faq-section"
          spy={true}
          smooth={true}
          offset={-70}
          duration={500}
        ><button className="secondary-button">Learn More</button></Link>
      </div>
    </div>
  );
};

export default Header;