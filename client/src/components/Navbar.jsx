import React from 'react';
import '../styles/Navbar.css';
import { Link, animateScroll as scroll } from 'react-scroll';
import {Link as RouterLink} from 'react-router-dom'

const Navbar = () => {
  const scrollToTop = () => {
    scroll.scrollToTop();
  };
  return (
    <nav className="navbar">
      <h1 className="logo">Mini CRM</h1>
      <ul className="nav-links">
        <li><Link
          activeClass="active"
          spy={true}
          smooth={true}
          offset={-70}
          duration={500}
          onClick={scrollToTop}
        >Home</Link></li>
        <li><Link
          activeClass="active"
          to="features-section"
          spy={true}
          smooth={true}
          offset={-70}
          duration={500}
        >Features</Link></li>
        <li><Link
          activeClass="active"
          to="pricing-section"
          spy={true}
          smooth={true}
          offset={-70}
          duration={500}
        >Pricing</Link></li>
        <li><Link
          activeClass="active"
          to="faq-section"
          spy={true}
          smooth={true}
          offset={-70}
          duration={500}
        >FAQ</Link></li>
        <li><Link
          activeClass="active"
          to="footer"
          spy={true}
          smooth={true}
          offset={-70}
          duration={500}
        >Contact Us</Link></li>
      </ul>
      <div className="auth-buttons">
      <RouterLink to="/login"><button>Login</button></RouterLink>
      <RouterLink to="/register"><button>Register</button></RouterLink>
      </div>
    </nav>
  );
};

export default Navbar;