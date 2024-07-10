import React from 'react';
import './MapEmbed.css'

const MapEmbed = () => {
  return (
    <div className="map-container">
      <div className="map-frame">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3163.1591252762!2d-122.08424968469284!3d37.42206577982565!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fb5c5b3c5db57%3A0xe321b4dcba85a66b!2sGoogleplex!5e0!3m2!1sen!2sus!4v1620815107174!5m2!1sen!2sus"
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
        <p> © כל הזכויות שמורות לבית הכנסת "פאתי מזרח" </p>
      </div>
    </div>
  );
};

export default MapEmbed;
