import React, { useState, useEffect } from 'react';
import { addDoc, updateDoc, deleteDoc, doc, collection } from 'firebase/firestore';
import { db } from '../firebase';
import { getHebrewDate } from '../utils/calendar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faTrash, faTimes, faPlus } from '@fortawesome/free-solid-svg-icons';

const EventPopup = ({ day, events, onClose, onEventChange }) => {
    const [newEvent, setNewEvent] = useState({ description: '' });
    const [selectedEvent, setSelectedEvent] = useState(null);

    useEffect(() => {
        if (events.length > 0) {
            setSelectedEvent(events[0]);
            setNewEvent({ description: events[0].description });
        } else {
            setSelectedEvent(null);
            setNewEvent({ description: '' });
        }
    }, [events]);

    const handleInputChange = (e) => {
        setNewEvent({ ...newEvent, description: e.target.value });
    };

    const handleEventSelect = (e) => {
        const selected = events.find(event => event.id === e.target.value);
        setSelectedEvent(selected);
        setNewEvent({ description: selected ? selected.description : '' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (selectedEvent) {
                await updateDoc(doc(db, "events", selectedEvent.id), {
                    description: newEvent.description
                });
            } else {
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
                await deleteDoc(doc(db, "events", selectedEvent.id));
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
                                <FontAwesomeIcon icon={faPlus} /> New Event
                            </button>
                        </div>
                    )}
                    <input
                        type="text"
                        value={newEvent.description}
                        onChange={handleInputChange}
                        placeholder="Event description"
                        required
                        className="event-input"
                    />
                    <div className="button-group">
                        <button type="submit" className="save-button">
                            <FontAwesomeIcon icon={faSave} /> {selectedEvent ? 'Update' : 'Add'} Event
                        </button>
                        {selectedEvent && (
                            <button type="button" onClick={handleDelete} className="delete-button">
                                <FontAwesomeIcon icon={faTrash} /> Delete Event
                            </button>
                        )}
                        <button type="button" onClick={onClose} className="close-button">
                            <FontAwesomeIcon icon={faTimes} /> Close
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EventPopup;