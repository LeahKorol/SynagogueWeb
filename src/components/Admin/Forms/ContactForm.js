import React, { useState, useEffect } from 'react';
import { addDoc, collection, updateDoc, doc, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase';

function ContactForm() {
  const [contactDetails, setContactDetails] = useState({});
  const [editingContact, setEditingContact] = useState(null);

  const fetchContactDetails = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "contact"));
      if (!querySnapshot.empty) {
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))[0];
        setContactDetails(data);
        setEditingContact(data.id); // Assuming there's only one document, set editing contact ID
      }
    } catch (e) {
      console.error("Error fetching contact details: ", e);
    }
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
    try {
      if (editingContact) {
        const docRef = doc(db, "contact", editingContact);
        await updateDoc(docRef, contactDetails);
      } else {
        await addDoc(collection(db, "contact"), contactDetails);
      }
      fetchContactDetails();
    } catch (e) {
      console.error("Error saving contact details: ", e);
    }
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
