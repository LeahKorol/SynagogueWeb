import React, { useEffect, useState } from 'react';
import Calendar from '../Calendar/CalendarClient'; // ייבוא הרכיב Calendar
import './Calendar.css';
function CalenderClient() {
    return (
        <div>
            <Calendar /> 
        </div>
    );
}

export default CalenderClient;
