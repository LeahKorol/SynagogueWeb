import React, { useEffect } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import Header from '../Header/Header';
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
    }, [location]);

    const weekdayTimes = {
        shacharit: "06:15",
        mincha_gedola: "13:15",
        mincha: "19:33",
        arvit_1: "20:08",
        arvit_2: "21:50",
    };

    const shabbatTimes = {
        mincha_erev_shabbat: "19:08",
        arvit_shabbat: "19:38",
        shacharit_shabbat: "08:30",
        mincha_gedola_shבת: "12:30",
        mincha_ketana_shבת: "19:10",
    };

    return (
        <main>
          <HelmetProvider>
            <Helmet>
              <title>פאתי מזרח | דף בית</title>
            </Helmet>
    
            <Header />
            <Hero />
            <PrayerTimes weekdayTimes={weekdayTimes} shabbatTimes={shabbatTimes} />
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
