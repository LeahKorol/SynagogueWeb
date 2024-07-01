import { HDate, HebrewDateEvent, months } from '@hebcal/core';

function getCurrentDateInJerusalem() {
  const now = new Date(); // Current system time

  const jerusalemDate = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Jerusalem' })); // Get current date in Jerusalem timezone

  const hd = new HDate(jerusalemDate);
  //MUST add .toLocaleDateString('IL-en')!!!!!!
  console.log("Gregorian Date in Jerusalem Time:", hd.greg().toLocaleDateString('IL-en'));
  console.log("Hebrew Date in Gematria:", hd.renderGematriya());
}

getCurrentDateInJerusalem();

//Get current date in Jerusalem time zone
const now = new Date();
const options = {
  timeZone: 'Asia/Jerusalem',
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric'
};

const jerusalemDate = now.toLocaleString('en-IL', options);
console.log('Current date in Jerusalem:', jerusalemDate);







