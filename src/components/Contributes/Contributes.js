
import React, { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import './Contributes.css';

import bitIcon from '../../images/bit-icon.jfif';
import payBoxIcon from '../../images/paybox-icon.jfif';
import qrCodeImage from '../../images/QR-payment-bit.png';

function Contributes() {
  const [contributesData, setContributesData] = useState({});

  useEffect(() => {
    const fetchContributesData = async () => {
      try {
        const docRef = doc(db, 'contributes', 'contributes-data');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setContributesData(docSnap.data());
        }
      } catch (error) {
        console.error('Error fetching document: ', error);
      }
    };

    fetchContributesData();
  }, []);

  return (
    <main>
      <h1 className='heading-contributes'>תרומות</h1>
      <p className="quote">
        "ר' יהושוע בן לוי אמר: גדולה צדקה שמקרבת את הגאולה" (מסכת בבא בתרא י' א')
      </p>

      <div className="qr-code">
        <div className="bit-qr">
          <img className="image" src={bitIcon} alt="" />
          <img src={qrCodeImage} alt="Bit QR Code" />
          <p>ביט</p>
        </div>
        <div className="paybox-qr">
          <img className="image" src={payBoxIcon} alt="" />
          <img src={qrCodeImage} alt="Paybox QR Code" />
          <p>פייבוקס</p>
        </div>
      </div>

      <div className="details">
        <div className="bank-account">
          <h3>פרטי חשבון בנק להעברה בנקאית</h3>
          <p>
            מספר חשבון: {contributesData.accountNumber}
            <br />
            מספר בנק: {contributesData.bankNumber} ({contributesData.bankName})
            <br />
            מספר סניף: {contributesData.branchNumber}
            <br />
            שם בעל החשבון: {contributesData.accountHolderName}
          </p>
        </div>
        <div className="phone-number">
          <h3>מספר טלפון להעברה ב-bit / paybox</h3>
          <p>{contributesData.phoneNumber}</p>
        </div>
      </div>
    </main>
  );
}

export default Contributes;
