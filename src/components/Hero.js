import React from 'react';
import PropTypes from 'prop-types';

function Hero({ title, welcomeMessage, description }) {
  return (
    <section id="hero" className="hero">
      <div className="content">
        <h1>{title}</h1>
        <p>
          {welcomeMessage}
          <br />
          {description}
        </p>
        <div className="buttons">
          {/* Buttons or links to other parts of the website can be added here */}
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
