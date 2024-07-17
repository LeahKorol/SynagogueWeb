import React, { useState, useEffect, useRef } from 'react';
import { addDoc, collection, updateDoc, doc, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase';

function ContactForm() {
  const [contactDetails, setContactDetails] = useState({ address: '', email: '', name: '', phone: '' });
  const [editContact, setEditContact] = useState({ id: '', address: '', email: '', name: '', phone: '' });
  const [originalDetails, setOriginalDetails] = useState({});
  const formRef = useRef(null);

  const fetchContactDetails = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "contact"));
      if (!querySnapshot.empty) {
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))[0];
        setContactDetails(data);
        setOriginalDetails(data);
      }
    } catch (e) {
      console.error("Error fetching contact details: ", e);
    }
  };

  useEffect(() => {
    fetchContactDetails();

    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target) && editContact.id) {
        setContactDetails(originalDetails);
        setEditContact({ id: '', address: '', email: '', name: '', phone: '' });
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [editContact, originalDetails]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditContact((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleEditFocus = () => {
    setEditContact({ ...contactDetails, id: contactDetails.id || '' });
    setOriginalDetails(contactDetails);
  };

  const handleUpdate = async () => {
    if (!editContact.address || !editContact.email || !editContact.name || !editContact.phone) {
      alert('נא למלא את כל השדות');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(editContact.email)) {
      alert('נא להזין כתובת אימייל תקינה');
      return;
    }

    const isConfirmed = window.confirm("האם אתה בטוח שברצונך לשמור את השינויים?");
    if (isConfirmed) {
      try {
        if (editContact.id) {
          const docRef = doc(db, "contact", editContact.id);
          await updateDoc(docRef, editContact);
        } else {
          await addDoc(collection(db, "contact"), editContact);
        }
        fetchContactDetails();
        setEditContact({ id: '', address: '', email: '', name: '', phone: '' });
      } catch (e) {
        console.error("Error saving contact details: ", e);
      }
    } else {
      setEditContact({ ...originalDetails, id: originalDetails.id || '' });
    }
  };

  return (
    <div>
      <h2>ניהול פרטי צור קשר</h2>
      <div ref={formRef}>
        <label>
          כתובת:
          <input
            type="text"
            name="address"
            value={editContact.id ? editContact.address : contactDetails.address}
            onChange={handleChange}
            onFocus={handleEditFocus}
            required
          />
        </label>
        <label>
          מייל:
          <input
            type="email"
            name="email"
            value={editContact.id ? editContact.email : contactDetails.email}
            onChange={handleChange}
            onFocus={handleEditFocus}
            required
          />
        </label>
        <label>
          שם:
          <input
            type="text"
            name="name"
            value={editContact.id ? editContact.name : contactDetails.name}
            onChange={handleChange}
            onFocus={handleEditFocus}
            required
          />
        </label>
        <label>
          טלפון:
          <input
            type="text"
            name="phone"
            value={editContact.id ? editContact.phone : contactDetails.phone}
            onChange={handleChange}
            onFocus={handleEditFocus}
            required
          />
        </label>
        <button onClick={handleUpdate}>עדכן</button>
      </div>
    </div>
  );
}

export default ContactForm;