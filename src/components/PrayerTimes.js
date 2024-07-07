import React from 'react';

function PrayerTimes() {
  return (
    <section className="prayersTime">
      <h1 className="heading">זמני תפילות</h1>
      <div className="box-container">
        <div className="schedule">
          <h2>זמני יום חול</h2>
          <ul>
            <li>שחרית - 06:15</li>
            <li>מנחה גדולה - 13:15</li>
            <li>מנחה - 19:33 (15 דקות לפני שקיעה)</li>
            <li>מנחה גדולה - 13:00</li>
            <li>ערבית מנין א' - 20:08 (20 דקות לאחר שקיעה)</li>
            <li>ערבית מנין ב' - 21:50</li>
          </ul>
        </div>

        <div className="schedule">
          <h2>זמני שבת קודש (לפי שעון קיץ)</h2>
          <ul>
            <li>מנחה ערב שבת קודש - 19:08 (בכניסת שבת)</li>
            <li>ערבית של שבת קודש - 19:38 (30 דקות לאחר כניסת השבת)</li>
            <li>שחרית של שבת קודש - 08:30</li>
            <li>מנחה גדולה - 12:30</li>
            <li>מנחה קטנה - 19:10 (לפי זמני כניסת השבת)</li>
            <li>ערבית של מוצאי שבת - במוצאי השבת</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default PrayerTimes;
