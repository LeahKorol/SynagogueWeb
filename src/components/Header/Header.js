import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import './Header.css';
import { format } from 'date-fns';
import { he } from 'date-fns/locale';
import { HebrewCalendar, HDate, Location } from '@hebcal/core';

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  const [dateInfo, setDateInfo] = useState({
    hebrewDate: '',
    gregorianDate: '',
    parasha: '',
    specialDay: ''
  });
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    setActiveSection(searchParams.get('section'));

    if (searchParams.get('section') === 'calendar') {
      const calendarElement = document.getElementById('calendar');
      if (calendarElement) {
        calendarElement.scrollIntoView({ behavior: 'smooth' });
      }
    }

    if (searchParams.get('section') === 'contact') {
      const contactElement = document.getElementById('contact');
      if (contactElement) {
        contactElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  useEffect(() => {
    updateDateInfo();
    const timer = setInterval(updateDateInfo, 60000); // Update every minute
    return () => clearInterval(timer);
  }, []);

  const updateDateInfo = () => {
    const now = new Date();
    const hebrewDate = new HDate(now);
    const location = Location.lookup('Jerusalem');
    const events = HebrewCalendar.calendar({
      start: now,
      end: now,
      sedrot: true,
      location: location,
    });

    const parashaEvent = events.find(ev => ev.getDesc().includes('Parashat'));
    const specialDayEvent = events.find(ev => ev.getDesc() && !ev.getDesc().includes('Parashat'));

    setDateInfo({
      hebrewDate: hebrewDate.renderGematriya(),
      gregorianDate: format(now, 'dd.MM.yyyy', { locale: he }),
      parasha: parashaEvent ? parashaEvent.render('he') : '',
      specialDay: specialDayEvent ? specialDayEvent.render('he') : ''
    });
  };

  const isActive = (path, section = null) => {
    if (section) {
      return location.pathname === path && activeSection === section;
    }
    if (location.pathname === path) {
      // If we're on the homepage and a section is active, return false
      if (path === '/' && activeSection) {
        return false;
      }
      return true;
    }
    return false;
  };

  const handleCalendarClick = (e) => {
    e.preventDefault();
    setActiveSection('calendar');
    navigate('/?section=calendar');
    const calendarElement = document.getElementById('calendar');
    if (calendarElement) {
      calendarElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleContactClick = (e) => {
    e.preventDefault();
    setActiveSection('contact');
    navigate('/about-contact?section=contact');
    const contactElement = document.getElementById('contact');
    if (contactElement) {
      contactElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header>
      <div className="header-content">
        <div className="logo">
          <img src="logo.svg" alt="logo" />
        </div>
        <div className="center-content">
        <ul className={`nav-links ${isOpen ? 'open' : ''}`}>
          <li>
            <NavLink to="/" className={({ isActive }) => 
                isActive && !activeSection ? 'active' : ''
              }
            >
              בית
            </NavLink>
          </li>
          <li>
            <a href="/#calendar" 
              onClick={handleCalendarClick} 
              className={isActive('/', 'calendar') ? 'active' : ''}
            >
              יומן פעילות
            </a>
          </li>
          <li>
            <NavLink to="/event-hall" className={({ isActive }) => 
              isActive ? 'active' : ''}
            >
              אולם
            </NavLink>
          </li>
          <li>
            <NavLink to="/about-contact" className={({ isActive }) => 
                isActive && !activeSection ? 'active' : ''
              }
            >
              אודות
            </NavLink>
          </li>
          <li>
            <a href="/about-contact?section=contact" onClick={handleContactClick} 
              className={isActive('/about-contact', 'contact') ? 'active' : ''}
            >
              צור קשר
            </a>
          </li>
          <li>
            <NavLink to="/contributes" className={({ isActive }) => 
              isActive ? 'active' : ''
            }
            >
              תרומות
            </NavLink>
          </li>
        </ul>
          <div className="date-info">
            <i className="fas fa-calendar"></i> {dateInfo.hebrewDate} - {' '}
            {dateInfo.gregorianDate} |{' '}
            <i className="fas fa-scroll"></i> {dateInfo.parasha} |{' '}
            {dateInfo.specialDay && (
              <>
                <i className="fas fa-star"></i> {dateInfo.specialDay}
              </>
            )}
          </div>
        </div>
        <NavLink className="manager" to="/admin-login">כניסת מנהל</NavLink>
      </div>
      <div className="hamburger-menu" onClick={toggleMenu}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
    </header>
  );
}

export default Header;
