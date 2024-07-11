import React, { useState, useEffect } from 'react';
import { addDoc, updateDoc, deleteDoc, doc, collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import { getHebrewDate } from '../utils/calendar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faTrash, faTimes, faPlus, faEdit } from '@fortawesome/free-solid-svg-icons';

const EventPopup = ({ day, events, onClose, onEventChange }) => {
    const [newEvent, setNewEvent] = useState({ description: '' });
    const [editingEvent, setEditingEvent] = useState(null);

    const handleInputChange = (e) => {
        setNewEvent({ ...newEvent, description: e.target.value });
    };

    const handleEdit = (event) => {
        setEditingEvent(event);
        setNewEvent({ description: event.description });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingEvent) {
                if (editingEvent.idevent) {
                    // עדכון כל המופעים של האירוע
                    const q = query(collection(db, "events"), where("idevent", "==", editingEvent.idevent));
                    const querySnapshot = await getDocs(q);
                    const updatePromises = querySnapshot.docs.map(doc => updateDoc(doc.ref, {
                        description: newEvent.description
                    }));
                    await Promise.all(updatePromises);
                } else {
                    // עדכון אירוע בודד
                    await updateDoc(doc(db, "events", editingEvent.id), {
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
            setEditingEvent(null);
            setNewEvent({ description: '' });
        } catch (error) {
            console.error("Error saving event: ", error);
        }
    };

    const handleDelete = async (event) => {
        try {
            if (event.idevent) {
                // מחיקת כל המופעים של האירוע
                const q = query(collection(db, "events"), where("idevent", "==", event.idevent));
                const querySnapshot = await getDocs(q);
                const deletePromises = querySnapshot.docs.map(doc => deleteDoc(doc.ref));
                await Promise.all(deletePromises);
            } else {
                // מחיקת אירוע בודד
                await deleteDoc(doc(db, "events", event.id));
            }
            onEventChange();
        } catch (error) {
            console.error("Error deleting event: ", error);
        }
    };

    const formatGregorianDate = (date) => {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('he-IL', options);
    };

    return (
        <div className="event-popup-overlay" onClick={onClose}>
            <div className="event-popup" onClick={(e) => e.stopPropagation()}>
                <button className="close-button" onClick={onClose}>
                    <FontAwesomeIcon icon={faTimes} />
                </button>
                <h3>{formatGregorianDate(day)}</h3>
                <h4>{getHebrewDate(day)}</h4>
                <ul className="event-list">
                    {events.map(event => (
                        <li key={event.id} className="event-item">
                            <span>{event.description}</span>
                            <div>
                                <button onClick={() => handleEdit(event)}>
                                    <FontAwesomeIcon icon={faEdit} /> ערוך
                                </button>
                                <button onClick={() => handleDelete(event)}>
                                    <FontAwesomeIcon icon={faTrash} /> מחק
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={newEvent.description}
                        onChange={handleInputChange}
                        placeholder={editingEvent ? "ערוך אירוע" : "הוסף אירוע חדש"}
                        required
                        className="event-input"
                    />
                    <button type="submit" className="save-button">
                        <FontAwesomeIcon icon={faSave} /> {editingEvent ? 'עדכן' : 'הוסף'} אירוע
                    </button>
                    {editingEvent && (
                        <button type="button" onClick={() => setEditingEvent(null)} className="cancel-button">
                            <FontAwesomeIcon icon={faTimes} /> ביטול
                        </button>
                    )}
                </form>
            </div>
        </div>
    );
};

export default EventPopup;