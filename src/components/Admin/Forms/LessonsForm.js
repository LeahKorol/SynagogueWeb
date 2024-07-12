import React, { useState, useEffect } from 'react';
import { addDoc, collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../firebase';
import './LessonsForm.css';

function LessonsForm() {
  const [lessons, setLessons] = useState([]);
  const [lesson, setLesson] = useState({ title: "", time: "", location: "", endTime: "", showEndTime: false });
  const [editingLesson, setEditingLesson] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchLessons = async () => {
    const querySnapshot = await getDocs(collection(db, "lessonsActivities"));
    const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setLessons(data);
  };

  useEffect(() => {
    fetchLessons();
  }, []);

  const updateForm = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setLesson({ ...lesson, [name]: checked });
    } else {
      setLesson({ ...lesson, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (lesson.showEndTime && lesson.time >= lesson.endTime) {
      setErrorMessage("שעת סיום לא חוקית - אנא הזן שנית");
      return;
    }

    setErrorMessage("");
    
    if (editingLesson) {
      await updateDoc(doc(db, "lessonsActivities", editingLesson.id), lesson);
      setEditingLesson(null);
    } else {
      await addDoc(collection(db, "lessonsActivities"), lesson);
    }
    setLesson({ title: "", time: "", location: "", endTime: "", showEndTime: false });
    fetchLessons();
  };

  const handleEdit = (lesson) => {
    setLesson({
      title: lesson.title,
      time: lesson.time,
      location: lesson.location,
      endTime: lesson.endTime || "",
      showEndTime: !!lesson.endTime
    });
    setEditingLesson(lesson);
  };

  const handleDelete = async (id) => {
    const isConfirmed = window.confirm("האם אתה בטוח שברצונך למחוק שיעור זה?");
    if (isConfirmed) {
      try {
        const docRef = doc(db, "lessonsActivities", id);
        await deleteDoc(docRef);
        fetchLessons(); 
      } catch (e) {
        console.error("Error deleting document: ", e);
      }
    }
  };

  return (
    <div className="lessons-form">
      <h2>שיעורים קבועים</h2>
      <ul className="lessons-list">
        {lessons.map(lesson => (
          <li key={lesson.id} className="lesson-item">
            <strong>{lesson.title}</strong> {lesson.time} {lesson.endTime && `עד ${lesson.endTime}`} - {lesson.location}
            <div className="lesson-actions">
              <button className="btn btn-update" onClick={() => handleEdit(lesson)}>
                <i className="fas fa-edit"></i>
              </button>
              <button className="btn btn-delete" onClick={() => handleDelete(lesson.id)}>
                <i className="fas fa-trash-alt"></i>
              </button>
            </div>
          </li>
        ))}
      </ul>
      <form className="lessons-form-inner" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>כותרת</label>
          <input
            name="title"
            value={lesson.title}
            type="text"
            onChange={updateForm}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>זמן התחלה</label>
          <input
            name="time"
            value={lesson.time}
            type="time"
            onChange={updateForm}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>
            <input
              type="checkbox"
              name="showEndTime"
              checked={lesson.showEndTime}
              onChange={updateForm}
            />
            הוסף שעת סיום
          </label>
          {lesson.showEndTime && (
            <div className="form-group">
              <label>שעת סיום</label>
              <input
                name="endTime"
                value={lesson.endTime}
                type="time"
                onChange={updateForm}
                className="form-input"
              />
            </div>
          )}
        </div>
        <div className="form-group">
          <label>מיקום</label>
          <input
            name="location"
            value={lesson.location}
            type="text"
            onChange={updateForm}
            className="form-input"
          />
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button type="submit" className="btn btn-save">
          {editingLesson ? "עדכן" : "הוסף"}
        </button>
      </form>
    </div>
  );
}

export default LessonsForm;
