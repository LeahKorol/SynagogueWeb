import React, { useState, useEffect } from 'react';
import { getCurrentGregJerusalemDate } from '../utils/JerusalemDate';
import Month from './Month';
import '../styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { addDoc } from 'firebase/firestore';

const Calendar = () => {
    const [events, setEvents] = useState([]);
    const [currentMonth, setCurrentMonth] = useState(getCurrentGregJerusalemDate());
    const [newEvent, setNewEvent] = useState({ date: '', description: '' });

    const currentYear = currentMonth.getFullYear();
    const months = [...Array(12).keys()].map(i => new Date(currentYear, i, 1));

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "evenes"));
                const eventsList = querySnapshot.docs.map(doc => doc.data());
                setEvents(eventsList);
            } catch (error) {
                console.error("Error fetching events: ", error);
            }
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
        e.preventDefault();
        setNewEvent({ ...newEvent, [e.target.name]: e.target.value });
    };

    const handleAddEvent = async (e) => {
        e.preventDefault();
        try {
            const docRef = await addDoc(collection(db, "evenes"), newEvent);
            console.log("Document successfully written!", docRef.id);
            setEvents(prevEvents => [...prevEvents, newEvent]);
            setNewEvent({ date: '', description: '' });
        } catch (e) {
            console.error("Error adding document: ", e);
        }
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
                        <Month key={index} month={month} events={events} />
                    ))}
                </div>
                <button className="arrow-button right-arrow" onClick={nextMonth}>
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
