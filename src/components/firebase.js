// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDzIz32omQizdj5MOBfFR0uF4D4FNFDGl0",
  authDomain: "midterm-aurora.firebaseapp.com",
  databaseURL: "https://midterm-aurora-default-rtdb.firebaseio.com",
  projectId: "midterm-aurora",
  storageBucket: "midterm-aurora.appspot.com",
  messagingSenderId: "787601448934",
  appId: "1:787601448934:web:a802bd74a486ab33608027",
  measurementId: "G-8GZSCWVDCN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

