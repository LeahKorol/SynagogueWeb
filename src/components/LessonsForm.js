import React, { useState, useEffect } from 'react';
import { addDoc, collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

function LessonsForm() {
  const [lessons, setLessons] = useState([]);
  const [lesson, setLesson] = useState({ title: "", time: "", location: "" });
  const [editingLesson, setEditingLesson] = useState(null);

  const fetchLessons = async () => {
    const querySnapshot = await getDocs(collection(db, "lessonsActivities"));
    const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setLessons(data);
  };

  useEffect(() => {
    fetchLessons();
  }, []);

  const updateForm = (e) => {
    e.preventDefault();
    setLesson({ ...lesson, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingLesson) {
      await updateDoc(doc(db, "lessonsActivities", editingLesson.id), lesson);
      setEditingLesson(null);
    } else {
      await addDoc(collection(db, "lessonsActivities"), lesson);
    }
    setLesson({ title: "", time: "", location: "" });
    fetchLessons();
  };

  const handleEdit = (lesson) => {
    setLesson({ title: lesson.title, time: lesson.time, location: lesson.location });
    setEditingLesson(lesson);
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "lessonsActivities", id));
    fetchLessons();
  };

  return (
    <div>
      <h2>שיעורים קבועים</h2>
      <ul>
        {lessons.map(lesson => (
          <li key={lesson.id}>
            <strong>{lesson.title}</strong>: {lesson.time} - {lesson.location}
            <button onClick={() => handleEdit(lesson)}>ערוך</button>
            <button onClick={() => handleDelete(lesson.id)}>מחק</button>
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <label>
          כותרת
          <input
            name="title"
            value={lesson.title}
            type="text"
            onChange={updateForm}
          />
        </label>
        <label>
          זמן
          <input
            name="time"
            value={lesson.time}
            type="text"
            onChange={updateForm}
          />
        </label>
        <label>
          מיקום
          <input
            name="location"
            value={lesson.location}
            type="text"
            onChange={updateForm}
          />
        </label>
        <button type="submit">{editingLesson ? "עדכן" : "שמור"}</button>
      </form>
    </div>
  );
}

export default LessonsForm;
