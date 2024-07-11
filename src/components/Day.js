import React, { useState, useEffect } from 'react';
import { getHebrewDate } from '../utils/calendar';
import EventPopup from './EventPopup';

const Day = ({ day, month, events, isPreviousMonth, onEventChange, onDayClick, isSelected }) => {
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        setShowPopup(isSelected);
    }, [isSelected]);

    const gregorianDate = new Date(day);
    const hebrewDate = getHebrewDate(gregorianDate);
    const dayEvents = events.filter(event => event.hebrewDate === hebrewDate);

    const gregorianDay = gregorianDate.getDate();
    const isToday = new Date().toDateString() === gregorianDate.toDateString();

    const handleDayClick = (e) => {
        e.stopPropagation();
        onDayClick(day);
        setShowPopup(true);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
        onDayClick(null);
    };

    // מספר האירועים שיוצגו (תוכל לשנות את זה לפי הצורך)
    const maxEventsToShow = 3;

    return (
        <div 
            className={`day ${isPreviousMonth ? 'previous-month' : ''} ${isToday ? 'today' : ''} ${isSelected ? 'selected' : ''}`}
            onClick={handleDayClick}
        >
            {day && (
                <>
                    <div className='datehebrewandforeign'>
                        <span className="date">{hebrewDate.split(' ')[0]}</span>
                        <span className="gregorian-date">{gregorianDay}</span>
                    </div>
                    {dayEvents.slice(0, maxEventsToShow).map((event, index) => (
                        <div key={index} className="event">
                            <span className="description">{event.description}</span>
                        </div>
                    ))}
                    {dayEvents.length > maxEventsToShow && (
                        <div className="more-events">
                            +{dayEvents.length - maxEventsToShow} עוד
                        </div>
                    )}
                    {showPopup && (
                        <EventPopup 
                            day={day}
                            events={dayEvents}
                            onClose={handleClosePopup}
                            onEventChange={onEventChange}
                        />
                    )}
                </>
            )}
        </div>
    );
};

export default Day;