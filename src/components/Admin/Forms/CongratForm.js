import React, { useState, useEffect } from 'react';
import { addDoc, collection, updateDoc, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase';
import './CongratsForm.css';

function CongratForm() {
  const [congrats, setCongrats] = useState([]);
  const [newCongrat, setNewCongrat] = useState({ content: "" });
  const [editCongrat, setEditCongrat] = useState({ id: "", content: "" });
  const [originalContent, setOriginalContent] = useState("");

  const fetchCongrats = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "congrats"));
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCongrats(data.reverse()); // Reverse the order to show newest first
    } catch (e) {
      console.error("Error fetching documents: ", e);
    }
  };

  useEffect(() => {
    fetchCongrats();

    const handleClickOutside = (event) => {
      if (editCongrat.id && !event.target.closest('.congrat-item')) {
        setEditCongrat({ id: "", content: "" });
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [editCongrat]);

  const handleNewChange = (e) => {
    setNewCongrat({ content: e.target.value });
  };

  const handleEditChange = (e) => {
    setEditCongrat({ ...editCongrat, content: e.target.value });
  };

  const handleEditFocus = (congrat) => {
    setOriginalContent(congrat.content);
    setEditCongrat({ id: congrat.id, content: congrat.content });
  };

  const handleNewSubmit = async (e) => {
    e.preventDefault();
    if (!newCongrat.content.trim()) {
      alert('לא ניתן להוסיף איחול ריק');
      return;
    }
    if (congrats.length >= 10) {
      alert("לא ניתן להוסיף יותר מ-10 איחולים. מחק איחול קיים כדי להוסיף חדש.");
      return;
    }
    try {
      const docRef = await addDoc(collection(db, "congrats"), { content: newCongrat.content });
      const newCongratData = { id: docRef.id, content: newCongrat.content };
      setCongrats(prevCongrats => [newCongratData, ...prevCongrats]);
      setNewCongrat({ content: "" });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const handleEditSubmit = async (e, id) => {
    e.preventDefault();
    if (!editCongrat.content) return;

    const isConfirmed = window.confirm("האם אתה בטוח שברצונך לשמור את השינויים?");
    if (isConfirmed) {
      try {
        const docRef = doc(db, "congrats", id);
        await updateDoc(docRef, { content: editCongrat.content });
        setEditCongrat({ id: "", content: "" });
        fetchCongrats(); // Fetch updated list after updating congrat
      } catch (e) {
        console.error("Error updating document: ", e);
      }
    } else {
      setEditCongrat({ id: id, content: originalContent });
    }
  };

  const handleDelete = async (id) => {
    const isConfirmed = window.confirm("האם אתה בטוח שברצונך למחוק איחול זה?");
    if (isConfirmed) {
      try {
        const docRef = doc(db, "congrats", id);
        await deleteDoc(docRef);
        fetchCongrats(); // Fetch updated list after deleting congrat
      } catch (e) {
        console.error("Error deleting document: ", e);
      }
    }
  };

  return (
    <div className="congrat-form">
      <h2>איחולים וברכות</h2>
      <div className="congrat-list">
        <h3>איחולים קיימים</h3>
        {congrats.map((congrat) => (
          <div key={congrat.id} className="congrat-item">
            <input
              type="text"
              className="congrat-input"
              value={editCongrat.id === congrat.id ? editCongrat.content : congrat.content}
              onChange={handleEditChange}
              onFocus={() => handleEditFocus(congrat)}
            />
            <div className="congrat-actions">
              <button
                className="btn-congrats btn-update"
                onClick={(e) => handleEditSubmit(e, congrat.id)}
              >
                <i className="fas fa-edit"></i>
              </button>
              <button
                className="btn btn-delete"
                onClick={() => handleDelete(congrat.id)}
              >
                <i className="fas fa-trash-alt"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="add-congrat">
        <h3>הוסף איחול / ברכה</h3>
        <form onSubmit={handleNewSubmit}>
          <input
            type="text"
            className="congrat-input"
            value={newCongrat.content}
            onChange={handleNewChange}
            placeholder="כתוב איחול חדש"
            disabled={congrats.length >= 10}
          />
          <button type="submit" className="btn btn-add" disabled={congrats.length >= 10}>
            הוסף
          </button>
          {congrats.length >= 10 && (
            <p style={{ color: 'red' }}>
              לא ניתן להוסיף יותר מ-10 איחולים. מחק איחול קיים כדי להוסיף חדש.
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

export default CongratForm;
