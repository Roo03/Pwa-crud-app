// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";


const firebaseConfig = {
  apiKey: "AIzaSyBvg8OkAyPSnijmHene2TTTCANnNjkZnSY",
  authDomain: "notificaciones-web-b10f9.firebaseapp.com",
  projectId: "notificaciones-web-b10f9",
  storageBucket: "notificaciones-web-b10f9.firebasestorage.app",
  messagingSenderId: "796075283775",
  appId: "1:796075283775:web:5d9b7b9638e76a1811ef8a",
  measurementId: "G-7ZBWV37K74"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);