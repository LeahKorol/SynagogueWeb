import './PrayerTimes.css';

import React, { useEffect, useState } from 'react';
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

import { processScheduleItems } from '../../utils/timeUtils';
import { getCurrentJerusalemGregDate } from '../../utils/JerusalemDate.js';
import {
  formatCurrentJerusalemHebrewDate,
  formatCurrentJerusalemDay,
  getParasha,
} from '../../utils/dateFunctions';


// Function to fetch schedule items from Firestore
const fetchScheduleItems = async () => {
  try {
    const timesCollection = collection(db, 'times');
    const timesSnapshot = await getDocs(timesCollection);
    const itemsToShow = timesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return itemsToShow;
  } catch (error) {
    console.error('Error fetching schedule items: ', error);
    return [];
  }
};

const PrayerTimes = () => {
  const [schedule, setSchedule] = useState({ weekday: [], Friday: [], Shabbat: [] });

  useEffect(() => {
    const fetchItems = async () => {
      const items = await fetchScheduleItems(); // Fetch schedule items from the server
      const processedSchedule = processScheduleItems(items); // Process the fetched items
      setSchedule(processedSchedule); // Update state with processed schedule
    };

    fetchItems(); // Initial fetch of items
  }, []);

  // Format the current date and day
  const currentDay = getCurrentJerusalemGregDate().getDay();
  const isMotzaeiShabbat = currentDay === 6; // Saturday
  const formatDate = formatCurrentJerusalemHebrewDate(isMotzaeiShabbat);
  const formatDay = formatCurrentJerusalemDay(isMotzaeiShabbat);

  // Get the weekly Torah portion (Parasha)
  const parasha = getParasha();
  let parashaName = parasha.parashaName;
  if (!parasha.chag) {
    parashaName = ' פרשת ' + parashaName;
  }

  return (
    <section className="prayersTime">
      <h1 className="heading">זמני תפילות</h1>
      <div className="box-container">
        <div className="schedule">
          <h2>זמני  חול</h2>
          <h2 className='sub-title'>יום {formatDay} - {formatDate}</h2>
          <ul>
            {schedule.weekday.map((item, index) => (
              <li key={index}>
                {item.title}: {item.hour}
              </li>
            ))}
          </ul>
        </div>

        <div className="schedule">
          <h2> שבת קודש {parashaName}</h2>
          <h2 className='sub-title'>ערב שבת:</h2>
          <ul>
            {schedule.Friday.map((item, index) => (
              <li key={index}>
                {item.title}: {item.hour}
              </li>
            ))}
          </ul>
          <h2 className='sub-title'>שבת:</h2>
          <ul>
            {schedule.Shabbat.map((item, index) => (
              <li key={index}>
                {item.title}: {item.hour}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default PrayerTimes;

