import React, { useState, useEffect } from 'react';
import { addDoc, collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from '../../../firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImages, faTrash } from '@fortawesome/free-solid-svg-icons';
import './EventGalleryForm.css';

function EventGalleryForm() {
  const [eventGallery, setEventGallery] = useState([]);
  const [isMaxImagesReached, setIsMaxImagesReached] = useState(false);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [imageName, setImageName] = useState('');
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ show: false, message: '', type: 'info' });

  const fetchEventGallery = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "eventGallery"));
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setEventGallery(data);
      setIsMaxImagesReached(data.length >= 10);
    } catch (error) {
      console.error("Error fetching event gallery:", error);
      showAlert('שגיאה בטעינת הגלריה', 'error');
    }
    setLoading(false);
  };
  
  useEffect(() => {
    fetchEventGallery();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setImage(file);
      setImageName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      showAlert('נא לבחור קובץ תמונה תקין', 'warning');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (eventGallery.length >= 10) {
      showAlert("לא ניתן להוסיף יותר מ-10 תמונות. מחק תמונה קיימת כדי להוסיף חדשה.", 'warning');
      return;
    }
    if (!image) {
      showAlert('נא לבחור תמונה להעלאה', 'warning');
      return;
    }
    if (!imageName.trim()) {
      showAlert('נא להזין שם לתמונה', 'warning');
      return;
    }
  
    setLoading(true);
    try {
      const imageRef = ref(storage, `eventGallery/${imageName}`);
      await uploadBytes(imageRef, image);
      const url = await getDownloadURL(imageRef);
      const docRef = await addDoc(collection(db, "eventGallery"), { url, name: imageName });
      const newImageData = { id: docRef.id, url, name: imageName };
      setEventGallery(prevGallery => [newImageData, ...prevGallery]);
      
      setImage(null);
      setPreview(null);
      setImageName('');
      showAlert('התמונה הועלתה בהצלחה', 'success');
    } catch (error) {
      console.error("Error uploading image:", error);
      showAlert('שגיאה בהעלאת התמונה', 'error');
    }
    setLoading(false);
  };

  const confirmDelete = (id, name) => {
    if (window.confirm('האם אתה בטוח שברצונך למחוק תמונה זו?')) {
      handleDelete(id, name);
    }
  };

  const handleDelete = async (id, name) => {
    setLoading(true);
    try {
      if (name) {
        const imageRef = ref(storage, `eventGallery/${name}`);
        await deleteObject(imageRef);
      }
      await deleteDoc(doc(db, "eventGallery", id));
      fetchEventGallery();
      showAlert('התמונה נמחקה בהצלחה', 'success');
    } catch (error) {
      console.error("Error deleting image:", error);
      showAlert('שגיאה במחיקת התמונה', 'error');
    }
    setLoading(false);
  };

  const showAlert = (message, type) => {
    setAlert({ show: true, message, type });
    setTimeout(() => setAlert({ show: false, message: '', type: 'info' }), 5000);
  };

  const handleCancel = () => {
    setImage(null);
    setPreview(null);
    setImageName('');
  };

  return (
    <div className="event-gallery-form">
      <h2 className="form-title">אולם אירועים - ניהול תמונות</h2>

      {alert.show && (
        <div className={`alert alert-${alert.type}`}>
          {alert.message}
          <button onClick={() => setAlert({ ...alert, show: false })} className="alert-close">&times;</button>
        </div>
      )}

      <div className="image-grid">
        {eventGallery.map(image => (
          <div key={image.id} className="image-item">
            <div className="image-preview">
              <img src={image.url} alt={image.name} />
              <div className="image-overlay">
                <button
                  onClick={() => confirmDelete(image.id, image.name)}
                  className="delete-button"
                  disabled={loading}
                >
                  <FontAwesomeIcon icon={faTrash} /> מחק
                </button>
              </div>
            </div>
            <button
              onClick={() => confirmDelete(image.id, image.name)}
              className="delete-button mobile-delete-button"
              disabled={loading}
            >
              <FontAwesomeIcon icon={faTrash} /> מחק
            </button>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="upload-form">
      <input
        type="file"
        onChange={handleFileChange}
        accept="image/*"
        id="image-upload"
        className="file-input"
        disabled={eventGallery.length >= 10}
      />
      <label htmlFor="image-upload" className={`file-label ${eventGallery.length >= 10 ? 'disabled' : ''}`}>
        <FontAwesomeIcon icon={faImages} /> בחר תמונה
      </label>
      {eventGallery.length >= 10 && (
        <p style={{ color: 'red' }}>
          לא ניתן להוסיף יותר מ-10 תמונות. מחק תמונה קיימת כדי להוסיף חדשה.
        </p>
      )}
      {preview && (
        <div className="preview-container">
          <img src={preview} alt="Preview" className="image-preview" />
          <input
            type="text"
            value={imageName}
            onChange={(e) => setImageName(e.target.value)}
            placeholder="שם התמונה"
            className="image-name-input"
          />
          <div className="button-group">
            <button
              type="submit"
              disabled={!image || loading || eventGallery.length >= 10}
              className="btn-save"
            >
              {loading ? 'טוען...' : 'שמור'}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="btn-cancel"
            >
              ביטול
            </button>
          </div>
        </div>
      )}
    </form>
    </div>
  );
}

export default EventGalleryForm;