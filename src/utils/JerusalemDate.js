export function getCurrentJerusalemGregDate() {
    const now = new Date(); // Current system time
    const jerusalemDate = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Jerusalem' }));
    // const jerusalemDate = new Date(2024, 1, 1); //winter time
    // const jerusalemDate = new Date(2024,6,23);//יז בתמוז
    // const jerusalemDate = new Date(2024,6,20);//Shabbat
    // const jerusalemDate = new Date(2024,11,25);//Chanuka
    // const jerusalemDate = new Date(2025,4,16);//לג בעומר
    // const jerusalemDate = new Date(2024,9,12);//יום כיפור
    // const jerusalemDate = new Date(2024,9,11);//ערב יום כיפןר
    return jerusalemDate;
}