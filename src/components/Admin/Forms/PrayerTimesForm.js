
// import React, { useState, useEffect } from 'react';
// import { addDoc, collection, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
// import { db } from '../../../firebase';

// function PrayerTimesForm() {
//     const [prayerTimes, setPrayerTimes] = useState([]);
//     const [form, setForm] = useState({
//         title: '',
//         day: 'Shabbat',
//         base: 'constant',
//         hour: '',
//         delta: 0,
//         status: 'default',
//         tag: '',
//         displayFrom: '',
//         displayTo: '',
//     });
//     const [docId, setDocId] = useState(null);
//     const [deleteDate, setDeleteDate] = useState('');

//     const fetchPrayerTimes = async () => {
//         const querySnapshot = await getDocs(collection(db, "times"));
//         const times = [];
//         querySnapshot.forEach(doc => {
//             times.push({ ...doc.data(), id: doc.id });
//         });
//         setPrayerTimes(times);
//     };

//     useEffect(() => {
//         fetchPrayerTimes();
//     }, []);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (docId) {
//             await updateDoc(doc(db, "times", docId), form);
//         } else {
//             await addDoc(collection(db, "times"), form);
//         }
//         fetchPrayerTimes();
//         resetForm();
//     };

//     const resetForm = () => {
//         setForm({
//             title: '',
//             day: 'Shabbat',
//             base: 'constant',
//             hour: '',
//             delta: 0,
//             status: 'default',
//             tag: '',
//             displayFrom: '',
//             displayTo: '',
//         });
//         setDocId(null);
//     };

//     const handleEdit = (prayer) => {
//         setForm(prayer);
//         setDocId(prayer.id);
//     };

//     const handleDelete = async (id) => {
//         await deleteDoc(doc(db, "times", id));
//         fetchPrayerTimes();
//     };

//     const handleDeleteByDate = async (prayer) => {
//         const updatedPrayer = {
//             ...prayer,
//             status: 'special',
//             displayFrom: deleteDate,
//             displayTo: deleteDate,
//             cancelled: true,
//         };
//         await updateDoc(doc(db, "times", prayer.id), updatedPrayer);
//         fetchPrayerTimes();
//     };

