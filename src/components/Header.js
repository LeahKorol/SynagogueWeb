import React, { useState } from 'react';
import '../App.css';

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header>
      <div className="logo">
        {/* <img src="" alt="" /> */}
      </div>
      <div className="hamburger-menu" onClick={toggleMenu}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
      <ul className={`nav-links ${isOpen ? 'open' : ''}`}>
        <li className="current-page"><a href="#hero">בית</a></li>
        <li><a href="#calendar">יומן פעילות</a></li>
        <li><a href="event-hall.html">אולם</a></li>
        <li><a href="about-contact.html">אודות</a></li>
        <li><a href="about-contact.html#contact-div">צור קשר</a></li>
        <li><a href="contribute.html">תרומות</a></li>
      </ul>
      <a className="manager" href="admin-login.html">כניסת מנהל</a>
    </header>
  );
}

export default Header;
