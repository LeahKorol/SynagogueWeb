import React, { useState } from 'react'

import db from '../firebase';
function CongratForm() {

    const [congrat, setCongrat] = useState({ title: "", content: "" });

    const updateForm = (e) => {
        e.preventDefault();
        setCongrat({ ...congrat, [e.target.name]: e.target.value });
        console.log("update", e.target.name, e.target.value);
    };

    const submitCongrat = (e) => {
        e.preventDefault();
        console.log("Saving :", congrat)
    }



    return (
        <form onSubmit={submitCongrat}>
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