//     return (
//         <div>
//             <h2>ניהול זמני תפילות</h2>
//             <button onClick={resetForm}>הוסף תפילה חדשה</button>
//             <form onSubmit={handleSubmit}>
//                 <label>
//                     שם התפילה
//                     <input
//                         type="text"
//                         value={form.title}
//                         onChange={(e) => setForm({ ...form, title: e.target.value })}
//                         required
//                     />
//                 </label>
//                 <br />
//                 <label>
//                     יום
//                     <select
//                         value={form.day}
//                         onChange={(e) => setForm({ ...form, day: e.target.value })}
//                     >
//                         <option value="Shabbat">שבת</option>
//                         <option value="Friday">שישי</option>
//                         <option value="weekday">יום חול</option>
//                     </select>
//                 </label>
//                 <br />
//                 <label>
//                     סוג הזמן
//                     <select
//                         value={form.base}
//                         onChange={(e) => setForm({ ...form, base: e.target.value })}
//                     >
//                         <option value="constant">קבוע</option>
//                         <option value="week earliest tzeit">צאת הכוכבים הכי מוקדם השבוע</option>
//                         <option value="tzeit">צאת הכוכבים</option>
//                         <option value="candle lighting">הדלקת נרות</option>
//                         <option value="sunset">שקיעה</option>
//                         <option value="havdala">הבדלה</option>
//                     </select>
//                 </label>
//                 <br />
//                 {form.base === 'constant' ? (
//                     <label>
//                         שעה קבועה
//                         <input
//                             type="time"
//                             value={form.hour}
//                             onChange={(e) => setForm({ ...form, hour: e.target.value })}
//                         />
//                     </label>
//                 ) : (
//                     <label>
//                         הפרש זמן (שעות)
//                         <input
//                             type="number"
//                             value={form.delta}
//                             onChange={(e) => setForm({ ...form, delta: parseFloat(e.target.value) })}
//                         />
//                     </label>
//                 )}
//                 <br />
//                 <label>
//                     סטטוס
//                     <select
//                         value={form.status}
//                         onChange={(e) => setForm({ ...form, status: e.target.value })}
//                     >
//                         <option value="default">ברירת מחדל</option>
//                         <option value="recurring">מחזורי</option>
//                         <option value="special">מיוחד</option>
//                     </select>
//                 </label>
//                 <br />
//                 {form.status === 'recurring' && (
//                     <label>
//                         תגים
//                         <select
//                             value={form.tag}
//                             onChange={(e) => setForm({ ...form, tag: e.target.value })}
//                         >
//                             <option value="">בחר תג</option>
//                             <option value="summer">קיץ</option>
//                             <option value="winter">חורף</option>
//                             <option value="minor_fast">צום</option>
//                         </select>
//                     </label>
//                 )}
//                 {form.status === 'special' && (
//                     <>
//                         <label>
//                             תאריך התחלה
//                             <input
//                                 type="date"
//                                 value={form.displayFrom}
//                                 onChange={(e) => setForm({ ...form, displayFrom: e.target.value })}
//                             />
//                         </label>
//                         <br />
//                         <label>
//                             תאריך סיום
//                             <input
//                                 type="date"
//                                 value={form.displayTo}
//                                 onChange={(e) => setForm({ ...form, displayTo: e.target.value })}
//                             />
//                         </label>
//                     </>
//                 )}
//                 <br />
//                 <button type="submit">שמור</button>
//             </form>

//             <h3>זמני תפילות</h3>
//             <ul>
//                 {prayerTimes.map((prayer) => (
//                     <li key={prayer.id}>
//                         {prayer.title} - {translateDay(prayer.day)} - {translateBase(prayer.base)} - {prayer.base === 'constant' ? prayer.hour : prayer.delta}
//                         <button onClick={() => handleEdit(prayer)}>ערוך</button>
//                         <button onClick={() => handleDelete(prayer.id)}>מחק</button>
//                         {(prayer.status === 'recurring' || prayer.status === 'default') && (
//                             <>
//                                 <label>
//                                     תאריך מחיקה
//                                     <input
//                                         type="date"
//                                         value={deleteDate}
//                                         onChange={(e) => setDeleteDate(e.target.value)}
//                                     />
//                                 </label>
//                                 <button onClick={() => handleDeleteByDate(prayer)}>מחק לפי תאריך</button>
//                             </>
//                         )}
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// }

// const translateDay = (day) => {
//     switch (day) {
//         case 'Shabbat':
//             return 'שבת';
//         case 'Friday':
//             return 'שישי';
//         case 'weekday':
//             return 'יום חול';
//         default:
//             return day;
//     }
// };

// const translateBase = (base) => {
//     switch (base) {
//         case 'constant':
//             return 'קבוע';
//         case 'week earliest tzeit':
//             return 'זמן מוקדם ביותר בשבוע';
//         case 'tzeit':
//             return 'צאת';
//         case 'candle lighting':
//             return 'הדלקת נרות';
//         case 'sunset':
//             return 'שקיעה';
//         case 'havdala':
//             return 'הבדלה';
//         default:
//             return base;
//     }
// };

// const translateStatus = (status) => {
//     switch (status) {
//         case 'default':
//             return 'ברירת מחדל';
//         case 'recurring':
//             return 'מחזורי';
//         case 'special':
//             return 'מיוחד';
//         default:
//             return status;
//     }
// };

// const translateTag = (tag) => {
//     switch (tag) {
//         case 'summer':
//             return 'קיץ';
//         case 'winter':
//             return 'חורף';
//         case 'minor_fast':
//             return 'צום';
//         default:
//             return tag;
//     }
// };

