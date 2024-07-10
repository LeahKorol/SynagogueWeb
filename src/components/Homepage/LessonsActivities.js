import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
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
  
  return (
    <section className="lessons-activities">
      <h1 className="heading">שיעורים קבועים</h1>
      <div className="lessons-container">
        {lessons.map((lesson, index) => (
          <div className="lesson" key={lesson.id}>
            <h2 className="title-lesson">{lesson.title}</h2>
            <p><i className="fas fa-clock"></i> {lesson.time}</p>
            <p><i className="fas fa-building"></i> {lesson.location}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default LessonsActivities;
