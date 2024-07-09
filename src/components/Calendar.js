import React, { useState, useEffect } from 'react';
import { getDocs, collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { getEventsCalendar } from '../utils/calendar';
import { getCurrentGregJerusalemDate } from '../utils/JerusalemDate';
import Month from './Month';
import '../styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const Calendar = () => {
    const [events, setEvents] = useState([]);
    const [currentMonth, setCurrentMonth] = useState(getCurrentGregJerusalemDate());
    const [newEvent, setNewEvent] = useState({ date: '', description: '' });

    const currentYear = currentMonth.getFullYear();
    const months = [...Array(12).keys()].map(i => new Date(currentYear, i, 1));

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                // Fetch events from Firebase Firestore
                const eventsList = [];
                const querySnapshot = await getDocs(collection(db, "events"));
                querySnapshot.forEach(doc => {
                    eventsList.push(doc.data());
                });
                setEvents(eventsList);

                // Fetch events from external calendar source (if needed)
                const eventsCalendar = await getEventsCalendar();
                setEvents(prevEvents => [...prevEvents, ...eventsCalendar]);
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
        setNewEvent({ ...newEvent, [e.target.name]: e.target.value });
    };

    const handleAddEvent = async (e) => {
        e.preventDefault();
        try {
            const docRef = await addDoc(collection(db, "events"), newEvent);
            console.log("Document successfully written!", docRef.id);
            setEvents(prevEvents => [...prevEvents, newEvent]); // Add the new event to the events state
            setNewEvent({ date: '', description: '' }); // Clear the form
        } catch (error) {
            console.error("Error adding document: ", error);
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
