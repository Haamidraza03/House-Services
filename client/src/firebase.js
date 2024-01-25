// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "housyy-34f0d.firebaseapp.com",
  projectId: "housyy-34f0d",
  storageBucket: "housyy-34f0d.appspot.com",
  messagingSenderId: "612973889805",
  appId: "1:612973889805:web:fc9faa3db378fb916b8844"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);