// const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     const day = String(date.getDate()).padStart(2, '0');
//     const month = String(date.getMonth() + 1).padStart(2, '0'); // January is 0
//     const year = date.getFullYear();
//     return `${day}/${month}/${year}`;
// };

// export default PrayerTimesForm;
import React, { useState, useEffect } from 'react';
import { addDoc, collection, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../../firebase';

function PrayerTimesForm() {
  const [prayerTimes, setPrayerTimes] = useState([]);
  const [form, setForm] = useState({
    title: '',
    day: 'Shabbat',
    base: 'constant',
    hour: '',
    // delta: 0,
    status: 'default',
    // tag: '',
    // displayFrom: '',
    // displayTo: '',
    // cancelled: false,
  });
  const [docId, setDocId] = useState(null);
  const [cancelDates, setCancelDates] = useState({ from: '', to: '' });
  const [deleteDate, setDeleteDate] = useState('');

  const fetchPrayerTimes = async () => {
    const querySnapshot = await getDocs(collection(db, "times"));
    const times = [];
    querySnapshot.forEach(doc => {
      times.push({ ...doc.data(), id: doc.id });
    });
    setPrayerTimes(times);
  };

  useEffect(() => {
    fetchPrayerTimes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (docId) {
      await updateDoc(doc(db, "times", docId), form);
    } else {
      await addDoc(collection(db, "times"), form);
    }
    fetchPrayerTimes();
    resetForm();
  };

  const resetForm = () => {
    setForm({
      title: '',
      day: 'Shabbat',
      base: 'constant',
      hour: '',
      // delta: 0,
      status: 'default',
      // tag: '',
      // displayFrom: '',
      // displayTo: '',
      // cancelled: false,
    });
    setDocId(null);
  };

  const handleEdit = (prayer) => {
    setForm(prayer);
    setDocId(prayer.id);
  };

  // const handleDelete = async (id) => {
  //     await deleteDoc(doc(db, "times", id));
  //     fetchPrayerTimes();
  // };
  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "times", id));
    fetchPrayerTimes();
    resetForm(); // הוספת קריאה לפונקציה resetForm
  };

  const handleCancelClick = (prayer) => {
    if (!cancelDates.from || !cancelDates.to) {
        alert('אנא הזן את כל התאריכים הנדרשים.');
    } else {
        handleCancelForDates(prayer);
    }
};

  const handleCancelForDates = async (prayer) => {
    const updatedPrayer = {
      ...prayer,
      title: `${prayer.title}  מבוטלת`,
      status: 'special',
      displayFrom: cancelDates.from,
      displayTo: cancelDates.to,
      cancelled: true,
    };
    await addDoc(collection(db, "times"), updatedPrayer);
    fetchPrayerTimes();
  };

  return (
    <div>
      <h2>ניהול זמני תפילות</h2>
      <button onClick={resetForm}>הוסף תפילה חדשה</button>
      <form onSubmit={handleSubmit}>
        <label>
          שם התפילה
          <input
            type="text"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />
        </label>
        <br />
        <label>
          יום
          <select
            value={form.day}
            onChange={(e) => setForm({ ...form, day: e.target.value })}
          >
            <option value="Shabbat">שבת</option>
            <option value="Friday">שישי</option>
            <option value="weekday">יום חול</option>
          </select>
        </label>
        <br />
        <label>
          סוג הזמן
          <select
            value={form.base}
            onChange={(e) => setForm({ ...form, base: e.target.value })}
          >
            <option value="constant">קבוע</option>
            <option value="week earliest tzeit">צאת הכוכבים הכי מוקדם השבוע</option>
            <option value="tzeit">צאת הכוכבים</option>
            <option value="candle lighting">הדלקת נרות</option>
            <option value="sunset">שקיעה</option>
            <option value="havdala">הבדלה</option>
          </select>
        </label>
        <br />
        {form.base === 'constant' ? (
          <label>
            שעה קבועה
            <input
              type="time"
              value={form.hour}
              onChange={(e) => setForm({ ...form, hour: e.target.value })}
              required
            />
          </label>
        ) : (
          <label>
            הפרש זמן (שעות)
            <input
              type="number"
              value={form.delta}
              onChange={(e) => setForm({ ...form, delta: parseFloat(e.target.value) })}
              required
            />
          </label>
        )}
        <br />
        <label>
          סטטוס
          <select
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
          >
            <option value="default">ברירת מחדל</option>
            <option value="recurring">מחזורי</option>
            <option value="special">מיוחד</option>
          </select>
        </label>
        <br />
        {form.status === 'recurring' && (
          <label>
            תקופה
            <select
              value={form.tag}
              onChange={(e) => setForm({ ...form, tag: e.target.value })}
            >
              {/* <option value="">בחר תג</option> */}
              <option value="summer">שעון קיץ</option>
              <option value="winter">שעון חורף</option>
              <option value="minor_fast">ימי צום</option>
            </select>
          </label>
        )}
        {form.status === 'special' && (
          <>
            <label>
              תאריך התחלה
              <input
                type="date"
                value={form.displayFrom}
                onChange={(e) => setForm({ ...form, displayFrom: e.target.value })}
                required
              />
            </label>
            <br />
            <label>
              תאריך סיום
              <input
                type="date"
                value={form.displayTo}
                onChange={(e) => setForm({ ...form, displayTo: e.target.value })}
                required
              />
            </label>
          </>
        )}
        <br />
        <button type="submit">שמור</button>
      </form>

      <h3>זמני תפילות</h3>
      <ul>
        {prayerTimes.map((prayer) => (
          <li key={prayer.id}>
            {prayer.title} - {translateDay(prayer.day)} - {translateBase(prayer.base)} - {prayer.base === 'constant' ? prayer.hour : prayer.delta}
            <button onClick={() => handleEdit(prayer)}>ערוך</button>
            <button onClick={() => handleDelete(prayer.id)}>מחק</button>
            {(prayer.status === 'recurring' || prayer.status === 'default') && (
              <>
                <label>
                  ביטול לתאריכים
                  <input
                    type="date"
                    value={cancelDates.from}
                    onChange={(e) => setCancelDates({ ...cancelDates, from: e.target.value })}
                    required
                  />
                  עד
                  <input
                    type="date"
                    value={cancelDates.to}
                    onChange={(e) => setCancelDates({ ...cancelDates, to: e.target.value })}
                    required
                  />
                </label>
                <button onClick={() => handleCancelClick(prayer)}>
                  בטל לתאריכים
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

const translateDay = (day) => {
  switch (day) {
    case 'Shabbat':
      return 'שבת';
    case 'Friday':
      return 'שישי';
    case 'weekday':
      return 'יום חול';
    default:
      return day;
  }
};

const translateBase = (base) => {
  switch (base) {
    case 'constant':
      return 'קבוע';
    case 'week earliest tzeit':
      return 'זמן מוקדם ביותר בשבוע';
    case 'tzeit':
      return 'צאת';
    case 'candle lighting':
      return 'הדלקת נרות';
    case 'sunset':
      return 'שקיעה';
    case 'havdala':
      return 'הבדלה';
    default:
      return base;
  }
};

const translateStatus = (status) => {
  switch (status) {
    case 'default':
      return 'ברירת מחדל';
    case 'recurring':
      return 'מחזורי';
    case 'special':
      return 'מיוחד';
    default:
      return status;
  }
};

const translateTag = (tag) => {
  switch (tag) {
    case 'summer':
      return 'קיץ';
    case 'winter':
      return 'חורף';
    case 'minor_fast':
      return 'צום';
    default:
      return tag;
  }
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

export default PrayerTimesForm;
