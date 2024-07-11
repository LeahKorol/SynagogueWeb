import { GeoLocation, Zmanim, HebrewCalendar, flags, HDate } from '@hebcal/core';
import { getCurrentJerusalemDate } from './JerusalemDate.js';

const latitude = 31.821240;
const longitude = 35.253677;
const elevation = 700;
const tzid = 'Asia/Jerusalem';
const today = getCurrentJerusalemDate();
const gloc = new GeoLocation(null, latitude, longitude, elevation, tzid);
const zmanim = new Zmanim(gloc, today, false);


/**
 * Checks if a given date is during daylight saving time in Israel.
 * @param {Date} date - The date to check.
 * @returns {boolean} True if the date is during daylight saving time in Israel, false otherwise.
 */
function isDaylightSavingTimeForIsrael(date) {
    const SDT = '+02:00';
    const DST = '+03:00';
    const offset = Zmanim.timeZoneOffset(tzid, date);
    return offset === DST;
}

/**
 * finds the earliest tzeit in this week
 * @param {HDate} - The date to check
 * @return {Date} - the date in this week the Zteit is the earliest
 */
function getEarliestTzeit(hdate) {
    const currDay = hdate.getDay();
    let day = hdate.subtract(currDay, "days"); // Start from Sunday

    let minTzeit = zmanim.tzeit();
    let tZmanim, tzeit;

    function getTimeAsNumber(date) {
        return date.getHours() * 3600 + date.getMinutes() * 60 + date.getSeconds(); // Convert time to seconds
    }

    let minTzeitInSeconds = getTimeAsNumber(minTzeit);

    for (let i = 0; i < 7; i++) {
        tZmanim = new Zmanim(gloc, day, false);
        tzeit = tZmanim.tzeit();

        let tzeitInSeconds = getTimeAsNumber(tzeit);

        if (tzeitInSeconds < minTzeitInSeconds) {
            minTzeit = tzeit;
            minTzeitInSeconds = tzeitInSeconds;
        }
        day = day.add(1, "days"); // Move to the next day
    }

    return minTzeit;
}

/**
 * Formats a given date into a HH:mm time format. 
 * If the seconds part of the date is greater than 0, the returned time will be one minute after the original time.
 * @param {Date} date - The date object to format.
 * @returns {string} The formatted time string in HH:mm format.
 */
function formatTime(date) {
    let tempDate = new Date(date);
    if (tempDate.getSeconds() > 0) {
        tempDate.setMinutes(tempDate.getMinutes() + 1);
    }
    let hours = tempDate.getHours();
    let minutes = tempDate.getMinutes();

    hours = String(hours).padStart(2, '0');
    minutes = String(minutes).padStart(2, '0');

    return `${hours}:${minutes}`;
}


/**
 * Calculates Candle Lighting time for upcoming Friday based on seen sunset.
 * @param {HDate} hdate 
 * @returns {Date} candleLighting
 */
function nextFridayCandleLighting(hdate) {
    const CloseFriday = hdate.onOrAfter(5);
    const FridayZmanim = new Zmanim(gloc, CloseFriday, true);// Enable elevation 

    // Calculate the candle lighting time in Jerusalem for seen sunset
    const candleLighting = FridayZmanim.sunsetOffset(-40, true);

    // Log candle lighting and actual sunset times for reference
    console.log("Candle Lighting:", candleLighting.toLocaleTimeString('IL-en'));
    console.log("Sunset:", FridayZmanim.shkiah().toLocaleTimeString('IL-en'));

    return candleLighting;
}


/**
 * Calculates Havdala time for upcoming Shabbat: 40 minutes after seen sunset
 * @param {HDate} hdate 
 * @returns {Date} Havdala
 */
function nextShabbatHavdala(hdate) {
    const CloseShabbat = hdate.onOrAfter(6);
    const ShabbatZmanim = new Zmanim(gloc, CloseShabbat, true);// unnable elevation 
    const havdala = ShabbatZmanim.sunsetOffset(40, true);
   return havdala
}

export {
    formatTime,
    getEarliestTzeit,
    nextShabbatHavdala,
    nextFridayCandleLighting,
    isDaylightSavingTimeForIsrael,
};