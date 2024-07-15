import React, { useState, useEffect } from 'react';
import { addDoc, collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '../../../firebase';

function HallDetailsForm() {
    const [phone, setPhone] = useState('');
    const [name, setName] = useState('');
    const [docId, setDocId] = useState(null);
  
    const fetchHallDetails = async () => {
      const querySnapshot = await getDocs(collection(db, "hallDetails"));
      if (!querySnapshot.empty) {
        const data = querySnapshot.docs[0];
        setPhone(data.data().phone);
        setName(data.data().name);
        setDocId(data.id);
      }
    };
  
    useEffect(() => {
      fetchHallDetails();
    }, []);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      if (docId) {
        await updateDoc(doc(db, "hallDetails", docId), { phone, name });
      } else {
        const docRef = await addDoc(collection(db, "hallDetails"), { phone, name });
        setDocId(docRef.id);
      }
    };
  
    return (
      <div>
        <h2>ניהול פרטים נוספים</h2>
        <form onSubmit={handleSubmit}>
          <label>
            טלפון לפרטים נוספים
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </label>
          <br />
          <label>
            שם
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <br />
          <button type="submit">שמור</button>
        </form>
      </div>
    );
  }
  
  export default HallDetailsForm;
