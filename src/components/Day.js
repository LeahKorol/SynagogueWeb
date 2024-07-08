import React from 'react';
import { getHebrewDate } from '../utils/calendar';

const Day = ({ day, month, events, isPreviousMonth }) => {
    const gregorianDate = new Date(day);
    const formattedDate = gregorianDate.toISOString().split('T')[0]; // Match the format in eventsCalendar
    const dayEvents = events.filter(event => event.date === formattedDate);
    const hebrewDate = getHebrewDate(gregorianDate);

    // Get only the day of the Gregorian date
    const gregorianDay = gregorianDate.getDate();

    return (
        <div className={`day ${isPreviousMonth ? 'previous-month' : ''}`}>
            {day && (
                <>
                    <div className='datehebrewandforeign'>
                    <span className="date">{hebrewDate.split(' ')[0]}</span>
                    <span className="gregorian-date">{gregorianDay}</span>
                    </div>
                    {dayEvents.map((event, index) => (
                        <div key={index} className="event">
                            <span className="description">{event.description}</span>
                        </div>
                    ))}
                </>
            )}
        </div>
    );
};

export default Day;
