import React, { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../../firebase';
// import './ContributesForm.css';

function ContributesForm() {
  const [contributesData, setContributesData] = useState({
    accountNumber: '',
    bankNumber: '',
    branchNumber: '',
    accountHolderName: '',
    phoneNumber: ''
  });
  const [editData, setEditData] = useState({ ...contributesData });
  const [originalData, setOriginalData] = useState({ ...contributesData });
  const [editMode, setEditMode] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = doc(db, 'contributes', 'contributes-data');
      await setDoc(docRef, editData);
      setContributesData(editData);
      setOriginalData(editData);
      setEditMode(false);
    } catch (error) {
      console.error('Error updating document: ', error);
    }
  };

  const fetchContributesData = async () => {
    try {
      const docRef = doc(db, 'contributes', 'contributes-data');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setContributesData(data);
        setEditData(data);
        setOriginalData(data);
        setEditMode(false);
      }
    } catch (error) {
      console.error('Error fetching document: ', error);
    }
  };

  useEffect(() => {
    fetchContributesData();

    const handleClickOutside = (event) => {
      if (editMode && !event.target.closest('.contributes-form')) {
        setEditData(originalData);
        setEditMode(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [editMode, originalData]);

  const handleEditFocus = () => {
    setEditMode(true);
  };

  return (
    <div className="contributes-form">
      <h3>פרטים לתרומות</h3>
      <form onSubmit={handleSubmit}>
        <label>
          מספר חשבון בנק
          <input
            type="text"
            name="accountNumber"
            value={editData.accountNumber}
            onChange={handleInputChange}
            onFocus={handleEditFocus}
          />
        </label>
        <br />
        <label>
          מספר בנק
          <input
            type="text"
            name="bankNumber"
            value={editData.bankNumber}
            onChange={handleInputChange}
            onFocus={handleEditFocus}
          />
        </label>
        <br />
        <label>
          מספר סניף
          <input
            type="text"
            name="branchNumber"
            value={editData.branchNumber}
            onChange={handleInputChange}
            onFocus={handleEditFocus}
          />
        </label>
        <br />
        <label>
          שם בעל החשבון
          <input
            type="text"
            name="accountHolderName"
            value={editData.accountHolderName}
            onChange={handleInputChange}
            onFocus={handleEditFocus}
          />
        </label>
        <br />
        <label>
          מספר טלפון להעברה ב bit או ב paybox
          <input
            type="text"
            name="phoneNumber"
            value={editData.phoneNumber}
            onChange={handleInputChange}
            onFocus={handleEditFocus}
          />
        </label>
        <br />
        <button type="submit">{editMode ? 'עדכן' : 'הוסף'}</button>
      </form>
    </div>
  );
}

export default ContributesForm;
