// import React, { useState, useEffect } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTrash, faFileAlt, faFileImage, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
// import { db } from '../../../firebase';
// import './AboutForm.css';

// function AboutForm() {
//   const [files, setFiles] = useState({
//     friendsList: null,
//     rules: null,
//   });
//   const [deleteConfirm, setDeleteConfirm] = useState(null);

//   // Simulating existing files (replace with actual data fetching logic)
//   useEffect(() => {
//     setFiles({
//       friendsList: { name: 'existing_friends_list.pdf', type: 'application/pdf' },
//       rules: { name: 'existing_rules.docx', type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' },
//     });
//   }, []);

//   const handleFileChange = async (e, fileType) => {
//     const file = e.target.files[0];
//     const storageRef = ref(storage, `${fileType}/${file.name}`);
    
//     try {
//       await uploadBytes(storageRef, file);
//       await setDoc(doc(firestore, "files", fileType), {
//         name: file.name,
//         type: file.type,
//       });
//       setFiles({ ...files, [fileType]: file });
//     } catch (error) {
//       console.error("Error uploading file: ", error);
//     }
//   };

//   const handleFileRemove = (fileType) => {
//     setDeleteConfirm(fileType);
//   };

//   const confirmDelete = async () => {
//     const fileType = deleteConfirm;
//     const file = files[fileType];
//     const storageRef = ref(storage, `${fileType}/${file.name}`);
    
//     try {
//       await deleteObject(storageRef);
//       await deleteDoc(doc(firestore, "files", fileType));
//       setFiles({ ...files, [fileType]: null });
//       setDeleteConfirm(null);
//     } catch (error) {
//       console.error("Error deleting file: ", error);
//     }
//   };

//   const cancelDelete = () => {
//     setDeleteConfirm(null);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('Files:', files);
//     // Reset form if needed
//   };

//   const renderFilePreview = (file, fileType) => (
//     <div className="file-preview" key={fileType}>
//       <div className="file-icon">
//         <FontAwesomeIcon icon={faFileAlt} size="4x" />
//         <p>{file.name}</p>
//       </div>
//       <button className="delete-button" onClick={() => handleFileRemove(fileType)}>
//         <FontAwesomeIcon icon={faTrash} /> מחק
//       </button>
//     </div>
//   );

//   return (
//     <div className="event-gallery-form">
//       <h3 className="form-title">אודות הקהילה</h3>
//       <form onSubmit={handleSubmit}>
//         <div className="file-container">
//           <div className="file-column">
//             <h4>טופס חברי הקהילה</h4>
//             {files.friendsList ? (
//               renderFilePreview(files.friendsList, 'friendsList')
//             ) : (
//               <label className="file-label">
//                 <FontAwesomeIcon icon={faFileImage} /> העלה קובץ
//                 <input
//                   type="file"
//                   className="file-input"
//                   onChange={(e) => handleFileChange(e, 'friendsList')}
//                 />
//               </label>
//             )}
//           </div>
//           <div className="file-column">
//             <h4>טופס תקנון הקהילה</h4>
//             {files.rules ? (
//               renderFilePreview(files.rules, 'rules')
//             ) : (
//               <label className="file-label">
//                 <FontAwesomeIcon icon={faFileAlt} /> העלה קובץ
//                 <input
//                   type="file"
//                   className="file-input"
//                   onChange={(e) => handleFileChange(e, 'rules')}
//                 />
//               </label>
//             )}
//           </div>
//         </div>
//         <div className="button-container">
//           <button type="submit" className="btn-save">שלח</button>
//         </div>
//       </form>
//       {deleteConfirm && (
//         <div className="delete-confirm-overlay">
//           <div className="delete-confirm-modal">
//             <FontAwesomeIcon icon={faExclamationTriangle} size="3x" color="#f44336" />
//             <h4>האם אתה בטוח שברצונך למחוק קובץ זה?</h4>
//             <p>{files[deleteConfirm].name}</p>
//             <div className="delete-confirm-buttons">
//               <button onClick={confirmDelete} className="btn-confirm">כן, מחק</button>
//               <button onClick={cancelDelete} className="btn-cancel">ביטול</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default AboutForm;
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