// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import '../AdminLogin.css';

// function AdminLogin() {
//   const navigate = useNavigate();

//   function login(event) {
//     event.preventDefault();
//     const username = document.getElementById('username').value;
//     const password = document.getElementById('password').value;

//     if (username === 'admin' && password === '1234') {
//       navigate('/manager');
//     } else {
//       alert('שם המשתמש או הסיסמה אינם נכונים!');
//     }
//   }

//   function signInWithGoogle() {
//     alert('כניסה עם Google נתמכת בקרוב!');
//   }

//   return (
//     <div className="admin-login-container">
//       <h2>כניסת מנהל</h2>

//       <form onSubmit={login}>
//         <input type="text" id="username" name="username" placeholder="שם משתמש" required />
//         <input type="password" id="password" name="password" placeholder="סיסמה" required />
//         <button type="submit">כניסה</button>
//       </form>

//       <div className="google-login">
//         <p>או התחבר באמצעות:</p>
//         <button onClick={signInWithGoogle} className="google-login-button">
//           <i className="fab fa-google"></i>
//           כניסה עם Google
//         </button>
//       </div>
//     </div>
//   );
// }

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, signInWithEmailAndPassword } from '../firebase';
import '../AdminLogin.css';

function AdminLogin(){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleEmailPasswordLogin = async (e) => {
    e.preventDefault();
    setError(''); // איפוס הודעת השגיאה
    try {
      // נסה להתחבר עם שם המשתמש והסיסמא שהוזנו
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/Manager'); // נווט לעמוד המנהל לאחר התחברות מוצלחת
    } catch (error) {
      console.error("Error logging in with email and password:", error);
      setError('Invalid email or password.'); // הצגת הודעת שגיאה
    }
  };

  return (
    <div className="admin-login-container">
      <h2>כניסת מנהל</h2>
      <form onSubmit={handleEmailPasswordLogin}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit">Login with Email and Password</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
}

export default AdminLogin;
