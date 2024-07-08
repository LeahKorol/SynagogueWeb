import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header>
      <div className="logo">
        <img src="logo.svg" alt="logo" />
      </div>
      <div className="hamburger-menu" onClick={toggleMenu}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
      <ul className={`nav-links ${isOpen ? 'open' : ''}`}>
        <li className="current-page"><Link to="/">בית</Link></li>
        <li><Link to="#calendar">יומן פעילות</Link></li>
        <li><Link to="/event-hall">אולם</Link></li>
        <li><Link to="/about-contact">אודות</Link></li>
        <li><Link to="/about-contact#contact-div">צור קשר</Link></li>
        <li><Link to="/contribute">תרומות</Link></li>
      </ul>
      <Link className="manager" to="/admin-login">כניסת מנהל</Link>
    </header>
  );
}

export default Header;
