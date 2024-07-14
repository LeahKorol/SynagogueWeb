import { HebrewCalendar, Location, HDate } from '@hebcal/core';
import { getCurrentJerusalemGregDate } from './JerusalemDate.js';

const today = getCurrentJerusalemGregDate();
const hd_start = new Date(today.getFullYear(), today.getMonth(), 1);
const hd_end = new Date(hd_start.getFullYear() + 1, hd_start.getMonth(), hd_start.getDate());
export function getEventsCalendar() {
    const options = {
        start: hd_start,
        end: hd_end,
        isHebrewYear: true,
        location: Location.lookup('Jerusalem'),
        il: true,
        shabbatMevarchim: true,
        omer: true,
        sedrot: true,
        candlelighting: true,
        holidays: true,
    };

    const events = HebrewCalendar.calendar(options);
    const eventsCalendar = events.map(ev => {
        const date = ev.getDate().greg().toISOString().split('T')[0]; // Use ISO string for exact match
        const hebrewDate = ev.getDate().renderGematriya('he-x-NoNikud');
        const description = ev.render('he-x-NoNikud');
        return {
            date,
            hebrewDate,
            description,
        };
    });

    return eventsCalendar;
}

export function getHebrewDate(date) {
    const hdate = new HDate(date);
    return hdate.renderGematriya('he-x-NoNikud');
}
