import { getCurrentJerusalemDate } from './JerusalemDate';
import { getEarliestTzeit, formatTime, nextFridayCandleLighting, isDaylightSavingTimeForIsrael, nextShabbatHavdala } from './calculateTimes';


const today = getCurrentJerusalemDate();

// Function to calculate hour based on delta and base
export const calculateHour = (delta, base) => {
    if (base === 'Tzeit' || base=='Arvit') {
    const tzeit = getEarliestTzeit(today);
    return calculateFormattedTime(tzeit, delta);
  }
  if(base=='Candle Lighting'){
    const candleLighting = nextFridayCandleLighting(today);
    return calculateFormattedTime(candleLighting, delta);
  } 
  if(base=='Havdala'){
    const havdala = nextShabbatHavdala(today);
return calculateFormattedTime(havdala, delta);
  }
  else{
    return 'undefined';
  }
};

// Function to check if item belongs to today based on tag or date fields
export const checkByTagOrDate = (item) => {
  if (item.status === 'recurring') {
    console.log(item.status);
    const currentDate = new Date();
    if (item.tag === 'summer' && isDaylightSavingTimeForIsrael(currentDate)) {
      return true;
    }
    if (item.tag === 'winter' && !isDaylightSavingTimeForIsrael(currentDate)) {
      return true;
    }
  }
  return false;
};


// Function to process and sort schedule items
export const processScheduleItems = (items) => {
  const processedItems = items.filter(item => item.status === 'default' || checkByTagOrDate(item))
                              .map(item => ({
                                title: item.title,
                                hour: item.base === 'constant' ? item.hour : calculateHour(item.delta, item.base),
                                day: item.day
                              }))
                              .sort((a, b) => {
                                const minutesA = convertHourToMinutes(a.hour);
                                const minutesB = convertHourToMinutes(b.hour);
                                return minutesA - minutesB;
                              });
  return processedItems;
};


const calculateFormattedTime = (baseTime, delta) => {
  const calculatedTime = new Date(baseTime.getTime() + delta * 60000);
  return formatTime(calculatedTime, 'HH:mm');
};

// Helper function to convert hour string to minutes since midnight
const convertHourToMinutes = (hour) => {
  const [hours, minutes] = hour.split(':').map(Number);
  return hours * 60 + (minutes || 0); // Handle cases where minutes might be undefined
};


// // Function to calculate the hour based on base and delta
// export const calculateHour = (base, delta) => {
//   if (base === 'Tzeit' || base=='Arvit') {
//     const tzeit = getEarliestTzeit(today);
//     return calculateFormattedTime(tzeit, delta);
//   }
//   if(base=='Candle Lighting'){
//     const candleLighting = nextFridayCandleLighting(today);
//     return calculateFormattedTime(candleLighting, delta);
//   }
 
//   // Assuming base is a time string in 'HH:mm' format and delta is in minutes
//   const [hours, minutes] = base.split(':').map(Number);
//   const totalMinutes = hours * 60 + minutes + delta;
//   const calculatedHours = Math.floor(totalMinutes / 60) % 24;
//   const calculatedMinutes = totalMinutes % 60;
//   const baseTime = new Date();
//   baseTime.setHours(calculatedHours);
//   baseTime.setMinutes(calculatedMinutes);
//   return formatTime(baseTime, 'HH:mm');
// };

// // Function to get title and hour
// export const getTitleAndHour = (time) => {
//   const hour = time.base === 'constant' ? time.hour : calculateHour(time.base, time.delta);
//   return { title: time.title, hour };
// };
