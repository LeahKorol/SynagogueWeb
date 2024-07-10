import React, { useState, useEffect } from 'react';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../firebase';
import { getEventsCalendar } from '../utils/calendar';
import { getCurrentGregJerusalemDate } from '../utils/JerusalemDate';
import Month from './Month';
import RangeEventPopup from './RangeEventPopup';
import '../styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faCalendarPlus } from '@fortawesome/free-solid-svg-icons';

const Calendar = () => {
    const [events, setEvents] = useState([]);
    const [currentMonth, setCurrentMonth] = useState(getCurrentGregJerusalemDate());
    const [selectedDay, setSelectedDay] = useState(null);
    const [showRangePopup, setShowRangePopup] = useState(false);

    const currentYear = currentMonth.getFullYear();
    const months = [...Array(12).keys()].map(i => new Date(currentYear, i, 1));

    const fetchEvents = async () => {
        try {
            const eventsList = [];
            const querySnapshot = await getDocs(collection(db, "events"));
            querySnapshot.forEach(doc => {
                eventsList.push({ id: doc.id, ...doc.data() });
            });
            const eventsCalendar = await getEventsCalendar();
            setEvents([...eventsList, ...eventsCalendar]);
        } catch (error) {
            console.error("Error fetching events: ", error);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    const handleEventChange = () => {
        fetchEvents();
    };

    const prevMonth = () => {
        setCurrentMonth(prevMonth => new Date(prevMonth.getFullYear(), prevMonth.getMonth() - 1, 1));
    };

    const nextMonth = () => {
        setCurrentMonth(prevMonth => new Date(prevMonth.getFullYear(), prevMonth.getMonth() + 1, 1));
    };

    const handleDayClick = (day) => {
        setSelectedDay(day);
    };

    const handleAddRangeEvent = () => {
        setShowRangePopup(true);
    };

    const filteredMonths = months.filter(month => month.getMonth() === currentMonth.getMonth());

    return (
        <div className="calendarCenter">
            <h1>לוח שנה עברי</h1>
            <div className="calendar-container">
                <button className="arrow-button left-arrow" onClick={prevMonth}>
                    <FontAwesomeIcon icon={faChevronLeft} />
                </button>
                <div className="calendar">
                    {filteredMonths.map((month, index) => (
                        <Month 
                            key={index} 
                            month={month} 
                            events={events} 
                            onEventChange={handleEventChange}
                            onDayClick={handleDayClick}
                            selectedDay={selectedDay}
                        />
                    ))}
                </div>
                <button className="arrow-button right-arrow" onClick={nextMonth}>
                    <FontAwesomeIcon icon={faChevronRight} />
                </button>
            </div>
            <button className="add-range-event-button" onClick={handleAddRangeEvent}>
                <FontAwesomeIcon icon={faCalendarPlus} /> הוסף אירוע לטווח תאריכים
            </button>
            {showRangePopup && (
                <RangeEventPopup
                    onClose={() => setShowRangePopup(false)}
                    onEventChange={handleEventChange}
                />
            )}
        </div>
    );
};

export default Calendar;