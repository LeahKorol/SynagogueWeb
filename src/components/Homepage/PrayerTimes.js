import './PrayerTimes.css';
import React, { useEffect, useState } from 'react';
import { fetchScheduleItems, listenToScheduleItems } from '../../utils/timeService';
import { processScheduleItems } from '../../utils/timeUtils';

const PrayerTimes = () => {
  const [scheduleItems, setScheduleItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      const items = await fetchScheduleItems();
      const processedItems = processScheduleItems(items);
      setScheduleItems(processedItems);
    };

    fetchItems();

    // Set up real-time listener
    const unsubscribe = listenToScheduleItems((updatedItems) => {
      const processedItems = processScheduleItems(updatedItems);
      setScheduleItems(processedItems);
    });

    // Clean up the listener on component unmount
    return () => unsubscribe();

  }, []);

  return (
    <section className="prayersTime">
      <h1 className="heading">זמני תפילות</h1>
      <div className="box-container">
        <div className="schedule">
          <h2>זמני יום חול</h2>
          <ul>
            {scheduleItems.filter(item => item.day === 'weekday').map((item, index) => (
              <li key={index}>
                {item.title}: {item.hour}
              </li>
            ))}
          </ul>
        </div>

        <div className="schedule">
          <h2>זמני שבת קודש</h2>
          <h2>ערב שבת:</h2>
          <ul>
            {scheduleItems.filter(item => item.day === 'Friday').map((item, index) => (
              <li key={index}>
                {item.title}: {item.hour}
              </li>
            ))}
          </ul>
          <h2>שבת:</h2>
          <ul>
            {scheduleItems.filter(item => item.day === 'Shabbat').map((item, index) => (
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

export default PrayerTimes ;

