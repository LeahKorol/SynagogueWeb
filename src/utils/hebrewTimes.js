import { GeoLocation, Zmanim } from '@hebcal/core';
import { getCurrentJerusalemDate } from './JerusalemDate.js';

const latitude = 31.821074;
const longitude = 35.253573;
const tzid = 'Asia/Jerusalem';
const today = getCurrentJerusalemDate();
const gloc = new GeoLocation(null, latitude, longitude, 0, tzid);
const zmanim = new Zmanim(gloc, today, false);

function isDaylightSavingTimeForIsrael() {
    const SDT = '+02:00';
    const DST = '+03:00';
    const offset = Zmanim.timeZoneOffset(tzid, today.greg());
    return offset === DST;
}

// Function to find the earliest tzeit in this week
function getEarliestTzeit() {
    const currDay = today.getDay();
    let day = today.subtract(currDay, "days"); // Start from Sunday

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

function formatTime(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const seconds = date.getSeconds();

    if (seconds > 0) {
        minutes += 1;

        if (minutes === 60) {
            hours += 1;
            minutes = 0;
        }
    }
    hours = String(hours).padStart(2, '0');
    minutes = String(minutes).padStart(2, '0');

    return `${hours}:${minutes}`;
}

export function getArvitTime(){
    const arvitTime = getEarliestTzeit();
    return formatTime(arvitTime);
}

const candleLighting = zmanim.sunsetOffset(-40, true);
const timeStr = Zmanim.formatISOWithTimeZone(tzid, candleLighting);

const sunrise = zmanim.alotHaShachar();

console.log(candleLighting.toLocaleTimeString('IL-en'));
console.log(sunrise.toLocaleTimeString('IL-en'));

console.log(isDaylightSavingTimeForIsrael());

console.log('Earliest tzeit:', getEarliestTzeit().toString());
console.log(`Arvit time:`, getArvitTime());

export { formatTime };
