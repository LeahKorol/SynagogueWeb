import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';

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
        <li><NavLink to="/">בית</NavLink></li>
        <li><NavLink to="/" state={{ scrollTo: 'calendar' }}>יומן פעילות</NavLink></li>
        <li><NavLink to="/event-hall">אולם</NavLink></li>
        <li><NavLink to="/about-contact">אודות</NavLink></li>
        <li><NavLink to="/about-contact#contact-div">צור קשר</NavLink></li>
        <li><NavLink to="/contribute">תרומות</NavLink></li>
      </ul>
      <NavLink className="manager" to="/admin-login">כניסת מנהל</NavLink>
    </header>
  );
}

export default Header;
