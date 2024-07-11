// src/components/ContactForm.js

import React, { useState, useEffect } from 'react';
import { addDoc, collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';

function ContactForm() {
  const [contactDetails, setContactDetails] = useState({});
  const [editingContact, setEditingContact] = useState(null);

  const fetchContactDetails = async () => {
    const querySnapshot = await getDocs(collection(db, "contact"));
    const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setContactDetails(data[0]); // Assuming there's only one document
  };

  useEffect(() => {
    fetchContactDetails();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContactDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingContact) {
      await updateDoc(doc(db, "contact", editingContact.id), contactDetails);
    } else {
      await addDoc(collection(db, "contact"), contactDetails);
    }
    setEditingContact(null);
    fetchContactDetails();
  };

  return (
    <div>
      <h2>ניהול פרטי צור קשר</h2>
      <form onSubmit={handleSubmit}>
        <label>
          כתובת:
          <input
            type="text"
            name="address"
            value={contactDetails.address || ''}
            onChange={handleChange}
          />
        </label>
        <label>
          מייל:
          <input
            type="email"
            name="email"
            value={contactDetails.email || ''}
            onChange={handleChange}
          />
        </label>
        <label>
          טלפון:
          <input
            type="text"
            name="phone"
            value={contactDetails.phone || ''}
            onChange={handleChange}
          />
        </label>
        <button type="submit">שמור</button>
      </form>
    </div>
  );
}

export default ContactForm;
