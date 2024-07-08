import React, { useState } from 'react'
import { addDoc, collection } from 'firebase/firestore';

import {db} from '../firebase';
function CongratForm() {

    const [congrat, setCongrat] = useState({ title: "", content: "" });

    const updateForm = (e) => {
        e.preventDefault();
        setCongrat({ ...congrat, [e.target.name]: e.target.value });
        console.log("update", e.target.name, e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          await addDoc(collection(db, "congrats"), congrat);
          console.log("Document successfully written!");
        } catch (e) {
          console.error("Error adding document: ", e);
        }
      };
    



    return (
        <form onSubmit={handleSubmit}>
        <label>
            Title
            <input
                name="title"
                value={congrat.title}
                type="text"
                onChange={updateForm}
            />
        </label>
        <label>
            Content
            <input
                name="content"
                value={congrat.content}
                type="text"
                onChange={updateForm}
            />
        </label>
        <button type="submit">Save</button>
    </form>

    );
}

export default CongratForm;