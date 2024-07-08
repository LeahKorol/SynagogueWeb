import React, { useState, useEffect } from 'react';
import { getEventsCalendar } from '../utils/calendar'; 
import { getCurrentGregJerusalemDate } from '../utils/JerusalemDate';
import Month from './Month';
import '../styles.css';

const Calendar = () => {
    const [events, setEvents] = useState([]);
    const [currentMonth, setCurrentMonth] = useState(getCurrentGregJerusalemDate()); // החודש הנוכחי
    const currentYear = currentMonth.getFullYear();
    const months = [...Array(12).keys()].map(i => new Date(currentYear, i, 1));

    useEffect(() => {
        const fetchEvents = async () => {
            const eventsCalendar = await getEventsCalendar();
            setEvents(eventsCalendar);
        };

        fetchEvents();
    }, []);

    const prevMonth = () => {
        setCurrentMonth(prevMonth => new Date(prevMonth.getFullYear(), prevMonth.getMonth() - 1, 1));
    };

    const nextMonth = () => {
        setCurrentMonth(prevMonth => new Date(prevMonth.getFullYear(), prevMonth.getMonth() + 1, 1));
    };

    const filteredMonths = months.filter(month => month.getMonth() === currentMonth.getMonth());

    return (
        <div>
            <h1>לוח שנה עברי</h1>
            <div className="calendar">
                <div>
                    <button onClick={prevMonth}>החודש הקודם</button>
                    <button onClick={nextMonth}>החודש הבא</button>
                </div>
                {filteredMonths.map((month, index) => (
                    <Month key={index} month={month} events={events} />
                ))}
            </div>
        </div>
    );
};

export default Calendar;