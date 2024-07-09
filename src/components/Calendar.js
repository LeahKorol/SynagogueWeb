import React, { useState, useEffect } from 'react';
import { getEventsCalendar } from '../utils/calendar'; 
import { getCurrentGregJerusalemDate } from '../utils/JerusalemDate';
import Month from './Month';
import '../styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';

const Calendar = () => {
    const [events, setEvents] = useState([]);
    const [currentMonth, setCurrentMonth] = useState(getCurrentGregJerusalemDate());
    const [newEvent, setNewEvent] = useState({ date: '', description: '' });

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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewEvent(prevState => ({ ...prevState, [name]: value }));
    };

    const handleAddEvent = async (e) => {
        e.preventDefault();
        try {
            await addDoc(collection(db, 'events'), newEvent);
            setEvents(prevEvents => [...prevEvents, newEvent]);
            setNewEvent({ date: '', description: '' });
        } catch (error) {
            console.error('Error adding event: ', error);
        }
    };

    const filteredMonths = months.filter(month => month.getMonth() === currentMonth.getMonth());

    return (
        <div className="calendarCenter">
            <h1>לוח שנה עברי</h1>
            <div className="calendar-container">
                <button className="arrow-button left-arrow" onClick={nextMonth}>
                     <FontAwesomeIcon icon={faChevronLeft} />
                </button>
                <div className="calendar">
                    {filteredMonths.map((month, index) => (
                        <Month key={index} month={month} events={events} />
                    ))}
                </div>
                <button className="arrow-button right-arrow" onClick={prevMonth}>
                     <FontAwesomeIcon icon={faChevronRight} />
                </button>
            </div>
            <form onSubmit={handleAddEvent} className="event-form">
                <input
                    type="date"
                    name="date"
                    value={newEvent.date}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="text"
                    name="description"
                    value={newEvent.description}
                    onChange={handleInputChange}
                    placeholder="תיאור אירוע"
                    required
                />
                <button type="submit">הוסף אירוע</button>
            </form>
        </div>
    );
};

export default Calendar;
