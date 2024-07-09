import React, { useState } from 'react';

function AnnouncementForm({ onSubmit }) {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [description, setDescription] = useState('');
  const [addImage, setAddImage] = useState(false);
  const [image, setImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) {
      alert('הכותרת היא שדה חובה');
      return;
    }
    const formData = {
      title,
      date,
      startTime,
      endTime,
      description,
      image: addImage ? image : null,
    };
    onSubmit(formData);
  };

  return (
    <form className="announcement-form" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">כותרת פרסום (חובה):</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="date">תאריך:</label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <div className="time-container">
        <label htmlFor="startTime">שעת התחלה:</label>
        <input
          type="time"
          id="startTime"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />
        <label htmlFor="endTime">שעת סיום:</label>
        <input
          type="time"
          id="endTime"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="description">תיאור:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>
      <div>
        <label htmlFor="addImage">הוסף תמונה:</label>
        <input
          type="checkbox"
          id="addImage"
          checked={addImage}
          onChange={(e) => setAddImage(e.target.checked)}
        />
      </div>
      {addImage && (
        <div>
          <label htmlFor="image">תמונה:</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
      )}
      <button type="submit">שלח</button>
    </form>
  );
}

export default AnnouncementForm;
