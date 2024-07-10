import React, { useState, useEffect } from 'react';
import { addDoc, updateDoc, deleteDoc, doc, collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import { getHebrewDate } from '../utils/calendar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faTrash, faTimes, faPlus } from '@fortawesome/free-solid-svg-icons';
import { v4 as uuidv4 } from 'uuid';

const EventPopup = ({ day, events, onClose, onEventChange }) => {
    const [newEvent, setNewEvent] = useState({ description: '' });
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [isMultiDayEvent, setIsMultiDayEvent] = useState(false);

    useEffect(() => {
        if (events.length > 0) {
            setSelectedEvent(events[0]);
            setNewEvent({ description: events[0].description });
            setIsMultiDayEvent(events[0].idevent != null);
        } else {
            setSelectedEvent(null);
            setNewEvent({ description: '' });
            setIsMultiDayEvent(false);
        }
    }, [events]);

    const handleInputChange = (e) => {
        setNewEvent({ ...newEvent, description: e.target.value });
    };

    const handleEventSelect = (e) => {
        const selected = events.find(event => event.id === e.target.value);
        setSelectedEvent(selected);
        setNewEvent({ description: selected ? selected.description : '' });
        setIsMultiDayEvent(selected.idevent != null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (selectedEvent) {
                if (isMultiDayEvent) {
                    // עדכון כל המופעים של האירוע
                    const q = query(collection(db, "events"), where("idevent", "==", selectedEvent.idevent));
                    const querySnapshot = await getDocs(q);
                    const updatePromises = querySnapshot.docs.map(doc => updateDoc(doc.ref, {
                        description: newEvent.description
                    }));
                    await Promise.all(updatePromises);
                } else {
                    // עדכון אירוע בודד
                    await updateDoc(doc(db, "events", selectedEvent.id), {
                        description: newEvent.description
                    });
                }
            } else {
                // הוספת אירוע חדש
                const eventDate = new Date(day.getFullYear(), day.getMonth(), day.getDate());
                await addDoc(collection(db, "events"), {
                    date: eventDate.toISOString().split('T')[0],
                    description: newEvent.description,
                    hebrewDate: getHebrewDate(eventDate)
                });
            }
            onEventChange();
            onClose();
        } catch (error) {
            console.error("Error saving event: ", error);
        }
    };

    const handleDelete = async () => {
        if (selectedEvent) {
            try {
                if (isMultiDayEvent) {
                    // מחיקת כל המופעים של האירוע
                    const q = query(collection(db, "events"), where("idevent", "==", selectedEvent.idevent));
                    const querySnapshot = await getDocs(q);
                    const deletePromises = querySnapshot.docs.map(doc => deleteDoc(doc.ref));
                    await Promise.all(deletePromises);
                } else {
                    // מחיקת אירוע בודד
                    await deleteDoc(doc(db, "events", selectedEvent.id));
                }
                onEventChange();
                onClose();
            } catch (error) {
                console.error("Error deleting event: ", error);
            }
        }
    };

    const handlePopupClick = (e) => {
        e.stopPropagation();
    };

    const handleNewEvent = () => {
        setSelectedEvent(null);
        setNewEvent({ description: '' });
        setIsMultiDayEvent(false);
    };

    const formatGregorianDate = (date) => {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('he-IL', options);
    };

    return (
        <div className="event-popup-overlay" onClick={onClose}>
            <div className="event-popup" onClick={handlePopupClick}>
                <h3>{formatGregorianDate(day)}</h3>
                <h4>{getHebrewDate(day)}</h4>
                <form onSubmit={handleSubmit}>
                    {events.length > 0 && (
                        <div className="event-select-container">
                            <select 
                                onChange={handleEventSelect} 
                                value={selectedEvent ? selectedEvent.id : ''}
                                className="event-select"
                            >
                                {events.map(event => (
                                    <option key={event.id} value={event.id}>{event.description}</option>
                                ))}
                            </select>
                            <button type="button" onClick={handleNewEvent} className="new-event-button">
                                <FontAwesomeIcon icon={faPlus} /> אירוע חדש
                            </button>
                        </div>
                    )}
                    <input
                        type="text"
                        value={newEvent.description}
                        onChange={handleInputChange}
                        placeholder="תיאור האירוע"
                        required
                        className="event-input"
                    />
                    <div className="button-group">
                        <button type="submit" className="save-button">
                            <FontAwesomeIcon icon={faSave} /> {selectedEvent ? 'עדכן' : 'הוסף'} אירוע
                        </button>
                        {selectedEvent && (
                            <button type="button" onClick={handleDelete} className="delete-button">
                                <FontAwesomeIcon icon={faTrash} /> {isMultiDayEvent ? 'מחק את כל מופעי האירוע' : 'מחק אירוע'}
                            </button>
                        )}
                        <button type="button" onClick={onClose} className="close-button">
                            <FontAwesomeIcon icon={faTimes} /> סגור
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EventPopup;