import { GeoLocation, Zmanim, HebrewCalendar, flags, HDate, HebrewDateEvent } from '@hebcal/core';
import { currentJerusalemDate } from './dateFunctions.js';

const latitude = 31.821240;
const longitude = 35.253677;
const elevation = 700;
const tzid = 'Asia/Jerusalem';
const today = currentJerusalemDate();
const gloc = new GeoLocation(null, latitude, longitude, elevation, tzid);
const zmanim = new Zmanim(gloc, today, true); //use elevation


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
 * @param {Date} - The date to check
 * @return {Date} - the date in this week the Zteit is the earliest
 */
function getEarliestTzeit(date) {
    const currDay = date.getDay();
    let day = new HDate(date).subtract(currDay, "days"); // Start from Sunday
    const degrees = 7;

    let minTzeit = zmanim.tzeit(degrees);
    let tZmanim, tzeit;

    function getTimeAsNumber(date) {
        return date.getHours() * 3600 + date.getMinutes() * 60 + date.getSeconds(); // Convert time to seconds
    }

    let minTzeitInSeconds = getTimeAsNumber(minTzeit);

    for (let i = 0; i < 7; i++) {
        tZmanim = new Zmanim(gloc, day, true);
        tzeit = tZmanim.tzeit(degrees);
        console.log(tzeit);

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
 * @param {boolean} [roundUp=true] - Optional parameter to round up the minutes if the seconds are greater than 0.
 * @returns {string} The formatted time string in HH:mm format.
 */
function formatTime(date, roundUp = true) {
    let tempDate = new Date(date);
    if (roundUp && tempDate.getSeconds() > 0) {
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
 * @param {Date} date 
 * @returns {Date} candleLighting
 */
function nextFridayCandleLighting(date) {
    const CloseFriday = new HDate(date).onOrAfter(5);
    const FridayZmanim = new Zmanim(gloc, CloseFriday, true);// Enable elevation 

    // Calculate the candle lighting time in Jerusalem for seen sunset
    const candleLighting = FridayZmanim.sunsetOffset(-40, false);

    // Log candle lighting and actual sunset times for reference
    // console.log("Candle Lighting:", candleLighting.toLocaleTimeString('IL-en'));
    // console.log("Sunset:", FridayZmanim.shkiah().toLocaleTimeString('IL-en'));

    return candleLighting;
}


/**
 * Calculates Havdala time for upcoming Shabbat: 40 minutes after seen sunset
 * @param {Date} date 
 * @returns {Date} Havdala
 */
function nextShabbatHavdala(date) {
    const CloseShabbat = new HDate(date).onOrAfter(6);
    const ShabbatZmanim = new Zmanim(gloc, CloseShabbat, true);// able elevation 
    const havdala = ShabbatZmanim.sunsetOffset(40, true);
    // console.log("Sunset:", ShabbatZmanim.shkiah().toLocaleTimeString('IL-en'));
    return havdala
}

function isEventDay(date, flag) {
    const events = HebrewCalendar.getHolidaysOnDate(new HDate(date), true);
    if(!events){
        return false;
    }
    const flagValue = flags[flag.toUpperCase()];

    // console.log(flag.toUpperCase()); // Check the uppercase value of flag
    // console.log(flagValue); // Check the value of flagValue

    for (const event of events) {
        if (event.getFlags() & flagValue) {
            // console.log('found a matchhhhhhhhhh');
            return true;
        }
    }
    return false;
}



export {
    formatTime,
    getEarliestTzeit,
    nextShabbatHavdala,
    nextFridayCandleLighting,
    isDaylightSavingTimeForIsrael,
    isEventDay
};
