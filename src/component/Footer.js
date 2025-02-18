import React from "react";
import "../assets/css/Footer.css";

// use icons
const Footer = () => {
  return (
    <footer className={`footer `}>
      <div className="footer-content">
        <div className="social-links">
          <a
            href="https://github.com/RACHA011/"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/adivhaho-ratshalingwa-52060629a/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        </div>
        <div className="copyright">
          &copy; {new Date().getFullYear()} Rachadev. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
