// import React, { useState, useEffect } from 'react';
// import { addDoc, collection, getDoc, doc, updateDoc } from 'firebase/firestore';
// import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
// import { db, storage } from '../../../firebase';

// function AboutForm() {
//   const [aboutData, setAboutData] = useState({});
//   const [editMode, setEditMode] = useState(false);
//   const [files, setFiles] = useState({});

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setAboutData({ ...aboutData, [name]: value });
//   };

//   const handleFileChange = (e, fileType) => {
//     setFiles({ ...files, [fileType]: e.target.files[0] });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       let updatedData = { ...aboutData };

//       for (const fileType in files) {
//         const file = files[fileType];
//         if (file) {
//           const storageRef = ref(storage, `about/${file.name}`);
//           await uploadBytes(storageRef, file);
//           const downloadURL = await getDownloadURL(storageRef);
//           updatedData[fileType] = downloadURL;
//         }
//       }

//       if (editMode) {
//         const docRef = doc(db, 'about', 'about-data');
//         await updateDoc(docRef, updatedData);
//       } else {
//         await addDoc(collection(db, 'about'), { ...updatedData, id: 'about-data' });
//       }
//       setAboutData({});
//       setFiles({});
//     } catch (error) {
//       console.error('Error adding/updating document: ', error);
//     }
//   };

//   const fetchAboutData = async () => {
//     try {
//       const docRef = doc(db, 'about', 'about-data');
//       const docSnap = await getDoc(docRef);
//       if (docSnap.exists()) {
//         setAboutData(docSnap.data());
//         setEditMode(true);
//       }
//     } catch (error) {
//       console.error('Error fetching document: ', error);
//     }
//   };

//   useEffect(() => {
//     fetchAboutData();
//   }, []);

//   return (
//     <div>
//       <h3>Manage About Us</h3>
//       <form onSubmit={handleSubmit}>
//         <label>
//           Friends List PDF
//           <input
//             type="file"
//             onChange={(e) => handleFileChange(e, 'friendsList')}
//             required
//           />
//         </label>
//         <br />
//         <label>
//           Rules PDF
//           <input
//             type="file"
//             onChange={(e) => handleFileChange(e, 'rules')}
//             required
//           />
//         </label>
//         <br />
//         <button type="submit-about">{editMode ? 'עדכן' : 'הוסף'}</button>
//       </form>
//     </div>
//   );
// }

// export default AboutForm;



import React, { useState, useEffect } from 'react';
import { addDoc, collection, getDoc, doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from '../../../firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faTrash, faFilePdf } from '@fortawesome/free-solid-svg-icons';

function AboutForm() {
  const [aboutData, setAboutData] = useState({
    friendsList: '',
    rules: ''
  });
  const [editMode, setEditMode] = useState(false);
  const [files, setFiles] = useState({});
  const [showDeleteConfirm, setShowDeleteConfirm] = useState({
    friendsList: false,
    rules: false
  });

  const handleFileChange = (e, fileType) => {
    const file = e.target.files[0];
    setFiles({ ...files, [fileType]: file });
  };

  const handleDeleteFile = async (fileType) => {
    try {
      if (aboutData[fileType]) {
        const fileRef = ref(storage, aboutData[fileType]);
        await deleteObject(fileRef);
      }
      setAboutData({ ...aboutData, [fileType]: '' });
      setShowDeleteConfirm({ ...showDeleteConfirm, [fileType]: false });
    } catch (error) {
      console.error('Error deleting file: ', error);
    }
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

      const docRef = doc(db, 'about', 'about-data');
      if (editMode) {
        await updateDoc(docRef, updatedData);
      } else {
        await addDoc(collection(db, 'about'), { ...updatedData, id: 'about-data' });
      }
      setAboutData(updatedData);
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
      <h3>ניהול עמוד אודות</h3>
      <form onSubmit={handleSubmit}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {['friendsList', 'rules'].map((fileType) => (
            <div key={fileType} style={{ width: '48%' }}>
              <label>{fileType === 'friendsList' ? 'רשימת חברים ' : 'תקנון '}</label>
              {aboutData[fileType] ? (
                <div>
                  <a href={aboutData[fileType]} target="_blank" rel="noopener noreferrer">
                    <div style={{ 
                      width: '100px', 
                      height: '100px', 
                      border: '1px solid #ccc', 
                      display: 'flex', 
                      justifyContent: 'center', 
                      alignItems: 'center',
                      marginBottom: '10px'
                    }}>
                      <FontAwesomeIcon icon={faFilePdf} size="3x" />
                    </div>
                  </a>
                  {showDeleteConfirm[fileType] ? (
                    <div>
                      <button type="button" onClick={() => handleDeleteFile(fileType)}>
                        אישור מחיקה
                      </button>
                      <button type="button" onClick={() => setShowDeleteConfirm({ ...showDeleteConfirm, [fileType]: false })}>
                        ביטול
                      </button>
                    </div>
                  ) : (
                    <button type="button" onClick={() => setShowDeleteConfirm({ ...showDeleteConfirm, [fileType]: true })}>
                      <FontAwesomeIcon icon={faTrash} /> מחק
                    </button>
                  )}
                </div>
              ) : (
                <div>
                  <input
                    type="file"
                    id={`file-${fileType}`}
                    onChange={(e) => handleFileChange(e, fileType)}
                    style={{ display: 'none' }}
                    accept="application/pdf"
                  />
                  <label htmlFor={`file-${fileType}`} style={{ cursor: 'pointer' }}>
                    <FontAwesomeIcon icon={faUpload} /> העלה קובץ
                  </label>
                </div>
              )}
            </div>
          ))}
        </div>
        <button type="submit" style={{ marginTop: '20px' }}>שמור שינויים</button>
      </form>
    </div>
  );
}

export default AboutForm;