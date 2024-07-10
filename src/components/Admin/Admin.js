// src/components/Admin.js

import React from 'react';
import { auth, signOut } from '../../firebase';

const Admin = () => {
  const handleLogout = () => {
    signOut(auth).then(() => {
      // התנתקות מוצלחת
    }).catch((error) => {
      console.error("Error logging out:", error);
    });
  };

  return (
    <div>
      <h2>Welcome, Admin!</h2>
      <button onClick={handleLogout}>Logout</button>
      {/* תוכן נוסף לעמוד המנהל */}
    </div>
  );
};

export default Admin;
