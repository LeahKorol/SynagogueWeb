
import React, { useState, useEffect } from 'react';
import { addDoc, collection, updateDoc, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

function CongratForm() {
  const [congrats, setCongrats] = useState([]);
  const [newCongrat, setNewCongrat] = useState({ content: "" });
  const [editCongrat, setEditCongrat] = useState({ id: "", content: "" });

  const fetchCongrats = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "congrats"));
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCongrats(data);
    } catch (e) {
      console.error("Error fetching documents: ", e);
    }
  };

  useEffect(() => {
    fetchCongrats();
  }, []);

  const handleNewChange = (e) => {
    setNewCongrat({ content: e.target.value });
  };

  const handleEditChange = (e) => {
    setEditCongrat({ ...editCongrat, content: e.target.value });
  };

  const handleNewSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "congrats"), { content: newCongrat.content });
      setNewCongrat({ content: "" });
      fetchCongrats();
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const handleEditSubmit = async (e, id) => {
    e.preventDefault();
    if (!editCongrat.content) return;
    try {
      const docRef = doc(db, "congrats", id);
      await updateDoc(docRef, { content: editCongrat.content });
      setEditCongrat({ id: "", content: "" });
      fetchCongrats();
    } catch (e) {
      console.error("Error updating document: ", e);
    }
  };

  const handleDelete = async (id) => {
    try {
      const docRef = doc(db, "congrats", id);
      await deleteDoc(docRef);
      fetchCongrats();
    } catch (e) {
      console.error("Error deleting document: ", e);
    }
  };

  return (
    <div>
      <h3>Manage Congratulations</h3>
      <ul>
        {congrats.map((congrat) => (
          <li key={congrat.id}>
            <input
              name="content"
              value={editCongrat.id === congrat.id ? editCongrat.content : congrat.content}
              type="text"
              onChange={(e) => setEditCongrat({ id: congrat.id, content: e.target.value })}
            />
            <button onClick={(e) => handleEditSubmit(e, congrat.id)}>Update</button>
            <button onClick={() => handleDelete(congrat.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <h3>Add New Congratulation</h3>
      <form onSubmit={handleNewSubmit}>
        <label>
          Content
          <input
            name="content"
            value={newCongrat.content}
            type="text"
            onChange={handleNewChange}
          />
        </label>
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default CongratForm;





