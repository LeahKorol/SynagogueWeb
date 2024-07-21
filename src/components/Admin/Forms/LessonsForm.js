import React, { useState, useEffect } from 'react';
import { addDoc, collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../firebase';
import './LessonsForm.css';

function LessonsForm() {
  const [lessons, setLessons] = useState([]);
  const [lesson, setLesson] = useState({ 
    title: "", 
    time: "", 
    location: "", 
    endTime: "", 
    showEndTime: false,
    daysOfWeek: []
  });
  const [editingLesson, setEditingLesson] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedOption, setSelectedOption] = useState('all');

  const fetchLessons = async () => {
    const querySnapshot = await getDocs(collection(db, "lessonsActivities"));
    const data = querySnapshot.docs.map(doc => {
      const lessonData = doc.data();
      return { 
        id: doc.id, 
        ...lessonData,
        daysOfWeek: lessonData.daysOfWeek || []
      };
    });
    setLessons(data);
  };

  useEffect(() => {
    fetchLessons();
  }, []);

  const updateForm = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      if (name === "showEndTime") {
        setLesson({ ...lesson, [name]: checked, endTime: checked ? lesson.endTime : "" });
      } else if (name === "daysOfWeek") {
        const updatedDays = checked
          ? [...lesson.daysOfWeek, value]
          : lesson.daysOfWeek.filter(day => day !== value);
        setLesson({ ...lesson, daysOfWeek: updatedDays });
      }
    } else {
      setLesson({ ...lesson, [name]: value });
    }
  };

  const formatTime = (time) => {
    if (!time) return '';
    let [hours, minutes] = time.split(':');
    hours = parseInt(hours);
    if (hours === 0) hours = 24;  // שינוי חצות מ-00 ל-24
    return `${hours.toString().padStart(2, '0')}:${minutes}`;
  };

  const parseTime = (timeString) => {
    const [hours, minutes] = timeString.split(':').map(Number);
    return { hours: hours === 24 ? 0 : hours, minutes };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (lesson.showEndTime) {
      const startTime = parseTime(lesson.time);
      const endTime = parseTime(lesson.endTime);
      if (
        startTime.hours > endTime.hours ||
        (startTime.hours === endTime.hours && startTime.minutes >= endTime.minutes)
      ) {
        setErrorMessage("שעת סיום לא חוקית - אנא הזן שנית");
        return;
      }
    }
  
    if (!lesson.title || !lesson.time || !lesson.location) {
      setErrorMessage("יש למלא את כל השדות החובה: כותרת, זמן התחלה ומיקום.");
      return;
    }
  
    setErrorMessage("");
    
    const lessonToSave = {
      ...lesson,
      time: formatTime(lesson.time),
      endTime: lesson.showEndTime ? formatTime(lesson.endTime) : ""
    };
    
    if (editingLesson) {
      await updateDoc(doc(db, "lessonsActivities", editingLesson.id), lessonToSave);
      setEditingLesson(null);
    } else {
      await addDoc(collection(db, "lessonsActivities"), lessonToSave);
    }
    setLesson({ title: "", time: "", location: "", endTime: "", showEndTime: false, daysOfWeek: [] });
    fetchLessons();
  };

  const handleEdit = (lesson) => {
    setLesson({
      title: lesson.title,
      time: lesson.time,
      location: lesson.location,
      endTime: lesson.endTime || "",
      showEndTime: !!lesson.endTime,
      daysOfWeek: lesson.daysOfWeek || []
    });
    setEditingLesson(lesson);
    setSelectedOption(lesson.daysOfWeek && lesson.daysOfWeek.length === 7 ? 'all' : 'specific');
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

  const getDayName = (day, short = false) => {
    const dayNames = {
      sunday: short ? 'א\'' : 'יום ראשון',
      monday: short ? 'ב\'' : 'יום שני',
      tuesday: short ? 'ג\'' : 'יום שלישי',
      wednesday: short ? 'ד\'' : 'יום רביעי',
      thursday: short ? 'ה\'' : 'יום חמישי',
      friday: short ? 'ו\'' : 'יום שישי',
      saturday: short ? 'ש\'' : 'יום שבת'
    };
    return dayNames[day];
  };

  return (
    <div className="lessons-form">
      <h2>שיעורים קבועים</h2>
      <ul className="lessons-list">
        {lessons.map(lesson => (
          <li key={lesson.id} className="lesson-item">
            <strong>{lesson.title}</strong>: {' '}
            {lesson.daysOfWeek && lesson.daysOfWeek.length ? (
              lesson.daysOfWeek.length === 7 ? (
                <>כל יום</>
              ) : (
                <>ימים: {lesson.daysOfWeek.map(day => getDayName(day, true)).join(', ')}</>
              )
            ) : (
              <>יום לא צוין</>
            )}
            {' '}בשעה {formatTime(lesson.time)}
            {lesson.endTime && ` עד שעה ${formatTime(lesson.endTime)}`} - {lesson.location}
            <div className="lesson-actions">
              <button className="btn-lessons btn-update" onClick={() => handleEdit(lesson)}>
                <i className="fas fa-edit"></i>
              </button>
              <button className="btn-lessons btn-delete" onClick={() => handleDelete(lesson.id)}>
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
            required
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
            required
            step="1"
          />
        </div>
        <div className="form-group">
          <label>
            <input
              type="checkbox"
              name="showEndTime"
              checked={lesson.showEndTime}
              onChange={updateForm}
              required
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
                step="1"
                required
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
            required
          />
        </div>
        <div className="form-group">
          <label>יום השיעור</label>
          <div>
            <label>
              <input
                type="radio"
                name="dayOption"
                value="all"
                checked={selectedOption === 'all'}
                onChange={(e) => {
                  setSelectedOption(e.target.value);
                  setLesson({ ...lesson, daysOfWeek: ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'] });
                }}
                required
              />
              כל יום
            </label>
            <label>
              <input
                type="radio"
                name="dayOption"
                value="specific"
                checked={selectedOption === 'specific'}
                onChange={(e) => {
                  setSelectedOption(e.target.value);
                  setLesson({ ...lesson, daysOfWeek: [] });
                }}
                required
              />
              ימים ספציפיים
            </label>
          </div>
          
          {selectedOption === 'specific' && (
            <div>
              {['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'].map((day) => (
                <label key={day}>
                  <input
                    type="checkbox"
                    name="daysOfWeek"
                    value={day}
                    checked={lesson.daysOfWeek.includes(day)}
                    onChange={updateForm}
                    required
                  />
                  {getDayName(day)}
                </label>
              ))}
            </div>
          )}
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button type="submit" className="btn-lessons btn-save">
          {editingLesson ? "עדכן" : "הוסף"}
        </button>
      </form>
    </div>
  );
}

export default LessonsForm;