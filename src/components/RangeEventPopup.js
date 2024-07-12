import React, { useState, useEffect } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase';
import { getHebrewDate } from '../utils/calendar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faTimes, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { v4 as uuidv4 } from 'uuid';
import { getCurrentGregJerusalemDate } from '../utils/JerusalemDate';

const RangeEventPopup = ({ onClose, onEventChange }) => {
    const [eventForm, setEventForm] = useState({
        description: '',
        isAllDay: false,
        startDate: new Date().toISOString().split('T')[0],
        endDate: new Date().toISOString().split('T')[0],
        startTime: '',
        endTime: '',
        location: ''
    });

    useEffect(() => {
        const now = getCurrentGregJerusalemDate();
        const roundedHour = Math.ceil(now.getHours());
        const defaultStartTime = `${roundedHour.toString().padStart(2, '0')}:00`;
        const defaultEndTime = `${(roundedHour + 1).toString().padStart(2, '0')}:00`;

        setEventForm(prev => ({
            ...prev,
            startTime: defaultStartTime,
            endTime: defaultEndTime
        }));
    }, []);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setEventForm(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const isValidDateTimeRange = () => {
        const start = new Date(`${eventForm.startDate}T${eventForm.startTime || '00:00'}`);
        const end = new Date(`${eventForm.endDate}T${eventForm.endTime || '23:59'}`);
        return start <= end;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isValidDateTimeRange()) {
            alert("לא חוקי");
            return;
        }
        try {
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
            onEventChange();
            onClose();
        } catch (error) {
            console.error("Error saving range event: ", error);
        }
    };

    return (
        <div className="event-popup-overlay" onClick={onClose}>
            <div className="event-popup" onClick={(e) => e.stopPropagation()}>
                <button className="close-button" onClick={onClose}>
                    <FontAwesomeIcon icon={faTimes} />
                </button>
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
                            <button type="submit" className="save-event-button-elone">
                                <FontAwesomeIcon icon={faSave} /> הוסף אירוע
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RangeEventPopup;