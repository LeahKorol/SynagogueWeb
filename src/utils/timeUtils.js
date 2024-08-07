import { getCurrentJerusalemGregDate } from './JerusalemDate.js';
import { getEarliestTzeit, getTzeit, getSunset, formatTime, nextFridayCandleLighting, isDaylightSavingTimeForIsrael, nextShabbatHavdala, isEventDay } from './calculateTimes';

const today = getCurrentJerusalemGregDate();

/**
 * Calculates the hour based on delta and base, adjusting for day modification.
 * 
 * @param {number} delta - The delta (in minutes) to add to the base time.
 * @param {string} base - The base time identifier ('week earliest tzeit', 'tzeit', 'candle lighting', 'sunset', 'havdala').
 * @param {number} dayModifier - Modifier to adjust the reference day (default is 0).
 *                               If -1, adjusts to the previous day; if 1, adjusts to the next day.
 * @returns {string} - The calculated and formatted time (HH:mm).
 */
export const calculateHour = (delta, base, dayModifier = 0) => {
  let baseTime;
  const referenceDay = new Date(today);
  referenceDay.setDate(today.getDate() + dayModifier);

  if (base === 'week earliest tzeit') {
    baseTime = getEarliestTzeit(referenceDay);
  } else if (base === 'tzeit') {
    baseTime = getTzeit(referenceDay);
  } else if (base === 'sunset') {
    baseTime = getSunset(referenceDay);
  } else if (base === 'candle lighting') {
    baseTime = nextFridayCandleLighting(referenceDay);
  } else if (base === 'havdala') {
    baseTime = nextShabbatHavdala(referenceDay);
  } else {
    return 'undefined';
  }

  return calculateFormattedTime(baseTime, delta);
};

// Function to check if item belongs to today based on tag or date fields
export const checkByTag = (item) => {
  if (item.status === 'recurring') {
    const currentDate = getCurrentJerusalemGregDate();
    if (item.tag === 'summer' && isDaylightSavingTimeForIsrael(currentDate)) {
      return true;
    }
    if (item.tag === 'winter' && !isDaylightSavingTimeForIsrael(currentDate)) {
      return true;
    }
    if (item.tag) {
      return isEventDay(today, item.tag);
    }
  }
};
export const checkByDate = (item) => {
  if (item.status === 'special') {

    // Convert the strings to Date objects
    const fromDate = setTimeToMidnight(new Date(item.displayFrom));
    const toDate = setTimeToMidnight(new Date(item.displayTo));
    const todayCopy = setTimeToMidnight(today);

    // Check if today is between fromDate and toDate (inclusive)
    if (todayCopy >= fromDate && todayCopy <= toDate) {
      return true;
    } else {
      return false;
    }
  }
}

// Helper function to set the time to midnight
function setTimeToMidnight(date) {
  const newDate = new Date(date);
  newDate.setHours(0, 0, 0, 0);
  return newDate;
}

/**
 * Processes and sorts schedule items based on status and day, considering Motzaei Shabbat adjustments.
 * 
 * @param {Array} items - Array of schedule items to process.
 * @returns {Object} - Object containing processed schedule items categorized by day.
 */
export const processScheduleItems = (items) => {
  // Initial filtering and processing of items
  const processedItems = items.filter(item => item.status === 'default' || checkByTag(item) || checkByDate(item))
    .map(item => {
      return {
        title: item.title,
        hour: item.base === 'constant' ? item.hour : calculateHour(item.delta, item.base, dayModifier(item.day)),
        day: item.day,
        cancelled: item.cancelled || false, // Include the 'cancelled' field for further processing
      };
    });

  // Sort the items
  const sortedItems = processedItems.sort((a, b) => {
    const minutesA = convertHourToMinutes(a.hour);
    const minutesB = convertHourToMinutes(b.hour);
    return minutesA - minutesB;
  });

  // Group items by day
  let scheduleByDay = {
    weekday: sortedItems.filter(item => item.day === 'weekday'),
    Friday: sortedItems.filter(item => item.day === 'Friday'),
    Shabbat: sortedItems.filter(item => item.day === 'Shabbat')
  };

  // Remove items with the same title and day if one of them is marked as cancelled
  const removeCancelledPairs = (items) => {
    const itemsToKeep = [];
    const titlesWithCancelled = new Set();

  // Identify titles marked as cancelled
  items.forEach(item => {
    if (item.title.endsWith(' מבוטלת')) {
      const originalTitle = item.title.replace(' מבוטלת', '').trim();
      titlesWithCancelled.add(originalTitle);
    }
  });

  // Filter items, keeping only those that are not cancelled
  items.forEach(item => {
    const originalTitle = item.title.replace(' מבוטלת', '').trim();
    if (!titlesWithCancelled.has(originalTitle) || item.title.endsWith(' מבוטלת')) {
      itemsToKeep.push(item);
    }
  });

  // Ensure no item with the original title exists
  return itemsToKeep.filter(item => !titlesWithCancelled.has(item.title.replace(' מבוטלת', '').trim()));
};

  scheduleByDay = {
    weekday: removeCancelledPairs(scheduleByDay.weekday),
    Friday: removeCancelledPairs(scheduleByDay.Friday),
    Shabbat: removeCancelledPairs(scheduleByDay.Shabbat)
  };

  return scheduleByDay;
};

/**
 * Determines the day modifier based on whether it's Motzaei Shabbat (Saturday night).
 * 
 * @param {string} eventDay - The day of the event ('Friday', 'Shabbat', etc.).
 * @returns {number} - Modifier: -1 for previous day, 1 for next day, or 0 for no modification.
 */
const dayModifier = (eventDay) => {
  if (eventDay === 'Friday' && today.getDay() === 6) {
    return -1;
  } else if (eventDay !== 'Shabbat' && today.getDay() === 6) {
    return 1;
  } else {
    return 0; // Not Motzaei Shabbat
  }
};

/**
 * Calculates and formats a new time based on the base time and delta (in minutes).
 * 
 * @param {Date} baseTime - The base time for calculation.
 * @param {number} delta - The delta (in minutes) to add to the base time.
 * @returns {string} - The formatted time string in HH:mm format.
 *  
 * Note: The marker roundUp is set to true in order to be stringent (לחומרה).
 */
const calculateFormattedTime = (baseTime, delta) => {
  const calculatedTime = new Date(baseTime.getTime() + delta * 60000);
  let roundUp = true;
  if (delta <= 0) {
    roundUp = false;
  }
  return formatTime(calculatedTime, roundUp);
};

/**
 * Helper function to convert hour string to minutes since midnight.
 * 
 * @param {string} hour - The hour string in HH:mm format.
 * @returns {number} - The total minutes since midnight.
 */
const convertHourToMinutes = (hour) => {
  const [hours, minutes] = hour.split(':').map(Number);
  return hours * 60 + (minutes || 0); // Handle cases where minutes might be undefined
};



