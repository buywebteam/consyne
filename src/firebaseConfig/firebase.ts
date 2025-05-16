// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "consyne-324e4.firebaseapp.com",
  projectId: "consyne-324e4",
  storageBucket: "consyne-324e4.firebasestorage.app",
  messagingSenderId: "587028401613",
  appId: "1:587028401613:web:f5de58c26e6baed4090884",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
