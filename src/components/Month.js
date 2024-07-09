import React from 'react';
import Day from './Day';
import { getHebrewDate } from '../utils/calendar';

const daysOfWeek = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'];

const Month = ({ month, events, onEventChange, onDayClick, selectedDay }) => {
    const startDay = new Date(month.getFullYear(), month.getMonth(), 1).getDay();
    const daysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
    const gregorianDate = new Date(month.getFullYear(), month.getMonth(), 1);
    const hebrewStartDate = getHebrewDate(gregorianDate);
    const hebrewEndDate = getHebrewDate(new Date(month.getFullYear(), month.getMonth() + 1, 0));

    const hebrewStartMonth = hebrewStartDate.toLocaleString('he-IL', { month: 'long', year: 'numeric' });
    const hebrewEndMonth = hebrewEndDate.toLocaleString('he-IL', { month: 'long', year: 'numeric' });

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

    const hebrewStartDateParts = hebrewStartMonth.split(' ');
    const hebrewStartMonthName = hebrewStartDateParts[1];
    const hebrewStartYear = hebrewStartDateParts[2];

    const hebrewEndDateParts = hebrewEndMonth.split(' ');
    const hebrewEndMonthName = hebrewEndDateParts[1];
    const hebrewEndYear = hebrewEndDateParts[2];

    let title;
    if (hebrewStartMonth === hebrewEndMonth) {
        title = `${month.toLocaleString('he-IL', { month: 'long', year: 'numeric' })} ${hebrewStartMonthName} ${hebrewStartYear}`;
    } else {
        title = `${month.toLocaleString('he-IL', { month: 'long', year: 'numeric' })} ${hebrewStartMonthName} - ${hebrewEndMonthName} ${hebrewEndYear}`;
    }

    return (
        <div className="month">
            <h2>{title}</h2>
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