import React, { useState, useEffect } from 'react';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../../../../firebase';
import { getEventsCalendar, getHebrewDate } from '../../../../utils/calendar';
import { getCurrentJerusalemGregDate } from '../../../../utils/JerusalemDate';
import Month from './ActivityMonth';
import RangeEventPopup from './ActivityRangeEventPopup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faChevronLeft, faChevronRight, faCalendarDay } from '@fortawesome/free-solid-svg-icons';

const Calendar = () => {
    const [events, setEvents] = useState([]);
    const [currentMonth, setCurrentMonth] = useState(getCurrentJerusalemGregDate());
    const [selectedDay, setSelectedDay] = useState(null);
    const [showRangePopup, setShowRangePopup] = useState(false);
    //const [selectedHebrewDate, setSelectedHebrewDate] = useState('');

    const currentYear = currentMonth.getFullYear();
    const months = [...Array(12).keys()].map(i => new Date(currentYear, i, 1));

    const fetchEvents = async () => {
        try {
            const eventsList = [];
            const querySnapshot = await getDocs(collection(db, "events"));
            querySnapshot.forEach(doc => {
                eventsList.push({ id: doc.id, ...doc.data() });
            });
            const eventsCalendar = await getEventsCalendar();
            setEvents([...eventsList, ...eventsCalendar]);
        } catch (error) {
            console.error("Error fetching events: ", error);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    const handleEventChange = () => {
        fetchEvents();
    };

    const prevMonth = () => {
        setCurrentMonth(prevMonth => new Date(prevMonth.getFullYear(), prevMonth.getMonth() - 1, 1));
    };

    const nextMonth = () => {
        setCurrentMonth(prevMonth => new Date(prevMonth.getFullYear(), prevMonth.getMonth() + 1, 1));
    };

    const handleDayClick = (day) => {
        setSelectedDay(day);
    };

    const handleAddRangeEvent = () => {
        setShowRangePopup(true);
    };

    const goToToday = () => {
        setCurrentMonth(getCurrentJerusalemGregDate());
    };

    // const handleHebrewDateChange = (e) => {
    //     const hebrewDate = e.target.value;
    //     setSelectedHebrewDate(hebrewDate);
    //     // כאן נשתמש בפונקציה getHebrewDate כדי להמיר את התאריך העברי לגרגוריאני
    //     const gregorianDate = new Date(hebrewDate); // זו המרה פשוטה, ייתכן שתצטרך התאמה
    //     setCurrentMonth(gregorianDate);
    // };
    
    const getMonthTitle = (month) => {
        const gregorianDate = new Date(month.getFullYear(), month.getMonth(), 1);
        const hebrewStartDate = getHebrewDate(gregorianDate);
        const hebrewEndDate = getHebrewDate(new Date(month.getFullYear(), month.getMonth() + 1, 0));
    
        const hebrewStartMonth = hebrewStartDate.split(' ')[1];
        const hebrewEndMonth = hebrewEndDate.split(' ')[1];
        const hebrewYear = hebrewStartDate.split(' ')[2];
        
      
        if(hebrewStartDate === hebrewEndDate){
            if( hebrewStartDate.split(' ')[2]=== "א׳"){
                return ` ${hebrewStartDate.split(' ')[1]} ${hebrewStartDate.split(' ')[2]} `;
            }else if(hebrewStartDate.split(' ')[2]==="ב׳"){
                return ` ${hebrewStartDate.split(' ')[1]} ${hebrewStartDate.split(' ')[2]} `;
            }else {
                return ` ${hebrewStartMonth} ${hebrewYear}`;
            }
        }else{
            if( hebrewStartDate.split(' ')[2]=== "א׳"){
                return ` ${hebrewStartDate.split(' ')[1]} ${hebrewStartDate.split(' ')[2]} - ${hebrewEndDate.split(' ')[1]} ${hebrewEndDate.split(' ')[2]} ${hebrewEndDate.split(' ')[3]}`;
            }else if( hebrewEndDate.split(' ')[2]==="א׳"){
                return ` ${hebrewStartDate.split(' ')[1]} - ${hebrewEndDate.split(' ')[1]} ${hebrewEndDate.split(' ')[2]} ${hebrewEndDate.split(' ')[3]}`;
            }else if(hebrewStartDate.split(' ')[2]==="ב׳"){
                return ` ${hebrewStartDate.split(' ')[1]} ${hebrewStartDate.split(' ')[2]} - ${hebrewEndDate.split(' ')[1]} ${hebrewEndDate.split(' ')[2]}`;
            }else {
                return ` ${hebrewStartMonth} - ${hebrewEndMonth} ${hebrewYear}`;      
            }
        } 
    };
    const getYearTitle=(month)=>{
        const gregorianMonth = month.toLocaleString('he-IL', { month: 'long' });
        const gregorianYear = month.getFullYear();
        return `${gregorianMonth} ${gregorianYear}`;
    }
    const filteredMonths = months.filter(month => month.getMonth() === currentMonth.getMonth());

    return (
        <div className="calendarCenter">
            <div className="calendar-container">
                <div className="calendar-header"> 
                    <div className="controls">
                    <button className="add-range-event-button" onClick={handleAddRangeEvent}>
                            <FontAwesomeIcon icon={faPlus} />
                            <span>הוסף אירוע</span>
                        </button>
                        <button className="today-button" onClick={goToToday}>
                            <FontAwesomeIcon icon={faCalendarDay} />
                            <span>היום</span>
                        </button>
                        <button className="arrow-button" onClick={nextMonth}>
                            <FontAwesomeIcon icon={faChevronLeft} />
                        </button>
                        <button className="arrow-button" onClick={prevMonth}>
                            <FontAwesomeIcon icon={faChevronRight} />
                        </button>
                    </div>
                    <div className='title'>
                        <h2 className="month-title month-year">
                            {getYearTitle(currentMonth)}
                        </h2>
                        <h2 className="month-title">
                            {getMonthTitle(currentMonth)}
                        </h2>
                    </div>
                </div>
                <div className="calendar">
                    {filteredMonths.map((month, index) => (
                        <Month 
                            key={index} 
                            month={month} 
                            events={events} 
                            onEventChange={handleEventChange}
                            onDayClick={handleDayClick}
                            selectedDay={selectedDay}
                        />
                    ))}
                </div>
            </div>
            
            {showRangePopup && (
                <RangeEventPopup
                    onClose={() => setShowRangePopup(false)}
                    onEventChange={handleEventChange}
                />
            )}
        </div>
    );
};

export default Calendar;