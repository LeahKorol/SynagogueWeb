import React from 'react';
import CongratForm from './Forms/CongratForm';
import LessonsForm from './Forms/LessonsForm';
import EventGalleryForm from './Forms/EventGalleryForm';
import ContactForm from './Forms/ContactForm'; 
import AboutForm from './Forms/AboutForm';
import ContributesForm from './Forms/ContributesForm';

function Manager() {
  return (
    <div className="manager-container">
      <h2>עמוד מנהל</h2>
      <p>ברוך הבא למערכת המנהל.</p>
      <CongratForm />
      <LessonsForm />
      <EventGalleryForm />
      <ContactForm /> 
      <AboutForm /> 
      <ContributesForm />
    </div>
  );
}

export default Manager;


