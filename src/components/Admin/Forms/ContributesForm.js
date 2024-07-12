import React, { useState, useEffect } from 'react';
import { collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../../firebase';

function ContributesForm() {
  const [contributesData, setContributesData] = useState({
    accountNumber: '',
    bankNumber: '',
    branchNumber: '',
    accountHolderName: '',
    phoneNumber: ''
  });

  const [editMode, setEditMode] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContributesData({ ...contributesData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = doc(db, 'contributes', 'contributes-data');
      await setDoc(docRef, contributesData);
      setEditMode(true);
    } catch (error) {
      console.error('Error updating document: ', error);
    }
  };

  const fetchContributesData = async () => {
    try {
      const docRef = doc(db, 'contributes', 'contributes-data');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setContributesData(docSnap.data());
        setEditMode(true);
      }
    } catch (error) {
      console.error('Error fetching document: ', error);
    }
  };

  useEffect(() => {
    fetchContributesData();
  }, []);

  return (
    <div>
      <h3>פרטים לתרומות</h3>
      <form onSubmit={handleSubmit}>
        <label>
          מסםר חשבון בנק
          <input
            type="text"
            name="accountNumber"
            value={contributesData.accountNumber}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          מספר בנק
          <input
            type="text"
            name="bankNumber"
            value={contributesData.bankNumber}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          מספר סניף
          <input
            type="text"
            name="branchNumber"
            value={contributesData.branchNumber}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          שם בעל החשבון
          <input
            type="text"
            name="accountHolderName"
            value={contributesData.accountHolderName}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          מספר טלפון להעברה ב bit או ב paybox
          <input
            type="text"
            name="phoneNumber"
            value={contributesData.phoneNumber}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <button type="submit">{editMode ? 'עדכן' : 'הוסף'}</button>
      </form>
    </div>
  );
}

export default ContributesForm;
