import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import backgroundImage from '../1.jfif';

function Hero({ title, welcomeMessage, description }) {
  const heroStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  };

  return (
    <section id="hero" className="hero" style={heroStyle}>
      <div className="content">
        <h1>{title}</h1>
        <p>
          {welcomeMessage}
          <br />
          {description}
        </p>
        <div className="buttons">
          <Link to="/about-contact">עוד קצת עלינו</Link>
        </div>
      </div>
    </section>
  );
}

Hero.propTypes = {
  title: PropTypes.string,
  welcomeMessage: PropTypes.string,
  description: PropTypes.string,
};

Hero.defaultProps = {
  title: 'שויתי ה\' לנגדי תמיד',
  welcomeMessage: 'ברוכים הבאים לאתר של קהילת פאתי מזרח.',
  description: 'כאן תמצאו מידע על זמני תפילות, אירועים קרובים ושיעורי תורה',
};

export default Hero;