import React, { useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useNavigate, Link } from 'react-router-dom';
import { auth } from '../../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import './AdminLogin.css';

function AdminLogin() {
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
    <HelmetProvider>
      <Helmet>
          <title>פאתי מזרח | כניסת מנהל</title>
      </Helmet>
    <div className="admin-login-wrapper">
      <Link to="/" className="home-button">חזרה לדף הבית</Link>
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
          <button type="submit">כניסה עם מייל וסיסמא</button>
        </form>
        {error && <p>{error}</p>}
      </div>
    </div>
    </HelmetProvider>
  );
}

export default AdminLogin;
