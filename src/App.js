import React from 'react';
import { Helmet } from 'react-helmet';
import './App.css';
import Header from './components/Header';
import PrayerTimes from './components/PrayerTimes';
import LessonsActivities from './components/LessonsActivities';

function App() {
  return (
    <div className="App">
      <Helmet>
        <title>פאתי מזרח קדימה | דף בית</title>
      </Helmet>
      <Header />
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
    </div>
  );
}

export default App;
