import { HebrewCalendar, HDate, Location, Locale ,DailyLearning} from '@hebcal/core';
import '@hebcal/learning';
import { getCurrentJerusalemGregDate } from './JerusalemDate.js';

const today = currentJerusalemHebrewDate();
//const today = new HDate(new Date(2024,9,12));//yom kipur 2024

export function formatCurrentJerusalemHebrewDate(useNextDay = false) {
  const referenceDay = useNextDay ? today.add(1, 'days') : today;

  const hebrewDateGematria = referenceDay.renderGematriya('he-x-NoNikud');
  return hebrewDateGematria;
}

export function formatCurrentJerusalemDay(useNextDay = false) {
  const referenceDay = useNextDay ? today.add(1, 'days') : today;
  const daysOfWeek = ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"];
  return daysOfWeek[referenceDay.getDay() % 7];
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
    candlelighting: false,
  };

  const events = HebrewCalendar.calendar(options);
  const descriptions = events.map(ev => {
    return {
      description: ev.render('he-x-NoNikud'),
      emoji: ev.getEmoji()
    };
  });
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

// Function to get today's Daf Yomi
export function getDafYomi() {
  const ev = DailyLearning.lookup('dafYomi', today);
  return ev.render('he-x-NoNikud');
}

export function currentJerusalemHebrewDate() {
  const jerusalemDate = getCurrentJerusalemGregDate();
  const today = new HDate(jerusalemDate);
  return today;
}




