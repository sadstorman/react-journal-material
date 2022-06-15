// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDQBrSzq_Qcccxd0oUVyoGhaVtWdB7g5HQ",
  authDomain: "react-journal-remaster.firebaseapp.com",
  projectId: "react-journal-remaster",
  storageBucket: "react-journal-remaster.appspot.com",
  messagingSenderId: "623124110814",
  appId: "1:623124110814:web:3b0551c8f62a92f21e114f",
  measurementId: "G-Z96G52Y24M"
};

// Initialize Firebase
const FirebaseApp = initializeApp(firebaseConfig);
const FirebaseAuth = getAuth(FirebaseApp)
const FirebaseDB = getFirestore(FirebaseApp)
const analytics = getAnalytics(FirebaseApp);

export {
    FirebaseApp,
    analytics,
    FirebaseAuth,
    FirebaseDB
}