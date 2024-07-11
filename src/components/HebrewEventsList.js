import React, { useState, useEffect } from 'react';
import { getHebrewEvents } from '../utils/hebrewEvents';

const HebrewEventsList = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const hebrewEvents = getHebrewEvents();
    setEvents(hebrewEvents);
  }, []);

  return (
    <div>
      <h2>Hebrew Calendar Events for 2024</h2>
      <ul>
        {events.map((event, index) => (
          <li key={index}>
            <strong>Date:</strong> {event.date} <br />
            <strong>Event:</strong> {event.event} <br />
            <strong>Hebrew Date:</strong> {event.hebrewDate}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HebrewEventsList;
