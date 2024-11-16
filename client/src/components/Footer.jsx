import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer footer-blink">
      <div className="footer-content">
        <p>©2024 Saarthak Maini. All Rights Reserved.</p>
        <div className="social-links">
          <a href="https://www.linkedin.com/in/saarthakmaini/" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin footer-blink"></i></a>
          <a href="https://x.com/saartwts" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter footer-blink"></i></a>
          <a href="https://github.com/SaarthakMaini/" target="_blank" rel="noopener noreferrer"><i className="fab fa-github footer-blink"></i></a>
          <a href="https://saarthakmaini.hashnode.dev/" target="_blank" rel="noopener noreferrer"><i className="fab fa-blogger footer-blink"></i></a>
          <a href="https://drive.google.com/file/d/1-1Da5PTH7h7cn9PRPBMhRZLCsF756zH6/view?usp=sharing" className="resume-link footer-blink" target="_blank" rel="noopener noreferrer">View Resume</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
