
import React from 'react';
import CongratForm from './CongratForm';
import LessonsForm from './LessonsForm';
import EventGalleryForm from './EventGalleryForm';
import ContactForm from './ContactForm'; // ייבוא טופס ניהול צור הקשר


function Manager() {
  return (
    <div className="manager-container">
      <h2>עמוד מנהל</h2>
      <p>ברוך הבא למערכת המנהל.</p>
      <CongratForm />
      <LessonsForm />
      <EventGalleryForm />
      <ContactForm /> 
    </div>
  );
}

export default Manager;


