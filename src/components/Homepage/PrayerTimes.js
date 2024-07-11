import './PrayerTimes.css';
import React, { useEffect, useState } from 'react';
import { fetchScheduleItems, listenToScheduleItems } from '../../utils/timeService';
import { processScheduleItems } from '../../utils/timeUtils';

const PrayerTimes = () => {
  // State to hold schedule items
  const [schedule, setSchedule] = useState({ weekday: [], Friday: [], Shabbat: [] });

  useEffect(() => {
    // Function to fetch and process items
    const fetchItems = async () => {
      const items = await fetchScheduleItems(); // Fetch schedule items from the server
      const processedSchedule = processScheduleItems(items); // Process the fetched items
      setSchedule(processedSchedule); // Update state with processed schedule
    };

    fetchItems(); // Initial fetch of items

    // Set up real-time listener for schedule updates
    const unsubscribe = listenToScheduleItems((updatedItems) => {
      const processedSchedule = processScheduleItems(updatedItems); // Process the updated items
      setSchedule(processedSchedule); // Update state with processed schedule
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
            {schedule.weekday.map((item, index) => (
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
            {schedule.Friday.map((item, index) => (
              <li key={index}>
                {item.title}: {item.hour}
              </li>
            ))}
          </ul>
          <h2>שבת:</h2>
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
