import React, { useState, useEffect } from 'react';
import { addDoc, collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from '../firebase';

function EventGalleryForm() {
  const [eventGallery, setEventGallery] = useState([]);
  const [image, setImage] = useState(null);

  const fetchEventGallery = async () => {
    const querySnapshot = await getDocs(collection(db, "eventGallery"));
    const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setEventGallery(data);
  };

  useEffect(() => {
    fetchEventGallery();
  }, []);

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (image) {
      const imageRef = ref(storage, `eventGallery/${image.name}`);
      await uploadBytes(imageRef, image);
      const url = await getDownloadURL(imageRef);
      const imageName = image.name;

      await addDoc(collection(db, "eventGallery"), { url, name: imageName });

      setImage(null);
      fetchEventGallery();
    }
  };

  const handleDelete = async (id, name) => {
    if (name) {
      const imageRef = ref(storage, `eventGallery/${name}`);
      try {
        await deleteObject(imageRef);
        console.log(`Image ${name} deleted successfully from storage`);
      } catch (error) {
        console.error("Error deleting image from storage:", error);
      }
    } else {
      console.error("Image name is undefined");
    }
    await deleteDoc(doc(db, "eventGallery", id));
    fetchEventGallery();
  };

  return (
    <div>
      <h2>אולם אירועים - ניהול תמונות</h2>
      <ul>
        {eventGallery.map(image => (
          <li key={image.id}>
            <img src={image.url} alt="אירוע" width="100" />
            <button onClick={() => handleDelete(image.id, image.name)}>מחק</button>
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <label>
          תמונה
          <input type="file" onChange={handleFileChange} />
        </label>
        <button type="submit">שמור</button>
      </form>
    </div>
  );
}

export default EventGalleryForm;
