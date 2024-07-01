import { GeoLocation, Zmanim } from '@hebcal/core';
const latitude = 31.821074;
const longitude = 35.253573;
const tzid = 'Asia/Jerusalem';
const today = new Date();
const gloc = new GeoLocation(null, latitude, longitude, 0, tzid);
const zmanim = new Zmanim(gloc, today, false);
const candleLighting = zmanim.sunsetOffset(-40, true);
const timeStr = Zmanim.formatISOWithTimeZone(tzid, candleLighting);

const sunrise = zmanim.alotHaShachar();

console.log(candleLighting.toLocaleTimeString('IL-en'));
console.log(sunrise.toLocaleTimeString('IL-en'));
console.log(`${zmanim.sofZmanShma().toLocaleTimeString('IL-en')}`);
console.log(`${zmanim.sofZmanShmaMGA19Point8().toLocaleTimeString('IL-en')}`);

function isDaylightSavingTimeForIsrael() {
    const SDT = '+02:00';
    const DST = '+03:00';
    const offset = Zmanim.timeZoneOffset(tzid, today);
    return offset === DST;
}

console.log(isDaylightSavingTimeForIsrael());
