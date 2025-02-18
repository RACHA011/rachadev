import React from "react";
import "../assets/css/Navbar.css"; // Import the CSS file
import icon from "../assets/images/icon.png";
import rachadevdark from "../assets/images/rachadevdark.png";
// import { ThemeContext } from "../router/AppRouter";

const Navbar = () => {
  // const { theme } = useContext(ThemeContext);
const theme  = "light";
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <a href="/" className="navbar-logo-icon">
          <img
            src={theme === "light" ? icon : rachadevdark}
            alt="Logo"
            className="logo"
          />
          <span className="logo-text">Ratshalingwa Adivhaho</span>
        </a>
      </div>
      <ul className="navbar-links">
        <li>
          <a href="/" className="nav-link">
            Home
          </a>
        </li>
        <li>
          <a href="/projects" className="nav-link">
            Projects
          </a>
        </li>
        <li>
          <a href="/resume" className="nav-link">
            Resume
          </a>
        </li>
        <li>
          <a href="/contact" className="nav-link">
            Contact
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
