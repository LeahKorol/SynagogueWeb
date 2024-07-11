import React from 'react';
import CollapsibleSection from './Forms/CollapsibleSection';
import CongratForm from './Forms/CongratForm';
import LessonsForm from './Forms/LessonsForm';
import EventGalleryForm from './Forms/EventGalleryForm';
import ContactForm from './Forms/ContactForm';
import AboutForm from './Forms/AboutForm';
import ContributesForm from './Forms/ContributesForm';
import './Manager.css';

function Manager() {
  return (
    <div className="manager-container">
      <header className="manager-header">
        <h2>עמוד מנהל</h2>
        <p>ברוך הבא למערכת המנהל</p>
      </header>
      <main className="manager-content">
        <CollapsibleSection title="עדכון איחולים">
          <CongratForm />
        </CollapsibleSection>
        <CollapsibleSection title="ניהול שיעורים">
          <LessonsForm />
        </CollapsibleSection>
        <CollapsibleSection title="גלריית אירועים">
          <EventGalleryForm />
        </CollapsibleSection>
        <CollapsibleSection title="פרטי התקשרות">
          <ContactForm />
        </CollapsibleSection>
        <CollapsibleSection title="עדכון אודות הקהילה">
          <AboutForm />
        </CollapsibleSection>
        <CollapsibleSection title="ניהול תרומות">
          <ContributesForm />
        </CollapsibleSection>
      </main>
    </div>
  );
}

export default Manager;