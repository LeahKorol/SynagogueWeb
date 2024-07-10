import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import './About.css'
import friendsList from '../../files/friends-list.pdf'; 
import rules from '../../files/rules.pdf'; 
import image from '../../images/1.jfif'; 

function AboutUs() {
    return (
        <main className='about-section'>
            <h1 className="heading-about">מי אנחנו?</h1>
            <div className="about-div">
                <img src={image} alt=""/>
                <div className="side">
                    <p>
                        עמותת פאתי מזרח קמה על מנת לבנות קהילה שהיא מרכז רוחני-דתי-ציוני בפסגת זאב 
                        שבירושלים.
                        קהילה ששואפת כי תפילתה תעלה יחדיו ותתקבל ברצון, ומבקשת להיבנות מתוך דבקות בערכי 
                        תפילה, תורה והלכה, מחויבות לחסד ואחריות הדדית ברוח ערכי הציונות הדתית.
                        קהילה שתהיה בית ומוקד לכל חבריה - גברים, נשים וטף - לפעילות תורנית, חינוכית, תרבותית 
                        וחברתית בכל ימות השנה, ומקור של אור וחסד המקרין על חברי הקהילה ועל כלל תושבי 
                        השכונה.
                    </p>
                    <div className="files">
                        <a className="more-details view-button" href={friendsList} target="_blank" rel="noopener noreferrer">
                            לרשימת החברים לחץ כאן
                        </a>
                        <a className="more-details view-button" href={rules} target="_blank" rel="noopener noreferrer">
                            לתקנון האתר לחץ כאן
                        </a>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default AboutUs;
