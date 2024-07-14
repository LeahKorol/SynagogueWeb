import React from 'react';
import Day from './ActivityDay';

const daysOfWeek = ['שבת', 'שישי', 'חמישי', 'רביעי', 'שלישי', 'שני', 'ראשון'];

const Month = ({ month, events, onEventChange, onDayClick, selectedDay }) => {
    const startDay = new Date(month.getFullYear(), month.getMonth(), 1).getDay();
    const daysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
    const endDay = new Date(month.getFullYear(), month.getMonth(), daysInMonth).getDay();
    const daysFromNextMonth = endDay === 6 ? 0 : 6 - endDay;

    const startOfVisibleCalendar = new Date(month.getFullYear(), month.getMonth(), 1 - startDay);
    const endOfVisibleCalendar = new Date(month.getFullYear(), month.getMonth() + 1, daysFromNextMonth);

    const visibleEvents = events.filter(event => {
        const eventDate = new Date(event.date);
        return eventDate >= startOfVisibleCalendar && eventDate <= endOfVisibleCalendar;
    });

    const previousMonthDays = Array.from(
        { length: startDay },
        (_, i) => new Date(month.getFullYear(), month.getMonth(), -(startDay - i - 1))
    );

    const currentMonthDays = Array.from(
        { length: daysInMonth },
        (_, i) => new Date(month.getFullYear(), month.getMonth(), i + 1)
    );

    const nextMonthDays = Array.from(
        { length: daysFromNextMonth },
        (_, i) => new Date(month.getFullYear(), month.getMonth() + 1, i + 1)
    );

    const days = [...previousMonthDays, ...currentMonthDays, ...nextMonthDays];

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
                        events={visibleEvents} 
                        isPreviousMonth={index < startDay}
                        isNextMonth={index >= startDay + daysInMonth}
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