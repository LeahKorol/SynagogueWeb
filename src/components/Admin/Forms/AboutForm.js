import React, { useState, useEffect } from 'react';
import { addDoc, collection, getDoc, doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../../firebase';

function AboutForm() {
  const [aboutData, setAboutData] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [files, setFiles] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAboutData({ ...aboutData, [name]: value });
  };

  const handleFileChange = (e, fileType) => {
    setFiles({ ...files, [fileType]: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let updatedData = { ...aboutData };

      for (const fileType in files) {
        const file = files[fileType];
        if (file) {
          const storageRef = ref(storage, `about/${file.name}`);
          await uploadBytes(storageRef, file);
          const downloadURL = await getDownloadURL(storageRef);
          updatedData[fileType] = downloadURL;
        }
      }

      if (editMode) {
        const docRef = doc(db, 'about', 'about-data');
        await updateDoc(docRef, updatedData);
      } else {
        await addDoc(collection(db, 'about'), { ...updatedData, id: 'about-data' });
      }
      setAboutData({});
      setFiles({});
    } catch (error) {
      console.error('Error adding/updating document: ', error);
    }
  };

  const fetchAboutData = async () => {
    try {
      const docRef = doc(db, 'about', 'about-data');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setAboutData(docSnap.data());
        setEditMode(true);
      }
    } catch (error) {
      console.error('Error fetching document: ', error);
    }
  };

  useEffect(() => {
    fetchAboutData();
  }, []);

  return (
    <div>
      <h3>Manage About Us</h3>
      <form onSubmit={handleSubmit}>
        <label>
          About
          <textarea
            name="about"
            value={aboutData.about || ''}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Friends List PDF
          <input
            type="file"
            onChange={(e) => handleFileChange(e, 'friendsList')}
          />
        </label>
        <br />
        <label>
          Rules PDF
          <input
            type="file"
            onChange={(e) => handleFileChange(e, 'rules')}
          />
        </label>
        <br />
        <button type="submit">{editMode ? 'Update' : 'Add'}</button>
      </form>
    </div>
  );
}

export default AboutForm;
