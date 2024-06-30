import { HebrewCalendar, Location } from '@hebcal/core';

export function getHebrewEvents() {
  const options = {
    year: 2024,
    isHebrewYear: false,
    candlelighting: true,
    location: Location.lookup('Jerusalem'),
    sedrot: true,
    omer: true,
  };
  const events = HebrewCalendar.calendar(options);

  return events.map(ev => {
    const hd = ev.getDate();
    const date = hd.greg();
    return {
      date: date.toLocaleDateString(),
      event: ev.render('en'),
      hebrewDate: hd.toString(),
    };
  });
}