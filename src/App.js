import React from 'react';
import { Helmet } from 'react-helmet';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import PrayerTimes from './components/PrayerTimes';
import LessonsActivities from './components/LessonsActivities';
import AdminLogin from './components/AdminLogin';
import Manager from './components/Manager';

function App() {
  return (
    <Router>
      <div className="App">
        <Helmet>
          <title>פאתי מזרח | דף בית</title>
        </Helmet>
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <section id="hero" className="hero">
                  <div className="content">
                    <h1>"שויתי ה' לנגדי תמיד"</h1>
                    <p>
                      ברוכים הבאים לאתר של קהילת פאתי מזרח.
                      <br />
                      כאן תמצאו מידע על זמני תפילות, אירועים קרובים ושיעורי תורה
                    </p>
                    <div className="buttons">
                      <a href="about-contact.html">עוד קצת עלינו</a>
                    </div>
                  </div>
                </section>
                <PrayerTimes />
                <LessonsActivities />
              </>
            }
          />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/manager" element={<Manager />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
