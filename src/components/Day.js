import React from 'react';
import { getHebrewDate } from '../utils/calendar';

const Day = ({ day, month, events }) => {
    const gregorianDate = new Date(month.getFullYear(), month.getMonth(), day);
    const formattedDate = gregorianDate.toISOString().split('T')[0]; // Match the format in eventsCalendar
    const dayEvents = events.filter(event => event.date === formattedDate);
    const hebrewDate = getHebrewDate(gregorianDate);
    
    return (
        <div className={`day ${day ? '' : 'empty'}`}>
            {day && (
                <>
                    <span className="date">{hebrewDate}</span>
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
