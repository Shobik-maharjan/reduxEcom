// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB9lwb0c6xsrbnEXB2xM8RyodmAyRNYqQo",
  authDomain: "movie-2ff9b.firebaseapp.com",
  projectId: "movie-2ff9b",
  storageBucket: "movie-2ff9b.appspot.com",
  messagingSenderId: "432340400645",
  appId: "1:432340400645:web:2efc6dd5f91b53a2ecfa6c",
  measurementId: "G-YZNMN9P2S2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db: any = getDatabase(app);
export const auth: any = getAuth(app);
