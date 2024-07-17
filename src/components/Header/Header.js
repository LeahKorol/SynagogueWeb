import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import './Header.css';
import { getCurrentJerusalemGregDate } from '../../utils/JerusalemDate';
import { formatCurrentJerusalemHebrewDate, getParasha, getEventsDescriptions } from '../../utils/dateFunctions';
import logo from '../../images/logo.png';
function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  const [dateInfo, setDateInfo] = useState({
    hebrewDate: '',
    gregorianDate: '',
    parasha: '',
    specialDay: '',
    specialDayEmoji:''
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
    const formatDate = Intl.DateTimeFormat('en-GB').format(getCurrentJerusalemGregDate());
    const hebrewDate = formatCurrentJerusalemHebrewDate();
    const eventsDesc = getEventsDescriptions();

    const specialDayEvent = eventsDesc.find(desc => !desc.description.includes('פרשת'));
    const parasha = getParasha();
    let parashaName = 'פרשת ' + parasha.parashaName;
    if (parasha.chag) {
      parashaName = 'שבת ' + parasha.parashaName;
    }

    setDateInfo({
      hebrewDate: hebrewDate,
      gregorianDate: formatDate,
      parasha: parashaName,
      specialDay: specialDayEvent ? specialDayEvent.description : '',
      specialDayEmoji: specialDayEvent ? specialDayEvent.emoji :''
    });
  };

  const isActive = (path, section = null) => {
    if (section) {
      return location.pathname === path && activeSection === section;
    }
    return location.pathname === path;
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
          <img src={logo} alt="logo" />
        </div>
        <div className="center-content">
          <ul className={`nav-links ${isOpen ? 'open' : ''}`}>
            <li><NavLink to="/" className={isActive('/') ? 'active' : ''}>בית</NavLink></li>
            <li><a href="/#calendar" onClick={handleCalendarClick} className={isActive('/', 'calendar') ? 'active' : ''}>יומן פעילות</a></li>
            <li><NavLink to="/event-hall" className={isActive('/event-hall') ? 'active' : ''}>אולם</NavLink></li>
            <li><NavLink to="/about-contact" className={isActive('/about-contact') ? 'active' : ''}>אודות</NavLink></li>
            <li><a href="/about-contact?section=contact" onClick={handleContactClick} className={isActive('/about-contact', 'contact') ? 'active' : ''}>צור קשר</a></li>
            <li><NavLink to="/contributes" className={isActive('/contributes') ? 'active' : ''}>תרומות</NavLink></li>
          </ul>
          <div className="date-info">
            <i className="fas fa-calendar"></i> {dateInfo.hebrewDate} - {' '}
            {dateInfo.gregorianDate} |{' '}
            <i className="fas fa-scroll"></i> {dateInfo.parasha} 
            {dateInfo.specialDay && (
              <>
                  {' '}|<span>{dateInfo.specialDayEmoji}</span> {dateInfo.specialDay}
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
