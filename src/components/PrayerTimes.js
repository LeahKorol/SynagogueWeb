import React from 'react';
import PropTypes from 'prop-types';

function PrayerTimes({ weekdayTimes, shabbatTimes }) {
  return (
    <section className="prayersTime">
      <h1 className="heading">זמני תפילות</h1>
      <div className="box-container">
        <div className="schedule">
          <h2>זמני יום חול</h2>
          <ul>
            <li>שחרית - {weekdayTimes.shacharit}</li>
            <li>מנחה גדולה - {weekdayTimes.mincha_gedola}</li>
            <li>מנחה - {weekdayTimes.mincha} (15 דקות לפני שקיעה)</li>
            <li>ערבית מנין א' - {weekdayTimes.arvit_1} (20 דקות לאחר שקיעה)</li>
            <li>ערבית מנין ב' - {weekdayTimes.arvit_2}</li>
          </ul>
        </div>
        
        <div className="schedule">
          <h2>זמני שבת קודש (לפי שעון קיץ)</h2>
          <ul>
            <li>מנחה ערב שבת קודש - {shabbatTimes.mincha_erev_shabbat} (בכניסת שבת)</li>
            <li>ערבית של שבת קודש - {shabbatTimes.arvit_shabbat} (30 דקות לאחר כניסת השבת)</li>
            <li>שחרית של שבת קודש - {shabbatTimes.shacharit_shabbat}</li>
            <li>מנחה גדולה - {shabbatTimes.mincha_gedola_shabbat}</li>
            <li>מנחה קטנה - {shabbatTimes.mincha_ketana_shabbat} (לפי זמני כניסת השבת)</li>
            <li>ערבית של מוצאי שבת - במוצאי השבת</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

PrayerTimes.propTypes = {
  weekdayTimes: PropTypes.shape({
    shacharit: PropTypes.string.isRequired,
    mincha_gedola: PropTypes.string.isRequired,
    mincha: PropTypes.string.isRequired,
    arvit_1: PropTypes.string.isRequired,
    arvit_2: PropTypes.string.isRequired,
  }).isRequired,
  shabbatTimes: PropTypes.shape({
    mincha_erev_shabbat: PropTypes.string.isRequired,
    arvit_shabbat: PropTypes.string.isRequired,
    shacharit_shabbat: PropTypes.string.isRequired,
    mincha_gedola_shabbat: PropTypes.string.isRequired,
    mincha_ketana_shabbat: PropTypes.string.isRequired,
  }).isRequired,
};

export default PrayerTimes;