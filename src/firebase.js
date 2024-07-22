// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";
// import { getAuth } from "firebase/auth"; // Add all necessary imports
// import { getStorage } from "firebase/storage";

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyCMvf-0cH5dIMcBAtz6pSuEcZotu7_8r4E",
//   authDomain: "adminlogin-71945.firebaseapp.com",
//   projectId: "adminlogin-71945",
//   storageBucket: "adminlogin-71945.appspot.com",
//   messagingSenderId: "488007417568",
//   appId: "1:488007417568:web:0fd503c972c166f4641a85",
//   measurementId: "G-HH7BFN7Y5Z"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// const auth = getAuth(app);  // Initialize Firebase Auth
// const db = getFirestore(app);
// const storage = getStorage(app);

// // Export all necessary Firebase functions
// export { app, analytics, auth, db , storage};
// Import the functions you need from the SDKs you need


import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration from environment variables
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);  // Initialize Firebase Auth
const db = getFirestore(app);
const storage = getStorage(app);

// Export all necessary Firebase functions
export { app, analytics, auth, db, storage };
