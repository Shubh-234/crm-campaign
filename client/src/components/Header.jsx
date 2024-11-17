import React from 'react';
import '../styles/Header.css';
import { Link as RouterLink } from 'react-router-dom';
import { Link } from 'react-scroll';

const Header = () => {
  return (
    <div className="hero-section">
      <h1 className="main-heading">Elevate Your Business Relationships</h1>
      <p className="sub-heading">Simplify your processes with our tailored solutions</p>
      <div className="button-group">
        <RouterLink to="/signup">
          <button className="primary-button">Start Free Trial</button>
        </RouterLink>
        <Link
          activeClass="active"
          to="support-section"
          spy={true}
          smooth={true}
          offset={-70}
          duration={500}
        >
          <button className="secondary-button">Discover More</button>
        </Link>
      </div>
    </div>
  );
};

export default Header;
