import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import './Contact.css'

function Contact() {
    return (
        <div id="contact-div" className="contact-div">
            <h1 className="heading-contact">צור קשר</h1>
            <div className="contact-details">
                <div className="box">
                    <i className="fas fa-map-marker-alt"></i>
                    <h3 className="header-box">כתובת</h3>
                    <p className="detail">
                        רח' דוד פדרמן 14
                        <br />פסגת זאב, ירושלים
                    </p>
                </div>
                <div className="box">
                    <i className="fas fa-envelope-open"></i>
                    <h3 className="header-box">מייל</h3>
                    <p className="detail">paatei.mizrach@info.co.il</p>
                </div>
                <div className="box">
                    <i className="fas fa-phone"></i>
                    <h3 className="header-box">טלפון</h3>
                    <p className="detail-phone">
                        052-6039150
                        <br />
                        אבי מוסקוביץ'
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Contact;
