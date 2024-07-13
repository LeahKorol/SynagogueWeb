import React, { useState, useEffect } from 'react';
import { getHebrewDate } from '../utils/calendar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faClock,faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { getCurrentGregJerusalemDate } from '../utils/JerusalemDate';

const EventPopupClient = ({ day, events, onClose, onEventChange, isRangeEvent = false }) => {
    const [showAddEvent, setShowAddEvent] = useState(false);
    const [eventForm, setEventForm] = useState({
        description: '',
        isAllDay: false,
        startDate: day.toISOString().split('T')[0],
        endDate: day.toISOString().split('T')[0],
        startTime: '',
        endTime: '',
        location: ''
    });
    
    const GregorianDate = (date) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        const formattedDate = date.toLocaleDateString('en-GB', options).split('/').reverse().join('-');
        return formattedDate;
    };

    useEffect(() => {
        const now = getCurrentGregJerusalemDate();
        const roundedHour = Math.ceil(now.getHours());
        const defaultStartTime = `${roundedHour.toString().padStart(2, '0')}:00`;
        const defaultEndTime = `${(roundedHour + 1).toString().padStart(2, '0')}:00`;

        setEventForm(prev => ({
            ...prev,
            startTime: defaultStartTime,
            endTime: defaultEndTime,
            startDate: GregorianDate(day),
            endDate: GregorianDate(day)
        }));
        if (isRangeEvent) {
            setShowAddEvent(true);
        }
    }, [isRangeEvent, day]);

    const formatGregorianDate = (date) => {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('he-IL', options);
    };

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

    const sortedEvents = sortEvents([...events]);

    return (
        <div className="event-popup-overlay" onClick={onClose}>
            <div className="event-popup" onClick={(e) => e.stopPropagation()}>
                <button className="close-button" onClick={onClose}>
                    <FontAwesomeIcon icon={faTimes} />
                </button>
                {!showAddEvent && !isRangeEvent && (
                    <>
                        <h3>{formatGregorianDate(day)}</h3>
                        <h4>{getHebrewDate(day)}</h4>
                        <div className="event-list-container">
                            <ul className="event-list">
                                {sortedEvents.map(event => (
                                    <li key={event.id || `non-firebase-${event.description}`} className="event-item">
                                        <span style={{ direction: 'rtl', unicodeBidi: 'plaintext' }}>
                                            {event.description}
                                        </span>
                                        {event.isAllDay ? (
                                            <span className="all-day-label">כל היום</span>
                                        ) : (
                                            event.startTime && event.endTime && (
                                                <span className="event-time">
                                                    <FontAwesomeIcon icon={faClock} /> {event.startTime} - {event.endTime}
                                                </span>
                                            )
                                        )}
                                        {event.location && <span className="event-location">
                                            <FontAwesomeIcon icon={faMapMarkerAlt} /> {event.location}
                                            </span>
                                        }

                                    </li>
                                ))}
                            </ul>
                        </div>
                       
                    </>
                )}
                
            </div>
        </div>
    );
};

export default EventPopupClient;