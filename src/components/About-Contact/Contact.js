import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import './Contact.css';

function Contact() {
  const [contactDetails, setContactDetails] = useState({});

  const fetchContactDetails = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "contact"));
      if (!querySnapshot.empty) {
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))[0];
        setContactDetails(data);
      }
    } catch (e) {
      console.error("Error fetching contact details: ", e);
    }
  };

  useEffect(() => {
    fetchContactDetails();
  }, []);

  return (
    <div id="contact" className="contact-div">
      <h1 className="heading-contact">צור קשר</h1>
      <div className="contact-details">
        <div className="box-contact">
          <i className="fas fa-map-marker-alt"></i>
          <h3 className="header-box">כתובת</h3>
          <p className="detail">
            {contactDetails.address}
          </p>
        </div>
        <div className="box-contact">
          <i className="fas fa-envelope-open"></i>
          <h3 className="header-box">מייל</h3>
          <p className="detail">{contactDetails.email}</p>
        </div>
        <div className="box-contact">
          <i className="fas fa-phone"></i>
          <h3 className="header-box">טלפון</h3>
          <div className="details">
            <p className="detail-name">{`${contactDetails.name}`}</p>
            <p className="detail-phone">{contactDetails.phone}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;