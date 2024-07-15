import React, { useEffect } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import Header from '../Header/Header';
import MapEmbed from '../Footer/MapEmbed';
import About from './About';
import Contact from './Contact';

function AboutContact() {
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.scrollTo) {
      const element = document.getElementById(location.state.scrollTo);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  return (
    <div>
      <main>
        <HelmetProvider>
          <Helmet>
            <title>פאתי מזרח | אודות</title>
          </Helmet>

          <Header />

          <About />

          <div id="contact-section" className="contact">
            <Contact />
          </div>

          <div className="App">
            <MapEmbed />
          </div>
        </HelmetProvider>
      </main>
    </div>
  );
}

export default AboutContact;
