import React from 'react';
import { Helmet } from 'react-helmet';
import './App.css';
import './styles/try.css';
import Header from './components/Header';

function App() {
  return (
    <div className="App">
      <Helmet>
        <title>פאתי מזרח | דף בית</title>
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
    </div>
  );
}

export default App;
