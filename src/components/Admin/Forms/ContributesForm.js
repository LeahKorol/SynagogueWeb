import React, { useState, useEffect, useRef } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../../firebase';

function ContributesForm() {
  const [formData, setFormData] = useState({
    accountNumber: '',
    bankNumber: '',
    branchNumber: '',
    accountHolderName: '',
    phoneNumber: ''
  });
  const [editData, setEditData] = useState({
    id: '',
    accountNumber: '',
    bankNumber: '',
    branchNumber: '',
    accountHolderName: '',
    phoneNumber: ''
  });
  const [originalData, setOriginalData] = useState({});
  const formRef = useRef(null);

  useEffect(() => {
    const fetchContributesData = async () => {
      try {
        const docRef = doc(db, 'contributes', 'contributes-data');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = { id: docSnap.id, ...docSnap.data() };
          setFormData(data);
          setOriginalData(data);
        }
      } catch (error) {
        console.error('Error fetching document: ', error);
      }
    };

    fetchContributesData();

    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target) && editData.id) {
        setFormData(originalData);
        setEditData({ id: '', accountNumber: '', bankNumber: '', branchNumber: '', accountHolderName: '', phoneNumber: '' });
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [editData, originalData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEditFocus = () => {
    setEditData({ ...formData, id: formData.id || '' });
    setOriginalData(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!editData.accountNumber || !editData.bankNumber || !editData.branchNumber || !editData.accountHolderName || !editData.phoneNumber) {
      alert('נא למלא את כל השדות');
      return;
    }

    const isConfirmed = window.confirm("האם אתה בטוח שברצונך לשמור את השינויים?");
    if (isConfirmed) {
      try {
        const docRef = doc(db, 'contributes', editData.id);
        await updateDoc(docRef, editData);
        setFormData(editData);
        setEditData({ id: '', accountNumber: '', bankNumber: '', branchNumber: '', accountHolderName: '', phoneNumber: '' });
        alert('הנתונים עודכנו בהצלחה');
      } catch (error) {
        console.error('Error updating document: ', error);
        alert('אירעה שגיאה בעדכון הנתונים');
      }
    } else {
      setEditData({ ...originalData, id: originalData.id || '' });
    }
  };

  return (
    <div className="contributes-form" ref={formRef}>
      <h3>פרטים לתרומות</h3>
      <form onSubmit={handleSubmit}>
        <label>
          מספר חשבון בנק
          <input
            type="text"
            name="accountNumber"
            value={editData.id ? editData.accountNumber : formData.accountNumber}
            onChange={handleChange}
            onFocus={handleEditFocus}
            required
          />
        </label>
        <br />
        <label>
          מספר בנק
          <input
            type="text"
            name="bankNumber"
            value={editData.id ? editData.bankNumber : formData.bankNumber}
            onChange={handleChange}
            onFocus={handleEditFocus}
            required
          />
        </label>
        <br />
        <label>
          מספר סניף
          <input
            type="text"
            name="branchNumber"
            value={editData.id ? editData.branchNumber : formData.branchNumber}
            onChange={handleChange}
            onFocus={handleEditFocus}
            required
          />
        </label>
        <br />
        <label>
          שם בעל החשבון
          <input
            type="text"
            name="accountHolderName"
            value={editData.id ? editData.accountHolderName : formData.accountHolderName}
            onChange={handleChange}
            onFocus={handleEditFocus}
            required
          />
        </label>
        <br />
        <label>
          מספר טלפון להעברה ב bit או ב paybox
          <input
            type="text"
            name="phoneNumber"
            value={editData.id ? editData.phoneNumber : formData.phoneNumber}
            onChange={handleChange}
            onFocus={handleEditFocus}
            required
          />
        </label>
        <br />
        <button type="submit">עדכן</button>
      </form>
    </div>
  );
}

export default ContributesForm;
