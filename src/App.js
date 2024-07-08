import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Manager from './components/Hero';
import PrayerTimes from './components/PrayerTimes';
import LessonsActivities from './components/LessonsActivities';
import AdminLogin from './components/AdminLogin';
import Manager from './components/Manager';

function App() {
  return (
    <HelmetProvider>
      <Router>
        <div className="App">
          <Helmet>
            <title>פאתי מזרח | דף בית</title>
          </Helmet>
          <Header />
          <Routes>
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/manager" element={<Manager />} />
          </Routes>

          {/* <Hero /> */}
          <PrayerTimes />
          <LessonsActivities />
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;
