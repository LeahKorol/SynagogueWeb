// import React, { useState, useEffect } from 'react';
// import { addDoc, collection, getDocs, updateDoc, doc } from 'firebase/firestore';
// import { db } from '../../../firebase';

// function HallDetailsForm() {
//     const [phone, setPhone] = useState('');
//     const [name, setName] = useState('');
//     const [docId, setDocId] = useState(null);
  
//     const fetchHallDetails = async () => {
//       const querySnapshot = await getDocs(collection(db, "hallDetails"));
//       if (!querySnapshot.empty) {
//         const data = querySnapshot.docs[0];
//         setPhone(data.data().phone);
//         setName(data.data().name);
//         setDocId(data.id);
//       }
//     };
  
//     useEffect(() => {
//       fetchHallDetails();
//     }, []);
  

//     const handlePhoneChange = (e) => {
//       const value = e.target.value;
//       if (!/^\d*$/.test(value)) {
//         alert('מספר טלפון חייב להכיל ספרות בלבד');
//         return;
//       }
//       setPhone(value);
//     };
  
//     const handleNameChange = (e) => {
//       const value = e.target.value;
//       if (/\d/.test(value)) {
//         alert('שם לא יכול להכיל מספרים');
//         return;
//       }
//       setName(value);
//     };

//     const handleSubmit = async (e) => {
//       e.preventDefault();
//       if (docId) {
//         await updateDoc(doc(db, "hallDetails", docId), { phone, name });
//       } else {
//         const docRef = await addDoc(collection(db, "hallDetails"), { phone, name });
//         setDocId(docRef.id);
//       }

//       if (!phone) {
//         alert('יש להזין מספר טלפון');
//         return;
//       }
//       if (!name) {
//         alert('יש להזין שם');
//         return;
//       }
//     };
  
//     return (
//       <div>
//         <h2>ניהול פרטים נוספים</h2>
//         <form onSubmit={handleSubmit}>
//           <label>
//             טלפון לפרטים נוספים
//             <input
//               type="tel"
//               name="phone"
//               value={phone}
//               onChange={handlePhoneChange}
//             />
//           </label>
//           <br />
//           <label>
//             שם
//             <input
//               type="text"
//               name="name"
//               value={name}
//               onChange={handleNameChange}
//             />
//           </label>
//           <br />
//           <button type="submit">שמור</button>
//         </form>
//       </div>
//     );
//   }
  
//   export default HallDetailsForm;
import React, { useState, useEffect, useRef } from 'react';
import { addDoc, collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '../../../firebase';

function HallDetailsForm() {
  const [formData, setFormData] = useState({
    phone: '',
    name: ''
  });
  const [editData, setEditData] = useState({
    id: '',
    phone: '',
    name: ''
  });
  const [originalData, setOriginalData] = useState({});
  const formRef = useRef(null);
  const [docId, setDocId] = useState(null);

  const fetchHallDetails = async () => {
    const querySnapshot = await getDocs(collection(db, "hallDetails"));
    if (!querySnapshot.empty) {
      const data = querySnapshot.docs[0];
      const details = { id: data.id, phone: data.data().phone, name: data.data().name };
      setFormData(details);
      setOriginalData(details);
      setDocId(data.id);
    }
  };

  useEffect(() => {
    fetchHallDetails();

    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target) && editData.id) {
        setFormData(originalData);
        setEditData({ id: '', phone: '', name: '' });
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [editData, originalData]);

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    if (!/^\d*$/.test(value)) {
      alert('מספר טלפון חייב להכיל ספרות בלבד');
      return;
    }
    setEditData((prevData) => ({
      ...prevData,
      phone: value,
    }));
  };

  const handleNameChange = (e) => {
    const value = e.target.value;
    if (/\d/.test(value)) {
      alert('שם לא יכול להכיל מספרים');
      return;
    }
    setEditData((prevData) => ({
      ...prevData,
      name: value,
    }));
  };

  const handleEditFocus = () => {
    setEditData({ ...formData, id: formData.id || '' });
    setOriginalData(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!editData.phone || !editData.name) {
      alert('נא למלא את כל השדות');
      return;
    }

    const isConfirmed = window.confirm("האם אתה בטוח שברצונך לשמור את השינויים?");
    if (isConfirmed) {
      try {
        if (docId) {
          await updateDoc(doc(db, "hallDetails", docId), editData);
        } else {
          const docRef = await addDoc(collection(db, "hallDetails"), editData);
          setDocId(docRef.id);
        }
        setFormData(editData);
        setEditData({ id: '', phone: '', name: '' });
        alert('הנתונים עודכנו בהצלחה');
      } catch (error) {
        console.error('Error updating document: ', error);
        alert('אירעה שגיאה בעדכון הנתונים');
      }
    } else {
      setEditData({ ...originalData, id: originalData.id || '' });
    }
  };

  return (
    <div className="hall-details-form" ref={formRef}>
      <h2>ניהול פרטים נוספים</h2>
      <form onSubmit={handleSubmit}>
        <label>
          טלפון לפרטים נוספים
          <input
            type="tel"
            name="phone"
            value={editData.id ? editData.phone : formData.phone}
            onChange={handlePhoneChange}
            onFocus={handleEditFocus}
            required
          />
        </label>
        <br />
        <label>
          שם
          <input
            type="text"
            name="name"
            value={editData.id ? editData.name : formData.name}
            onChange={handleNameChange}
            onFocus={handleEditFocus}
            required
          />
        </label>
        <br />
        <button type="submit">שמור</button>
      </form>
    </div>
  );
}

export default HallDetailsForm;
