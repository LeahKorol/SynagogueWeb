import { HebrewCalendar, Location } from '@hebcal/core';
import { getJerusalemDate } from './JerusalemDate.js';

const hd_start = getJerusalemDate();
const hd_end = hd_start.add(12, "months");

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
    };

    const events = HebrewCalendar.calendar(options);
    const eventsCalendar = events.map(ev => {
        const date = ev.getDate().greg().toLocaleDateString('IL-en');
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

const eventsCalendar = getEventsCalendar();
console.log(eventsCalendar);

