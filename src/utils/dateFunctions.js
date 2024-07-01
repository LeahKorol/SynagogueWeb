import { HebrewCalendar, HDate, Location, Event, RoshChodeshEvent, Locale, HebrewDateEvent, CandleLightingEvent, HolidayEvent, holidayDesc } from '@hebcal/core';

const now = new Date(); // Current system time
const jerusalemDate = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Jerusalem' }));
const today = new HDate(jerusalemDate);

function getCurrentDateInJerusalem() {
  const gregorianDate = today.greg().toLocaleDateString('IL-en');
  const hebrewDateGematria = today.renderGematriya();

  return {
    gregorianDate,
    hebrewDateGematria
  };
}

export function getEventsDescriptions() {
  const options = {
    start: today,
    end: today,
    isHebrewYear: true,
    location: Location.lookup('Jerusalem'),
    il: true,
    shabbatMevarchim: true,
    omer: true,
    yomKippurKatan: true,
    sedrot: true,
    candlelighting: true,
  };

  const events = HebrewCalendar.calendar(options);
  const descriptions = events.map(ev => ev.render('he-x-NoNikud'));

  return descriptions;
}

export function getParasha() {
  const parasha = HebrewCalendar.getSedra(today.getFullYear(), true).lookup(today);
  const parashaName = Locale.lookupTranslation(parasha['parsha'][0], 'he');
  const chag = parasha['chag'];
  return {
    parashaName,
    chag,
  };
}

export function getTachanun() {
  const tachanun = HebrewCalendar.tachanun(today, true);
  return tachanun;
}

export function getHallel() {
  const hallel = HebrewCalendar.hallel(today, true);
  return hallel;
}

console.log(getCurrentDateInJerusalem().gregorianDate);
console.log(getCurrentDateInJerusalem().hebrewDateGematria);

console.log(getEventsDescriptions());

console.log(getParasha());

console.log(getTachanun());

console.log(getHallel()); 
