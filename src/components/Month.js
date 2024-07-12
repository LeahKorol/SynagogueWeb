import React from 'react';
import Day from './Day';

const daysOfWeek = ['שבת', 'שישי', 'חמישי', 'רביעי', 'שלישי', 'שני', 'ראשון'];

const Month = ({ month, events, onEventChange, onDayClick, selectedDay }) => {
    const startDay = new Date(month.getFullYear(), month.getMonth(), 1).getDay();
    const daysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();

    const monthEvents = events.filter(event => {
        const eventDate = new Date(event.date);
        return eventDate.getMonth() === month.getMonth() && eventDate.getFullYear() === month.getFullYear();
    });

    const previousMonthDays = Array.from(
        { length: startDay },
        (_, i) => new Date(month.getFullYear(), month.getMonth(), -(startDay - i - 1))
    );

    const days = previousMonthDays.concat(
        Array.from({ length: daysInMonth }, (_, i) => new Date(month.getFullYear(), month.getMonth(), i + 1))
    );

    return (
        <div className="month">
            <div className="weekdays">
                {daysOfWeek.map((day, index) => (
                    <div key={index} className="weekday">{day}</div>
                ))}
            </div>
            <div className="days">
                {days.map((day, index) => (
                    <Day 
                        key={index} 
                        day={day} 
                        month={month} 
                        events={monthEvents} 
                        isPreviousMonth={index < startDay}
                        onEventChange={onEventChange}
                        onDayClick={onDayClick}
                        isSelected={selectedDay && day.toDateString() === selectedDay.toDateString()}
                    />
                ))}
            </div>
        </div>
    );
};

export default Month;