// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAoc0OUIgvknQo3d-XD_3PjyaTTxULG_Ng",
  authDomain: "linkedincard.firebaseapp.com",
  projectId: "linkedincard",
  storageBucket: "linkedincard.firebasestorage.app",
  messagingSenderId: "335809887487",
  appId: "1:335809887487:web:3b5aeaa16c08f613f420ca",
  measurementId: "G-3LH1ZHYQRW"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);