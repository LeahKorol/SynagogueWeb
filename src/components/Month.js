import React from 'react';
import Day from './Day';

const Month = ({ month, events }) => {
    const startDay = new Date(month.getFullYear(), month.getMonth(), 1).getDay();
    const daysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();

    const monthEvents = events.filter(event => {
        const eventDate = new Date(event.date);
        return eventDate.getMonth() === month.getMonth() && eventDate.getFullYear() === month.getFullYear();
    });

    const days = [...Array(startDay).fill(null), ...Array(daysInMonth).keys()].map(day => day + 1);

    return (
        <div className="month">
            <h2>{month.toLocaleString('he-IL', { month: 'long', year: 'numeric' })}</h2>
            <div className="days">
                {days.map((day, index) => (
                    <Day key={index} day={day} month={month} events={monthEvents} />
                ))}
            </div>
        </div>
    );
};

export default Month;