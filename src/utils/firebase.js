// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAkR_FPg1Hhw8MAll1apbdttWPTKbooeuk",
  authDomain: "test-d0ef4.firebaseapp.com",
  projectId: "test-d0ef4",
  storageBucket: "test-d0ef4.appspot.com",
  messagingSenderId: "73008694763",
  appId: "1:73008694763:web:a9c23225141ff747f305ae"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)