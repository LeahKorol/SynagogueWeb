import React, { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase';
import { getHebrewDate } from '../utils/calendar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faTimes } from '@fortawesome/free-solid-svg-icons';

const RangeEventPopup = ({ onClose, onEventChange }) => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const start = new Date(startDate);
            const end = new Date(endDate);
            for (let date = new Date(start); date <= end; date.setDate(date.getDate() + 1)) {
                const hebrewDate = getHebrewDate(date);
                await addDoc(collection(db, "events"), {
                    date: date.toISOString().split('T')[0],
                    description: description,
                    hebrewDate: hebrewDate
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
                <h3>הוסף אירוע לטווח תאריכים</h3>
                <form onSubmit={handleSubmit}>
                    <label>
                        תאריך התחלה:
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        תאריך סיום:
                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        תיאור האירוע:
                        <input
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </label>
                    <div className="button-group">
                        <button type="submit" className="save-button">
                            <FontAwesomeIcon icon={faSave} /> שמור אירוע
                        </button>
                        <button type="button" onClick={onClose} className="close-button">
                            <FontAwesomeIcon icon={faTimes} /> סגור
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RangeEventPopup;