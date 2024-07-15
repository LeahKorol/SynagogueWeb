import React, { useState, useEffect } from 'react';
import { getHebrewDate } from '../../../../utils/calendar';
import EventPopup from './ActivityEventPopup';
import { getCurrentJerusalemGregDate } from '../../../../utils/JerusalemDate';

const sortEvents = (events) => {
    return events.sort((a, b) => {
        if (!a.id && b.id) return -1;
        if (a.id && !b.id) return 1;
        
        if (a.isAllDay && !b.isAllDay) return -1;
        if (!a.isAllDay && b.isAllDay) return 1;
        if (a.isAllDay && b.isAllDay) return 0;
        
        const aStartTime = a.startTime || '';
        const bStartTime = b.startTime || '';
        
        return aStartTime.localeCompare(bStartTime);
    });
};

const Day = ({ day, month, events, isPreviousMonth, isNextMonth, onEventChange, onDayClick, isSelected }) => {
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        setShowPopup(isSelected);
    }, [isSelected]);

    const gregorianDate = new Date(day);
    const hebrewDate = getHebrewDate(gregorianDate);
    const dayEvents = sortEvents(events.filter(event => event.hebrewDate === hebrewDate));

    const gregorianDay = gregorianDate.getDate();
    const isToday = getCurrentJerusalemGregDate().toDateString() === gregorianDate.toDateString();

    const handleDayClick = (e) => {
        e.stopPropagation();
        onDayClick(day);
        setShowPopup(true);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
        onDayClick(null);
    };

    const maxEventsToShow = 3;

    return (
        <div 
            className={`day ${isPreviousMonth ? 'previous-month' : ''} ${isNextMonth ? 'next-month' : ''} ${isToday ? 'today' : ''} ${isSelected ? 'selected' : ''}`}
            onClick={handleDayClick}
        >
            {day && (
                <>
                    <div className='datehebrewandforeign'>
                        <span className="date">{hebrewDate.split(' ')[0]}</span>
                        <span className="gregorian-date">{gregorianDay}</span>
                    </div>
                    {dayEvents.slice(0, maxEventsToShow).map((event, index) => (
                        <div key={event.id || `non-firebase-${event.description}-${index}`} className="event">
                            <span className="description">
                                {event.description}
                            </span>
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