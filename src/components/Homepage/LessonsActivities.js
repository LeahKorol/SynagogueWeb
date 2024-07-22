// import React, { useEffect, useState } from 'react';
// import { collection, getDocs } from 'firebase/firestore';
// import { db } from '../../firebase';
// import './LessonsActivities.css'

// function LessonsActivities() {
//   const [lessons, setLessons] = useState([]);

//   useEffect(() => {
//     const fetchLessons = async () => {
//       try {
//         const querySnapshot = await getDocs(collection(db, "lessonsActivities"));
//         const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//         setLessons(data);
//       } catch (e) {
//         console.error("Error fetching documents: ", e);
//       }
//     };

//     fetchLessons();
//   }, []);
  
//   return (
//     <section className="lessons-activities">
//       <h1 className="heading">שיעורים קבועים</h1>
//       <div className="lessons-container">
//         {lessons.map((lesson, index) => (
//           <div className="lesson" key={lesson.id}>
//             <h2 className="title-lesson">{lesson.title}</h2>
//             <p><i className="fas fa-clock"></i> {lesson.time}</p>
//             <p><i className="fas fa-building"></i> {lesson.location}</p>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }

// export default LessonsActivities;


import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import { getDafYomi } from '../../utils/dateFunctions';
import './LessonsActivities.css'

function LessonsActivities() {
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "lessonsActivities"));
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setLessons(data);
      } catch (e) {
        console.error("Error fetching documents: ", e);
      }
    };

    fetchLessons();
  }, []);

  const getDayName = (day, short = false) => {
    const dayNames = {
      sunday: short ? 'א\'' : 'ראשון',
      monday: short ? 'ב\'' : 'שני',
      tuesday: short ? 'ג\'' : 'שלישי',
      wednesday: short ? 'ד\'' : 'רביעי',
      thursday: short ? 'ה\'' : 'חמישי',
      friday: short ? 'ו\'' : 'שישי',
      saturday: short ? 'ש\'' : 'שבת'
    };
    return dayNames[day];
  };

  const formatDays = (daysOfWeek) => {
    if (!daysOfWeek || daysOfWeek.length === 0) return 'כל יום';
    if (daysOfWeek.length === 7) return 'כל יום';
    if (daysOfWeek.length === 1) return `יום ${getDayName(daysOfWeek[0])}`;
    return `ימים: ${daysOfWeek.map(day => getDayName(day, true)).join(', ')}`;
  };

  return (
    <section className="lessons-activities">
      <h1 className="heading">שיעורים קבועים</h1>
      <h3>{dafYomi}</h3>
      <div className="lessons-container">
        {lessons.map((lesson) => (
          <div className="lesson" key={lesson.id}>
            <h2 className="title-lesson">{lesson.title}</h2>
            <p>
              <i className="fas fa-clock"></i> {formatDays(lesson.daysOfWeek)} בשעה {lesson.time}
              {lesson.endTime && ` עד שעה ${lesson.endTime}`}
            </p>
            <p><i className="fas fa-building"></i> {lesson.location}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default LessonsActivities;