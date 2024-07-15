export function getCurrentJerusalemGregDate() {
    const now = new Date(); // Current system time
    const jerusalemDate = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Jerusalem' }));
    // const jerusalemDate = new Date(2024, 1, 1); //winter time
    // const jerusalemDate = new Date(2024,6,23);//יז בתמוז
    return jerusalemDate;
}