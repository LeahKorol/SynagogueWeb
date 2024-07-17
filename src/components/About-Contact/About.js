import React, { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import aboutImage from '../../images/1.jfif';
import './About.css';

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
            עמותת פאתי מזרח קמה על מנת לבנות קהילה שהיא מרכז רוחני דתי ציוני בפסגת זאב -
             שבירושלים. קהילה ששואפת כי תפילתה תעלה יחדיו ותתקבל ברצון, ומבקשת להיבנות מתוך דבקות בערכי
           תפילה, תורה והלכה, מחויבות לחסד ואחריות הדדית ברוח ערכי הציונות הדתית. קהילה שתהיה בית ומוקד
            לכל חבריה גברים, נשים וטף לפעילות תורנית, חינוכית, תרבותית וחברתית בכל ימות השנה, ומקור של אור
            וחסד המקרין על חברי הקהילה ועל כלל תושבי השכונה.
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