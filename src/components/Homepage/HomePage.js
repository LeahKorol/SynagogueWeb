import React, { useEffect } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import AppHeader from '../Header/Header';
import Hero from './Hero';
import PrayerTimes from './PrayerTimes';
import LessonsActivities from './LessonsActivities';
import Calendar from './Calendar';
import Announcements from './Announcements';
import MapEmbed from '../Footer/MapEmbed';

function HomePage() {

    const location = useLocation();

    useEffect(() => {
      if (location.state && location.state.scrollTo) {
        const element = document.getElementById(location.state.scrollTo);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });

    return (
        <main>
          <HelmetProvider>
            <Helmet>
              <title>פאתי מזרח | דף בית</title>
            </Helmet>
    
            <AppHeader />
            <Hero />
            <PrayerTimes />
            <LessonsActivities />
            <div id="calendar">
              <Calendar />
            </div>
            
            <Announcements />
            <div className="App">
              <MapEmbed />
            </div>
          </HelmetProvider>
        </main>
      );
}

export default HomePage;
