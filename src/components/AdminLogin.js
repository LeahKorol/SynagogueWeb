import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../AdminLogin.css';

function AdminLogin() {
  const navigate = useNavigate();

  function login(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === 'admin' && password === '1234') {
      navigate('/manager');
    } else {
      alert('שם המשתמש או הסיסמה אינם נכונים!');
    }
  }

  function signInWithGoogle() {
    alert('כניסה עם Google נתמכת בקרוב!');
  }

  return (
    <div className="admin-login-container">
      <h2>כניסת מנהל</h2>

      <form onSubmit={login}>
        <input type="text" id="username" name="username" placeholder="שם משתמש" required />
        <input type="password" id="password" name="password" placeholder="סיסמה" required />
        <button type="submit">כניסה</button>
      </form>

      <div className="google-login">
        <p>או התחבר באמצעות:</p>
        <button onClick={signInWithGoogle} className="google-login-button">
          <i className="fab fa-google"></i>
          כניסה עם Google
        </button>
      </div>
    </div>
  );
}

export default AdminLogin;
