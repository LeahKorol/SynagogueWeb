import React from 'react';
import './LessonsActivities.css'

const LessonsActivities = () => {
  return (
    <section className="lessons-activities">
      <h1 className="heading">שיעורים קבועים</h1>
      <div className="lessons-container">
        <div className="lesson">
          <h2 className="title-lesson">דף יומי</h2>
          <p><i className="fas fa-clock"></i> כל יום בשעה 21:00</p>
          <p><i className="fas fa-building"></i>בחדר הלימודים</p>
        </div>
        <div className="lesson">
          <h2 className="title-lesson">שיעור בספר שופטים</h2>
          <p><i className="fas fa-clock"></i> כל יום שלישי בשעה 20:00</p>
          <p><i className="fas fa-building"></i>בחדר הלימודים</p>
        </div>
      </div>
    </section>
  );
}

export default LessonsActivities;
