
import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import './HallDetails.css';

// import images
import populationImage from '../../images/population-icon.png';
import kitchenImage from '../../images/kitchen-icon.png';
import eventsImage from '../../images/events-icon.png';

function HallDetails() {
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');

  const fetchHallDetails = async () => {
    const querySnapshot = await getDocs(collection(db, "hallDetails"));
    if (!querySnapshot.empty) {
      const data = querySnapshot.docs[0].data();
      setPhone(data.phone);
      setName(data.name);
    }
  };

  useEffect(() => {
    fetchHallDetails();
  }, []);

  return (
    <main>
        <div className="details-hall">
            <div className="hall-details-container">
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

            <a className="more-details" href={`tel:${phone}`}>
                לפרטים נוספים {name}: {phone}
            </a>
      </div>
    </main>
  );
}

export default HallDetails;
