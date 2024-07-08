import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import PrayerTimes from './components/PrayerTimes';
import LessonsActivities from './components/LessonsActivities';
// import AdminLogin from './components/AdminLogin';
// import Manager from './components/Manager';

function App() {
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
          {/* <Routes>
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/manager" element={<Manager />} />
          </Routes> */}
          <Hero />
          <PrayerTimes weekdayTimes={weekdayTimes} shabbatTimes={shabbatTimes} />
          <LessonsActivities />
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;
