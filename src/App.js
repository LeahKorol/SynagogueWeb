import React, { useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import PrayerTimes from './components/PrayerTimes';
import LessonsActivities from './components/LessonsActivities';
import Announcements from './components/Announcements';
import MapEmbed from './components/MapEmbed';
import DefibrillatorInfo from './components/DefibrillatorInfo';
import AnnouncementForm from './components/AnnouncementForm';


function App() {
  const [announcements, setAnnouncements] = useState([]);

  const handleFormSubmit = (formData) => {
    setAnnouncements([...announcements, formData]);
    console.log('New announcement added:', formData);
  };


  // זמני תפילות ליום חול
  const weekdayTimes = {
    shacharit: "06:15",
    mincha_gedola: "13:15",
    mincha: "19:33",
    arvit_1: "20:08",
    arvit_2: "21:50",
  };

  // זמני תפילות לשבת
  const shabbatTimes = {
    mincha_erev_shabbat: "19:08",
    arvit_shabbat: "19:38",
    shacharit_shabbat: "08:30",
    mincha_gedola_shabbat: "12:30",
    mincha_ketana_shabbat: "19:10",
  };

  return (
    <HelmetProvider>
      <Router>
        <div className="App">
          <Helmet>
            <title>פאתי מזרח | דף בית</title>
          </Helmet>
          <Header />
          <Hero />
          <PrayerTimes weekdayTimes={weekdayTimes} shabbatTimes={shabbatTimes} />
          <LessonsActivities />
          <DefibrillatorInfo />
          <Announcements />
          <AnnouncementForm onSubmit={handleFormSubmit} />
          <MapEmbed />
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;
