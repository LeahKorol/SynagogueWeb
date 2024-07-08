import React, { useState } from 'react'

import db from '../firebase';

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

function CongratForm() {

    return (
        <form onSubmit={submitCongrat}>
            <input
                name="title"
                value={congrat.title}
                type="text"
                onChange={updateForm}
            >Title</input>
            <input
                name="content"
                value={congrat.content}
                type="text"
                onChange={updateForm}
            >Content</input>
            <button type="submit">Save</button>
        </form>

    )
}