import React from 'react';
import './HallDetails.css';

// import images
import populationImage from '../../images/population-icon.png';
import kitchenImage from '../../images/kitchen-icon.png';
import eventsImage from '../../images/events-icon.png';

function HallDetails() {
  return (
    <main>
        <div className="details-hall">
            <div className="details">
            <div className="box">
                <img src={populationImage} alt="אייקון אנשים" />
                <h2 className="count-people">כמות אנשים מקסימלית</h2>
                <p>120 איש</p>
            </div>
            <div className="box">
                <img src={kitchenImage} alt="אייקון מטבח" />
                <h2>מטבח מאובזר</h2>
                <p>מטבח נקי</p>
            </div>
            <div className="box">
                <img src={eventsImage} alt="אייקון אירועים" />
                <h2>אפשרויות לאירועים</h2>
                <p>ברית מילה, אירוסין, ועוד</p>
            </div>
            </div>
            <a className="more-details" href="about-contact.html#contact-div">
                לפרטים נוספים שלומי לוי: 0506277146
            </a>
      </div>
    </main>
  );
}

export default HallDetails;
