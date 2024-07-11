import React, { useState, useEffect } from 'react';
import { addDoc, collection, query, where, getDocs, writeBatch } from 'firebase/firestore';
import { db } from '../firebase';
import { getHebrewDate } from '../utils/calendar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faTrash, faTimes, faPlus, faEdit, faClock, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { v4 as uuidv4 } from 'uuid';

const EventPopup = ({ day, events, onClose, onEventChange, isRangeEvent = false }) => {
    const [showAddEvent, setShowAddEvent] = useState(false);
    const [editingEvent, setEditingEvent] = useState(null);
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
        const now = new Date();
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

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setEventForm(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingEvent) {
                await handleUpdate();
            } else {
                await handleAdd();
            }
            onEventChange();
            setShowAddEvent(false);
            setEditingEvent(null);
            setEventForm({
                description: '',
                isAllDay: false,
                startDate: day.toISOString().split('T')[0],
                endDate: day.toISOString().split('T')[0],
                startTime: '',
                endTime: '',
                location: ''
            });
            if (isRangeEvent) {
                onClose();
            }
        } catch (error) {
            console.error("Error saving/updating event: ", error);
        }
    };

    const handleAdd = async () => {
        const start = new Date(eventForm.startDate);
        const end = new Date(eventForm.endDate);
        const idevent = uuidv4();
        for (let date = new Date(start); date <= end; date.setDate(date.getDate() + 1)) {
            const hebrewDate = getHebrewDate(date);
            await addDoc(collection(db, "events"), {
                date: date.toISOString().split('T')[0],
                description: eventForm.description,
                hebrewDate: hebrewDate,
                rangeDescription: `${eventForm.description} (${eventForm.startDate} - ${eventForm.endDate})`,
                idevent: idevent,
                startTime: eventForm.isAllDay ? '' : eventForm.startTime,
                endTime: eventForm.isAllDay ? '' : eventForm.endTime,
                isAllDay: eventForm.isAllDay,
                location: eventForm.location
            });
        }
    };

    const handleUpdate = async () => {
        const querySnapshot = await getDocs(query(collection(db, "events"), where("idevent", "==", editingEvent.idevent)));
        const batch = writeBatch(db);
        querySnapshot.forEach((doc) => {
            batch.update(doc.ref, {
                description: eventForm.description,
                startTime: eventForm.isAllDay ? '' : eventForm.startTime,
                endTime: eventForm.isAllDay ? '' : eventForm.endTime,
                isAllDay: eventForm.isAllDay,
                location: eventForm.location
            });
        });
        await batch.commit();
    };

    const handleDelete = async (event) => {
        if (window.confirm('האם אתה בטוח שברצונך למחוק את כל המופעים של אירוע זה?')) {
            try {
                const querySnapshot = await getDocs(query(collection(db, "events"), where("idevent", "==", event.idevent)));
                const batch = writeBatch(db);
                querySnapshot.forEach((doc) => {
                    batch.delete(doc.ref);
                });
                await batch.commit();
                onEventChange();
            } catch (error) {
                console.error("Error deleting event: ", error);
            }
        }
    };

    const startEditing = (event) => {
        setEditingEvent(event);
        setEventForm({
            description: event.description,
            isAllDay: event.isAllDay,
            startDate: event.date,
            endDate: event.date,
            startTime: event.startTime || '',
            endTime: event.endTime || '',
            location: event.location || ''
        });
        setShowAddEvent(true);
    };

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
                                        {event.location && <span className="event-location">{event.location}</span>}
                                        {event.id && (
                                            <div>
                                                <button onClick={() => startEditing(event)}>
                                                    <FontAwesomeIcon icon={faEdit} /> ערוך
                                                </button>
                                                <button onClick={() => handleDelete(event)}>
                                                    <FontAwesomeIcon icon={faTrash} /> מחק
                                                </button>
                                            </div>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <button onClick={() => setShowAddEvent(true)} className="add-event-button">
                            <FontAwesomeIcon icon={faPlus} /> הוסף אירוע
                        </button>
                    </>
                )}
                {(showAddEvent || isRangeEvent) && (
                    <div className="add-event-form">
                        <h3>הוסף אירוע</h3>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                name="description"
                                value={eventForm.description}
                                onChange={handleInputChange}
                                placeholder="שם האירוע"
                                required
                                className="event-input"
                            />
                            <div className="all-day-toggle">
                                <span className="all-day-label">כל היום</span>
                                <label className="switch">
                                    <input
                                        type="checkbox"
                                        name="isAllDay"
                                        checked={eventForm.isAllDay}
                                        onChange={handleInputChange}
                                    />
                                    <span className="slider round"></span>
                                </label>
                            </div>
                            <div className="date-time-inputs">
                                {!eventForm.isAllDay && (
                                    <input
                                        type="time"
                                        name="startTime"
                                        value={eventForm.startTime}
                                        onChange={handleInputChange}
                                        className="time-input"
                                    />
                                )}
                                <input
                                    type="date"
                                    name="startDate"
                                    value={eventForm.startDate}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="date-time-inputs">
                                {!eventForm.isAllDay && (
                                    <input
                                        type="time"
                                        name="endTime"
                                        value={eventForm.endTime}
                                        onChange={handleInputChange}
                                        className="time-input"
                                    />
                                )}
                                <input
                                    type="date"
                                    name="endDate"
                                    value={eventForm.endDate}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className='input-container'>
                                <FontAwesomeIcon icon={faMapMarkerAlt} className="icon" />
                                <input
                                    type="text"
                                    name="location"
                                    value={eventForm.location}
                                    onChange={handleInputChange}
                                    placeholder="מיקום"
                                    className="event-input"
                                />
                            </div>
                            <div className="form-buttons">
                                <button type="submit" className="save-event-button">
                                    <FontAwesomeIcon icon={faSave} /> {editingEvent ? 'עדכן אירוע' : 'שמור אירוע'}
                                </button>
                                <button type="button" onClick={() => {
                                    setShowAddEvent(false);
                                    setEditingEvent(null);
                                }} className="cancel-button">
                                    <FontAwesomeIcon icon={faTimes} /> ביטול
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EventPopup;