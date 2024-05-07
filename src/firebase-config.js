// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth';
import { getFirestore} from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDwSp8SVq_HwQtHptHCsjYSnMflGcguaf4",
  authDomain: "superchat-bcf86.firebaseapp.com",
  projectId: "superchat-bcf86",
  storageBucket: "superchat-bcf86.appspot.com",
  messagingSenderId: "176943362898",
  appId: "1:176943362898:web:79f72a1d6654ed6949008b",
  measurementId: "G-QPWRZZJKPK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);