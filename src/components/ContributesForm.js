import React, { useState, useEffect } from 'react';
import { collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';

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
      <h3>Manage Contributes Details</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Account Number
          <input
            type="text"
            name="accountNumber"
            value={contributesData.accountNumber}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Bank Number
          <input
            type="text"
            name="bankNumber"
            value={contributesData.bankNumber}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Branch Number
          <input
            type="text"
            name="branchNumber"
            value={contributesData.branchNumber}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Account Holder Name
          <input
            type="text"
            name="accountHolderName"
            value={contributesData.accountHolderName}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Phone Number
          <input
            type="text"
            name="phoneNumber"
            value={contributesData.phoneNumber}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <button type="submit">{editMode ? 'Update' : 'Add'}</button>
      </form>
    </div>
  );
}

export default ContributesForm;
