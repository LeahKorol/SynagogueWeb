import React from 'react';
import './MapEmbed.css';

const MapEmbed = () => {
  return (
    <div className="map-container">
      <div className="map-frame">
        <iframe
          title="Embedded Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3390.1400665742763!2d35.256190426084004!3d31.821178432221753!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15032a35d103adb1%3A0x190c41dc4d2f5665!2z16TXkNeq15kg157Xlteo15c!5e0!3m2!1siw!2sil!4v1720687339505!5m2!1siw!2sil"
          className="map-iframe"
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
      
      <div className="social-networks">
        <h3>רשתות חברתיות</h3>
        <div>
          <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-youtube"></i>
          </a>
          <a href="https://he-il.facebook.com/public/Paatey-Mizrach/" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-facebook"></i>
          </a>
          <a href="https://www.whatsapp.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-whatsapp"></i>
          </a>
        </div>
      </div>
      
      <div className="footer">
        <p>© כל הזכויות שמורות לבית הכנסת "פאתי מזרח"</p>
        <p>
          Powered by
          <a href="https://www.hebcal.com/" target="_blank" rel="noopener noreferrer"> Hebcal.com </a> 
          for Hebrew calendar functionalities.
       </p>
      </div>
    </div>
  );
};

export default MapEmbed;
