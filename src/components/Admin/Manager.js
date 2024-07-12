import React from 'react';
import CollapsibleSection from './Forms/CollapsibleSection';
import CongratForm from './Forms/CongratForm';
import LessonsForm from './Forms/LessonsForm';
import EventGalleryForm from './Forms/EventGalleryForm';
import ContactForm from './Forms/ContactForm';
import AboutForm from './Forms/AboutForm';
import ContributesForm from './Forms/ContributesForm';
import { Link } from'react-router-dom';
import './Manager.css';

function Manager() {
  return (
    <div className="manager-container">
      <Link to="/" className="home-button">חזרה לדף הבית</Link>


      <h2 className='heading-manager'>עמוד מנהל</h2>
      <div className='manager-text'>
        <p>ברוך הבא למערכת המנהל!</p>
        <p>כאן תוכל להוסיף / לעדכן / למחוק את תוכן האתר. </p>
        <p>שים לב! לא לשכוח למחוק אירועים / פירסומים / איחולים וכו' שכבר לא רלוונטים כדי שלא יהיה עומס על האתר.</p>
      </div>
      


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