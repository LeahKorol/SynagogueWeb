import React, { useState, useEffect, useRef } from 'react';
import { addDoc, collection, updateDoc, doc, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase';
// import './ContactForm.css';

function ContactForm() {
  const [contactDetails, setContactDetails] = useState({ address: '', email: '', phone: '' });
  const [editContact, setEditContact] = useState({ id: '', address: '', email: '', phone: '' });
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
        setEditContact({ id: '', address: '', email: '', phone: '' });
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [editContact, originalDetails]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContactDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleEditFocus = (contact) => {
    setOriginalDetails(contact);
    setEditContact({ id: contact.id, address: contact.address, email: contact.email, phone: contact.phone });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!contactDetails.address || !contactDetails.email || !contactDetails.phone) {
      alert('נא למלא את כל השדות');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(contactDetails.email)) {
      alert('נא להזין כתובת אימייל תקינה');
      return;
    }

    const isConfirmed = window.confirm("האם אתה בטוח שברצונך לשמור את השינויים?");
    if (isConfirmed) {
      try {
        if (editContact.id) {
          const docRef = doc(db, "contact", editContact.id);
          await updateDoc(docRef, contactDetails);
        } else {
          await addDoc(collection(db, "contact"), contactDetails);
        }
        fetchContactDetails();
        setEditContact({ id: '', address: '', email: '', phone: '' });
      } catch (e) {
        console.error("Error saving contact details: ", e);
      }
    } else {
      setContactDetails(originalDetails);
      setEditContact({ id: '', address: '', email: '', phone: '' });
    }
  };

  return (
    <div>
      <h2>ניהול פרטי צור קשר</h2>
      <form onSubmit={handleSubmit} ref={formRef}>
        <label>
          כתובת:
          <input
            type="text"
            name="address"
            value={contactDetails.address}
            onChange={handleChange}
            onFocus={() => handleEditFocus(contactDetails)}
            required
          />
        </label>
        <label>
          מייל:
          <input
            type="email"
            name="email"
            value={contactDetails.email}
            onChange={handleChange}
            onFocus={() => handleEditFocus(contactDetails)}
            required
          />
        </label>
        <label>
          טלפון:
          <input
            type="text"
            name="phone"
            value={contactDetails.phone}
            onChange={handleChange}
            onFocus={() => handleEditFocus(contactDetails)}
            required
          />
        </label>
        <button type="submit">שמור</button>
      </form>
    </div>
  );
}

export default ContactForm;
