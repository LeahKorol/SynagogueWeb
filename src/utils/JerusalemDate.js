import { HDate } from '@hebcal/core';

export function getCurrentJerusalemDate() {
    const now = new Date(); // Current system time
    const jerusalemDate = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Jerusalem' }));
    const today = new HDate(jerusalemDate);
    return today;
}