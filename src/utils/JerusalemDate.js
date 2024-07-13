import { HDate } from '@hebcal/core';

export function currentJerusalemHebrewDate() {
    const jerusalemDate = currentJerusalemDate();
    const today = new HDate(jerusalemDate);
    return today;
}
export function currentJerusalemDate() { //includes hours, minutes and seconds as well
    const now = new Date(); // Current system time
    const jerusalemDate = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Jerusalem' }));
    return jerusalemDate;
}
