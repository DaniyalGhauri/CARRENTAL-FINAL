// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDPS4PBSdODhrUMWaMZl335sMYzhziP4aY",
  authDomain: "carrental-6ae2c.firebaseapp.com",
  projectId: "carrental-6ae2c",
  storageBucket: "carrental-6ae2c.firebasestorage.app",
  messagingSenderId: "704468593041",
  appId: "1:704468593041:web:30ca2820965d095411d230",
  measurementId: "G-P6SY5P7RPH"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
export { app, db, storage, googleProvider, auth };