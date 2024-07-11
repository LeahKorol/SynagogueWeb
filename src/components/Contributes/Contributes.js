import React from 'react';
import './Contributes.css'


// import pictures
import bitIcon from '../../images/bit-icon.jfif'
import payBoxIcon from '../../images/paybox-icon.jfif'
import qrCodeImage from '../../images/QR-payment-bit.png'


function Contributes() {
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
                        מספר חשבון : 987787
                        <br />
                        מספר בנק : 12 (בנק הפועלים)
                        <br />
                        מספר סניף : 231
                        <br />
                        שם בעל החשבון : עמותת "פאתי מזרח" ע"ר
                    </p>
                </div>
                <div className="phone-number">
                    <h3> מספר טלפון להעברה ב bit / paybox </h3>
                    <p>052-6039150 - אבי מוסקוביץ'</p>
                </div>
            </div>
        </main>
    );
}


export default Contributes;
