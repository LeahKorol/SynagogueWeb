
// // import React, { useState, useEffect } from 'react';
// // import { addDoc, collection, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
// // import { db } from '../../../firebase';

// // function PrayerTimesForm() {
// //   const [prayerTimes, setPrayerTimes] = useState([]);
// //   const [form, setForm] = useState({
// //     title: '',
// //     day: 'Shabbat',
// //     base: 'constant',
// //     // hour: '',
// //     // delta: 0,
// //     status: 'default',
// //     // tag: '',
// //     // displayFrom: '',
// //     // displayTo: '',
// //     // cancelled: false,
// //   });
// //   const [docId, setDocId] = useState(null);
// //   const [cancelDates, setCancelDates] = useState({ from: '', to: '' });
// //   const [deleteDate, setDeleteDate] = useState('');

// //   const fetchPrayerTimes = async () => {
// //     const querySnapshot = await getDocs(collection(db, "times"));
// //     const times = [];
// //     querySnapshot.forEach(doc => {
// //       times.push({ ...doc.data(), id: doc.id });
// //     });
// //     setPrayerTimes(times);
// //   };

// //   useEffect(() => {
// //     fetchPrayerTimes();
// //   }, []);

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     if (docId) {
// //       await updateDoc(doc(db, "times", docId), form);
// //     } else {
// //       await addDoc(collection(db, "times"), form);
// //     }
// //     fetchPrayerTimes();
// //     resetForm();

// //   };

// //   const resetForm = () => {
// //     setForm({
// //       title: '',
// //       day: 'Shabbat',
// //       base: 'constant',
// //       // hour: '',
// //       // delta: 0,
// //       status: 'default',
// //       // tag: '',
// //       // displayFrom: '',
// //       // displayTo: '',
// //       // cancelled: false,
// //     });
// //     setDocId(null);
// //   };

// //   const handleEdit = (prayer) => {
// //     setForm(prayer);
// //     setDocId(prayer.id);
// //   };

// //   // const handleDelete = async (id) => {
// //   //     await deleteDoc(doc(db, "times", id));
// //   //     fetchPrayerTimes();
// //   // };
// //   const handleDelete = async (id) => {
// //     await deleteDoc(doc(db, "times", id));
// //     fetchPrayerTimes();
// //     resetForm(); // הוספת קריאה לפונקציה resetForm
// //   };

// //   const handleCancelClick = (prayer) => {
// //     if (!cancelDates.from || !cancelDates.to) {
// //         alert('אנא הזן את כל התאריכים הנדרשים.');
// //     } else {
// //         handleCancelForDates(prayer);
// //     }
// // };

// //   const handleCancelForDates = async (prayer) => {
// //     const updatedPrayer = {
// //       ...prayer,
// //       title: `${prayer.title}  מבוטלת`,
// //       status: 'special',
// //       displayFrom: cancelDates.from,
// //       displayTo: cancelDates.to,
// //       cancelled: true,
// //     };
// //     await addDoc(collection(db, "times"), updatedPrayer);
// //     fetchPrayerTimes();
// //   };

// //   return (
// //     <div>
// //       <h2>ניהול זמני תפילות</h2>
// //       <button onClick={resetForm}>הוסף תפילה חדשה</button>
// //       <form onSubmit={handleSubmit}>
// //         <label>
// //           שם התפילה
// //           <input
// //             type="text"
// //             value={form.title}
// //             onChange={(e) => setForm({ ...form, title: e.target.value })}
// //             required
// //           />
// //         </label>
// //         <br />
// //         <label>
// //           יום
// //           <select
// //             value={form.day}
// //             onChange={(e) => setForm({ ...form, day: e.target.value })}
// //           >
// //             <option value="Shabbat">שבת</option>
// //             <option value="Friday">ערב שבת</option>
// //             <option value="weekday">יום חול</option>
// //           </select>
// //         </label>
// //         <br />
// //         <label>
// //           סוג הזמן
// //           <select
// //             value={form.base}
// //             onChange={(e) => setForm({ ...form, base: e.target.value })}
// //           >
// //             <option value="constant">קבוע</option>
// //             <option value="week earliest tzeit">צאת הכוכבים הכי מוקדם השבוע</option>
// //             <option value="tzeit">צאת הכוכבים</option>
// //             <option value="candle lighting">הדלקת נרות</option>
// //             <option value="sunset">שקיעה</option>
// //             <option value="havdala">הבדלה</option>
// //           </select>
// //         </label>
// //         <br />
// //         {form.base === 'constant' ? (
// //           <label>
// //             שעה קבועה
// //             <input
// //               type="time"
// //               value={form.hour}
// //               onChange={(e) => setForm({ ...form, hour: e.target.value })}
// //               required
// //             />
// //           </label>
// //         ) : (
// //           <label>
// //             הפרש זמן (דקות)
// //             <input
// //               type="number"
// //               value={form.delta}
// //               onChange={(e) => setForm({ ...form, delta: parseFloat(e.target.value) })}
// //               required
// //             />
// //           </label>
// //         )}
// //         <br />
// //         <label>
// //           סטטוס
// //           <select
// //             value={form.status}
// //             onChange={(e) => setForm({ ...form, status: e.target.value })}
// //           >
// //             <option value="default">ברירת מחדל</option>
// //             <option value="recurring">מחזורי</option>
// //             <option value="special">מיוחד</option>
// //           </select>
// //         </label>
// //         <br />
// //         {form.status === 'recurring' && (
// //           <label>
// //             תקופה
// //             <select
// //               value={form.tag}
// //               onChange={(e) => setForm({ ...form, tag: e.target.value })}
// //             >
// //               {/* <option value="">בחר תג</option> */}
// //               <option value="summer">שעון קיץ</option>
// //               <option value="winter">שעון חורף</option>
// //               <option value="minor_fast">ימי צום</option>
// //             </select>
// //           </label>
// //         )}
// //         {form.status === 'special' && (
// //           <>
// //             <label>
// //               תאריך התחלה
// //               <input
// //                 type="date"
// //                 value={form.displayFrom}
// //                 onChange={(e) => setForm({ ...form, displayFrom: e.target.value })}
// //                 required
// //               />
// //             </label>
// //             <br />
// //             <label>
// //               תאריך סיום
// //               <input
// //                 type="date"
// //                 value={form.displayTo}
// //                 onChange={(e) => setForm({ ...form, displayTo: e.target.value })}
// //                 required
// //               />
// //             </label>
// //           </>
// //         )}
// //         <br />
// //         <button type="submit">שמור</button>
// //       </form>

// //       <h3>זמני תפילות</h3>
// //       <ul>
// //         {prayerTimes.map((prayer) => (
// //           <li key={prayer.id}>
// //             {prayer.title} - {translateDay(prayer.day)} - {translateBase(prayer.base)} - {prayer.base === 'constant' ? prayer.hour : prayer.delta}
// //             <button onClick={() => handleEdit(prayer)}>ערוך</button>
// //             <button onClick={() => handleDelete(prayer.id)}>מחק</button>
// //             {(prayer.status === 'recurring' || prayer.status === 'default') && (
// //               <>
// //                 <label>
// //                   ביטול לתאריכים
// //                   <input
// //                     type="date"
// //                     value={cancelDates.from}
// //                     onChange={(e) => setCancelDates({ ...cancelDates, from: e.target.value })}
// //                     required
// //                   />
// //                   עד
// //                   <input
// //                     type="date"
// //                     value={cancelDates.to}
// //                     onChange={(e) => setCancelDates({ ...cancelDates, to: e.target.value })}
// //                     required
// //                   />
// //                 </label>
// //                 <button onClick={() => handleCancelClick(prayer)}>
// //                   בטל לתאריכים
// //                 </button>
// //               </>
// //             )}
// //           </li>
// //         ))}
// //       </ul>
// //     </div>
// //   );
// // }


// /*const translateDay = (day) => {
//   switch (day) {
//     case 'Shabbat':
//       return 'שבת';
//     case 'Friday':
//       return 'שישי';
//     case 'weekday':
//       return 'יום חול';
//     default:
//       return day;
//   }
// };

// const translateBase = (base) => {
//   switch (base) {
//     case 'constant':
//       return 'קבוע';
//     case 'week earliest tzeit':
//       return 'זמן מוקדם ביותר בשבוע';
//     case 'tzeit':
//       return 'צאת';
//     case 'candle lighting':
//       return 'הדלקת נרות';
//     case 'sunset':
//       return 'שקיעה';
//     case 'havdala':
//       return 'הבדלה';
//     default:
//       return base;
//   }
// };

// const translateStatus = (status) => {
//   switch (status) {
//     case 'default':
//       return 'ברירת מחדל';
//     case 'recurring':
//       return 'מחזורי';
//     case 'special':
//       return 'מיוחד';
//     default:
//       return status;
//   }
// };

// const translateTag = (tag) => {
//   switch (tag) {
//     case 'summer':
//       return 'קיץ';
//     case 'winter':
//       return 'חורף';
//     case 'minor_fast':
//       return 'צום';
//     default:
//       return tag;
//   }
// };

// const formatDate = (dateString) => {
//   const date = new Date(dateString);
//   const day = String(date.getDate()).padStart(2, '0');
//   const month = String(date.getMonth() + 1).padStart(2, '0');
//   const year = date.getFullYear();
//   return `${day}/${month}/${year}`;
// };
// export default PrayerTimesForm;*/


// import React, { useState, useEffect } from 'react';
// import { addDoc, collection, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
// import { db } from '../../../firebase';

// const translateBase = (base) => {
//   switch (base) {
//     case 'constant':
//       return 'קבוע';
//     case 'week earliest tzeit':
//       return 'הכי מוקדם לפני צאת הכוכבים';
//     case 'tzeit':
//       return 'צאת הכוכבים';
//     case 'candle lighting':
//       return 'הדלקת נרות';
//     case 'sunset':
//       return 'שקיעה';
//     case 'havdala':
//       return 'הבדלה';
//     default:
//       return base;
//   }
// };

// const translateStatus = (status) => {
//   switch (status) {
//     case 'default':
//       return 'ברירת מחדל';
//     case 'recurring':
//       return 'מחזורי';
//     case 'special':
//       return 'מיוחד';
//     default:
//       return status;
//   }
// };
// const translateDay = (day) => {
//   switch (day) {
//     case 'Shabbat':
//       return 'שבת';
//     case 'Friday':
//       return 'ערב שבת';
//     case 'weekday':
//       return 'יום חול';
//     default:
//       return day;
//   }
// };

// const translateTag = (tag) => {
//   switch (tag) {
//     case 'summer':
//       return 'שעון קיץ';
//     case 'winter':
//       return 'שעון חורף';
//     case 'minor_fast':
//       return 'יום צום';
//     default:
//       return tag;
//   }
// };

// function PrayerTimesForm() {
//   const [prayerTimes, setPrayerTimes] = useState([]);
//   const [form, setForm] = useState({
//     title: '',
//     day: 'Shabbat',
//     base: 'constant',
//     status: 'default',
//     hour: '',
//     delta: '',
//     displayFrom: '',
//     displayTo: '',
//     tag: ''
//   });
//   const [docId, setDocId] = useState(null);
//   const [cancelDates, setCancelDates] = useState({ from: '', to: '' });

//   const fetchPrayerTimes = async () => {
//     const querySnapshot = await getDocs(collection(db, "times"));
//     const times = [];
//     querySnapshot.forEach(doc => {
//       times.push({ ...doc.data(), id: doc.id });
//     });
//     setPrayerTimes(times);
//   };

//   useEffect(() => {
//     fetchPrayerTimes();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Construct the prayer data object with relevant fields only
//     const prayerData = {
//       title: form.title,
//       day: form.day,
//       base: form.base,
//       status: form.status,
//       ...(form.base === 'constant' && { hour: form.hour }),
//       ...(form.base !== 'constant' && { delta: form.delta }),
//       ...(form.status === 'special' && { displayFrom: form.displayFrom, displayTo: form.displayTo }),
//       ...(form.status === 'recurring' && { tag: form.tag }),
//     };

//     if (docId) {
//       await updateDoc(doc(db, "times", docId), prayerData);
//     } else {
//       await addDoc(collection(db, "times"), prayerData);
//     }

//     fetchPrayerTimes();
//     resetForm();
//   };

//   const resetForm = () => {
//     setForm({
//       title: '',
//       day: 'Shabbat',
//       base: 'constant',
//       status: 'default',
//       hour: '',
//       delta: '',
//       displayFrom: '',
//       displayTo: '',
//       tag: ''
//     });
//     setDocId(null);
//     setCancelDates({ from: '', to: '' });
//   };

//   const handleEdit = (prayer) => {
//     setForm({
//       title: prayer.title,
//       day: prayer.day,
//       base: prayer.base,
//       status: prayer.status,
//       hour: prayer.hour || '',
//       delta: prayer.delta || '',
//       displayFrom: prayer.displayFrom || '',
//       displayTo: prayer.displayTo || '',
//       tag: prayer.tag || ''
//     });
//     setDocId(prayer.id);
//   };

//   const handleDelete = async (id) => {
//     await deleteDoc(doc(db, "times", id));
//     fetchPrayerTimes();
//     resetForm();
//   };



//   const handleCancelClickWrapper = (prayer) => {
//     const dates = cancelDates[prayer.id];
//     if (!dates?.from || !dates?.to) {
//       alert('אנא הזן את כל התאריכים הנדרשים.');
//     } else {
//       handleCancelForDates(prayer, dates);
//     }
//   };

//   // const handleCancelClick = (prayer) => {
//   //   if (!cancelDates.from || !cancelDates.to) {
//   //     alert('אנא הזן את כל התאריכים הנדרשים.');
//   //   } else {
//   //     handleCancelForDates(prayer);
//   //   }
//   // };

//   const handleCancelForDates = async (prayer, dates) => {
//     const updatedPrayer = {
//       ...prayer,
//       title: `${prayer.title} מבוטלת`,
//       status: 'special',
//       displayFrom: dates.from,
//       displayTo: dates.to,
//       cancelled: true,
//     };
//     await addDoc(collection(db, "times"), updatedPrayer);
//     fetchPrayerTimes();
//   };

//   const [showCancelFields, setShowCancelFields] = useState({});

//   const toggleCancelFields = (id) => {
//     setShowCancelFields((prevState) => ({
//       ...prevState,
//       [id]: !prevState[id],
//     }));
//   };

//   const handleDateChange = (id, field, value) => {
//     setCancelDates((prevState) => ({
//       ...prevState,
//       [id]: {
//         ...prevState[id],
//         [field]: value,
//       },
//     }));
//   };

//   return (
//     <div>
//       <h2>ניהול זמני תפילות</h2>
//       <button onClick={resetForm}>הוסף תפילה חדשה</button>
//       <form onSubmit={handleSubmit}>
//         <label>
//           שם התפילה
//           <input
//             type="text"
//             value={form.title}
//             onChange={(e) => setForm({ ...form, title: e.target.value })}
//             required
//           />
//         </label>
//         <br />
//         <label>
//           יום
//           <select
//             value={form.day}
//             onChange={(e) => setForm({ ...form, day: e.target.value })}
//           >
//             <option value="Shabbat">שבת</option>
//             <option value="Friday">ערב שבת</option>
//             <option value="weekday">יום חול</option>
//           </select>
//         </label>
//         <br />
//         <label>
//           סוג הזמן
//           <select
//             value={form.base}
//             onChange={(e) => setForm({ ...form, base: e.target.value })}
//           >
//             <option value="constant">קבוע</option>
//             <option value="week earliest tzeit">הכי מוקדם לפני צאת הכוכבים</option>
//             <option value="tzeit">צאת הכוכבים</option>
//             <option value="candle lighting">הדלקת נרות</option>
//             <option value="sunset">שקיעה</option>
//             <option value="havdala">הבדלה</option>
//           </select>
//         </label>
//         <br />
//         {form.base === 'constant' ? (
//           <label>
//             שעה קבועה
//             <input
//               type="time"
//               value={form.hour}
//               onChange={(e) => setForm({ ...form, hour: e.target.value })}
//               required
//             />
//           </label>
//         ) : (
//           <label>
//             הפרש זמן (דקות)
//             <input
//               type="number"
//               value={form.delta}
//               onChange={(e) => setForm({ ...form, delta: e.target.value })}
//               required
//             />
//           </label>
//         )}
//         <br />
//         <label>
//           סטטוס
//           <select
//             value={form.status}
//             onChange={(e) => setForm({ ...form, status: e.target.value })}
//           >
//             <option value="default">ברירת מחדל</option>
//             <option value="recurring">מחזורי</option>
//             <option value="special">מיוחד</option>
//           </select>
//         </label>
//         <br />
//         {form.status === 'recurring' && (
//           <label>
//             תקופה
//             <select
//               value={form.tag}
//               onChange={(e) => setForm({ ...form, tag: e.target.value })}
//             >
//               <option value="">בחר תג</option>
//               <option value="summer">שעון קיץ</option>
//               <option value="winter">שעון חורף</option>
//               <option value="minor_fast">יום צום</option>
//             </select>
//           </label>
//         )}
//         {form.status === 'special' && (
//           <>
//             <label>
//               תאריך התחלה
//               <input
//                 type="date"
//                 value={form.displayFrom}
//                 onChange={(e) => setForm({ ...form, displayFrom: e.target.value })}
//                 required
//               />
//             </label>
//             <br />
//             <label>
//               תאריך סיום
//               <input
//                 type="date"
//                 value={form.displayTo}
//                 onChange={(e) => setForm({ ...form, displayTo: e.target.value })}
//                 required
//               />
//             </label>
//           </>
//         )}
//         <br />
//         <button type="submit">שמור</button>
//       </form>

//       <h3>זמני תפילות</h3>
//       <ul>
//         {prayerTimes.map((prayer) => (
//           <li key={prayer.id}>
//             {prayer.title} - {translateDay(prayer.day)} - {translateBase(prayer.base)} - {prayer.base === 'constant' ? prayer.hour : `${prayer.delta} דקות`} - {translateStatus(prayer.status)}
//             {prayer.status === 'recurring' && ` - ${translateTag(prayer.tag)}`}
//             {prayer.status === 'special' && ` - ${prayer.displayFrom} עד ${prayer.displayTo}`}
//             <button onClick={() => handleEdit(prayer)}>ערוך</button>
//             <button onClick={() => handleDelete(prayer.id)}>מחק</button>
//             {(prayer.status === 'recurring' || prayer.status === 'default') && (
//               <>
//                 <button onClick={() => toggleCancelFields(prayer.id)}>
//                   + ביטול לתאריכים
//                 </button>
//                 {showCancelFields[prayer.id] && (
//                   <>
//                     <label>
//                       מ
//                       <input
//                         type="date"
//                         value={cancelDates[prayer.id]?.from || ''}
//                         onChange={(e) => handleDateChange(prayer.id, 'from', e.target.value)}
//                         required
//                       />
//                       עד
//                       <input
//                         type="date"
//                         value={cancelDates[prayer.id]?.to || ''}
//                         onChange={(e) => handleDateChange(prayer.id, 'to', e.target.value)}
//                         required
//                       />
//                     </label>
//                     <button onClick={() => handleCancelClickWrapper(prayer)}>
//                       בטל לתאריכים
//                     </button>
//                   </>
//                 )}
//               </>
//             )}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default PrayerTimesForm;

import React, { useState, useEffect, useRef } from 'react';
import { addDoc, collection, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../../firebase';
import './PrayerTimesForm.css';  // Make sure to create this CSS file

const translateBase = (base) => {
  switch (base) {
    case 'constant': return 'קבוע';
    case 'week earliest tzeit': return 'הכי מוקדם לפני צאת הכוכבים';
    case 'tzeit': return 'צאת הכוכבים';
    case 'candle lighting': return 'הדלקת נרות';
    case 'sunset': return 'שקיעה';
    case 'havdala': return 'הבדלה';
    default: return base;
  }
};

const translateStatus = (status) => {
  switch (status) {
    case 'default': return 'ברירת מחדל';
    case 'recurring': return 'מחזורי';
    case 'special': return 'מיוחד';
    default: return status;
  }
};

const translateDay = (day) => {
  switch (day) {
    case 'Shabbat': return 'שבת';
    case 'Friday': return 'ערב שבת';
    case 'weekday': return 'יום חול';
    default: return day;
  }
};

const translateTag = (tag) => {
  switch (tag) {
    case 'summer': return 'שעון קיץ';
    case 'winter': return 'שעון חורף';
    case 'minor_fast': return 'יום צום';
    default: return tag;
  }
};

function PrayerTimesForm() {
  const [prayerTimes, setPrayerTimes] = useState([]);
  const [form, setForm] = useState({
    title: '',
    day: 'Shabbat',
    base: 'constant',
    status: 'default',
    hour: '',
    delta: '',
    displayFrom: '',
    displayTo: '',
    tag: ''
  });
  const [docId, setDocId] = useState(null);
  const [cancelDates, setCancelDates] = useState({});
  const [showCancelFields, setShowCancelFields] = useState({});
  const formHeadingRef = useRef(null);

  const fetchPrayerTimes = async () => {
    const querySnapshot = await getDocs(collection(db, "times"));
    const times = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
    setPrayerTimes(times);
  };

  useEffect(() => {
    fetchPrayerTimes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const prayerData = {
      title: form.title,
      day: form.day,
      base: form.base,
      status: form.status,
      ...(form.base === 'constant' && { hour: form.hour }),
      ...(form.base !== 'constant' && { delta: form.delta }),
      ...(form.status === 'special' && { displayFrom: form.displayFrom, displayTo: form.displayTo }),
      ...(form.status === 'recurring' && { tag: form.tag }),
    };

    if (docId) {
      await updateDoc(doc(db, "times", docId), prayerData);
    } else {
      await addDoc(collection(db, "times"), prayerData);
    }

    fetchPrayerTimes();
    resetForm();
  };

  const resetForm = () => {
    setForm({
      title: '',
      day: 'Shabbat',
      base: 'constant',
      status: 'default',
      hour: '',
      delta: '',
      displayFrom: '',
      displayTo: '',
      tag: ''
    });
    setDocId(null);
    setCancelDates({});
  };

  const handleEdit = (prayer) => {
    setForm({
      title: prayer.title,
      day: prayer.day,
      base: prayer.base,
      status: prayer.status,
      hour: prayer.hour || '',
      delta: prayer.delta || '',
      displayFrom: prayer.displayFrom || '',
      displayTo: prayer.displayTo || '',
      tag: prayer.tag || ''
    });
    setDocId(prayer.id);
    
    // Scroll to the form heading
    if (formHeadingRef.current) {
      formHeadingRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const handleDelete = async (id) => {
    const isConfirmed = window.confirm('האם אתה בטוח שברצונך למחוק פריט זה?');
    
    if (isConfirmed) {
      await deleteDoc(doc(db, "times", id));
      fetchPrayerTimes();
      resetForm();
    }
  };

  const handleCancelClickWrapper = (prayer) => {
    const dates = cancelDates[prayer.id];
    if (!dates?.from || !dates?.to) {
      alert('אנא הזן את כל התאריכים הנדרשים.');
    } else {
      handleCancelForDates(prayer, dates);
    }
  };

  const handleCancelForDates = async (prayer, dates) => {
    const updatedPrayer = {
      ...prayer,
      title: `${prayer.title} מבוטלת`,
      status: 'special',
      displayFrom: dates.from,
      displayTo: dates.to,
      cancelled: true,
    };
    await addDoc(collection(db, "times"), updatedPrayer);
    fetchPrayerTimes();
  };

  const toggleCancelFields = (id) => {
    setShowCancelFields(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleDateChange = (id, field, value) => {
    setCancelDates(prev => ({
      ...prev,
      [id]: { ...prev[id], [field]: value },
    }));
  };

  return (
    <div className="prayer-times-form">
      <h2 ref={formHeadingRef}>ניהול זמני תפילות</h2>
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
        <label>
          יום
          <select
            value={form.day}
            onChange={(e) => setForm({ ...form, day: e.target.value })}
          >
            <option value="Shabbat">שבת</option>
            <option value="Friday">ערב שבת</option>
            <option value="weekday">יום חול</option>
          </select>
        </label>
        <label>
          סוג הזמן
          <select
            value={form.base}
            onChange={(e) => setForm({ ...form, base: e.target.value })}
          >
            <option value="constant">קבוע</option>
            <option value="week earliest tzeit">הכי מוקדם לפני צאת הכוכבים</option>
            <option value="tzeit">צאת הכוכבים</option>
            <option value="candle lighting">הדלקת נרות</option>
            <option value="sunset">שקיעה</option>
            <option value="havdala">הבדלה</option>
          </select>
        </label>
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
            הפרש זמן (דקות)
            <input
              type="number"
              value={form.delta}
              onChange={(e) => setForm({ ...form, delta: e.target.value })}
              required
            />
          </label>
        )}
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
        {form.status === 'recurring' && (
          <label>
            תקופה
            <select
              value={form.tag}
              onChange={(e) => setForm({ ...form, tag: e.target.value })}
            >
              <option value="">בחר תג</option>
              <option value="summer">שעון קיץ</option>
              <option value="winter">שעון חורף</option>
              <option value="minor_fast">יום צום</option>
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
        <button type="submit">שמור</button>
      </form>

      <h3>זמני תפילות</h3>
      <ul className="prayer-list">
        {prayerTimes.map((prayer) => (
          <li key={prayer.id} className="prayer-item">
            <div className="prayer-content">
              <span>
                {prayer.title} - {translateDay(prayer.day)} - {translateBase(prayer.base)} - 
                {prayer.base === 'constant' ? prayer.hour : `${prayer.delta} דקות`} - 
                {translateStatus(prayer.status)}
                {prayer.status === 'recurring' && ` - ${translateTag(prayer.tag)}`}
                {prayer.status === 'special' && ` - ${prayer.displayFrom} עד ${prayer.displayTo}`}
              </span>
              <div className="prayer-actions">
                <button className="btn btn-update" onClick={() => handleEdit(prayer)}>
                  <i className="fas fa-edit"></i>
                </button>
                <button className="btn btn-delete" onClick={() => handleDelete(prayer.id)}>
                  <i className="fas fa-trash-alt"></i>
                </button>
              </div>
            </div>
            {(prayer.status === 'recurring' || prayer.status === 'default') && (
              <div className="cancel-section">
                <button onClick={() => toggleCancelFields(prayer.id)}>
                  + ביטול לתאריכים
                </button>
                {showCancelFields[prayer.id] && (
                  <div className="cancel-fields">
                    <label>
                      מ
                      <input
                        type="date"
                        value={cancelDates[prayer.id]?.from || ''}
                        onChange={(e) => handleDateChange(prayer.id, 'from', e.target.value)}
                        required
                      />
                    </label>
                    <label>
                      עד
                      <input
                        type="date"
                        value={cancelDates[prayer.id]?.to || ''}
                        onChange={(e) => handleDateChange(prayer.id, 'to', e.target.value)}
                        required
                      />
                    </label>
                    <button onClick={() => handleCancelClickWrapper(prayer)}>
                      בטל לתאריכים
                    </button>
                  </div>
                )}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PrayerTimesForm;

