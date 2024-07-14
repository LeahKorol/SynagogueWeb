import React, { useEffect, useState } from 'react';
import Calendar from '../Calendar/CalendarClient'; 
import './Calendar.css';
function CalenderClient() {
    return (
        <div className='allTheCalendar'>
            <Calendar /> 
        </div>
    );
}

export default CalenderClient;
