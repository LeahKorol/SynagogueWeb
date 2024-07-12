
import React, { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import './About.css';
import aboutImage from '../../images/1.jfif';

function AboutUs() {
  const [aboutData, setAboutData] = useState({});

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const docRef = doc(db, 'about', 'about-data');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setAboutData(docSnap.data());
        }
      } catch (error) {
        console.error('Error fetching document: ', error);
      }
    };

    fetchAboutData();
  }, []);

  return (
    <main className='about-section'>
      <h1 className="heading-about">מי אנחנו?</h1>
      <div className="about-div">
        <img src={aboutImage} alt="" />
        <div className="side">
          <p>
            {aboutData.about || ''}
          </p>
          <div className="files">
            {aboutData.friendsList && (
              <a className="more-details view-button" href={aboutData.friendsList} target="_blank" rel="noopener noreferrer">
                לרשימת החברים לחץ כאן
              </a>
            )}
            {aboutData.rules && (
              <a className="more-details view-button" href={aboutData.rules} target="_blank" rel="noopener noreferrer">
                לתקנון האתר לחץ כאן
              </a>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default AboutUs;




