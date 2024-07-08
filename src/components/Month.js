import React from 'react';
import Day from './Day';
import { getHebrewDate } from '../utils/calendar';

const daysOfWeek = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'];

const Month = ({ month, events }) => {
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

    // Calculate days from the previous month to display
    const previousMonthDays = Array.from(
        { length: startDay },
        (_, i) => new Date(month.getFullYear(), month.getMonth(), -(startDay - i - 1))
    );

    const days = previousMonthDays.concat(
        Array.from({ length: daysInMonth }, (_, i) => new Date(month.getFullYear(), month.getMonth(), i + 1))
    );

    // Extracting Hebrew month name and year from hebrewStartDate
    const hebrewStartDateParts = hebrewStartMonth.split(' ');
    const hebrewStartMonthName = hebrewStartDateParts[1];
    const hebrewStartYear = hebrewStartDateParts[2];

    // Extracting Hebrew month name and year from hebrewEndDate
    const hebrewEndDateParts = hebrewEndMonth.split(' ');
    const hebrewEndMonthName = hebrewEndDateParts[1];
    const hebrewEndYear = hebrewEndDateParts[2];

    // Build the title based on whether it's the same month or different months
    let title;
    if (hebrewStartMonth === hebrewEndMonth) {
        title = `${month.toLocaleString('he-IL', { month: 'long', year: 'numeric' })} ${hebrewStartMonthName} ${hebrewStartYear}`;
    } else {
        title = `${month.toLocaleString('he-IL', { month: 'long', year: 'numeric' })} ${hebrewStartMonthName} - ${hebrewEndMonthName} ${hebrewEndYear}`;
    }

    return (
        <div className="month">
            <h2>
                {title}
            </h2>
            <div className="week-days">
                {daysOfWeek.map((day, index) => (
                    <div key={index} className="week-day">{day}</div>
                ))}
            </div>
            <div className="days">
                {days.map((day, index) => (
                    <Day key={index} day={day} month={month} events={monthEvents} isPreviousMonth={index < startDay} />
                ))}
            </div>
        </div>
    );
};

export default Month;
