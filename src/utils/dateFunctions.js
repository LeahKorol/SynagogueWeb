import { HebrewCalendar, HDate, Location, Locale} from '@hebcal/core';
import { getCurrentJerusalemDate } from './JerusalemDate.js';

const today = getCurrentJerusalemDate();
//const today = new HDate(new Date(2024,9,12));//yom kipur 2024

export function formatCurrentJerusalemDate() {
  const gregorianDate = today.greg().toLocaleDateString('IL-en');  //MUST add .toLocaleDateString('IL-en')!!
  const hebrewDateGematria = today.renderGematriya('he-x-NoNikud');
  const day = convertDayToString(today.getDay());
  return {
    gregorianDate,
    hebrewDateGematria,
    day
  };
}

function convertDayToString(day) {
  const daysOfWeek = ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"];
  
  // Adjust for JavaScript's 0-indexed array
  return daysOfWeek[day % 7];
}

export function getEventsDescriptions() {
  const options = {
    start: today,
    end: today,
    isHebrewYear: true,
    location: Location.lookup('Jerusalem'),
    locale: 'he-x-NoNikud',
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
  const parashaName = Locale.lookupTranslation(parasha['parsha'][0], 'he-x-NoNikud');
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
