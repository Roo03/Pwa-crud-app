// Import the functions you need from the SDKs you need
importScripts("https://www.gstatic.com/firebasejs/11.0.2/firebase-app-compat.js")
importScripts("https://www.gstatic.com/firebasejs/11.0.2/firebase-messaging-compat.js")

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
const app = firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging(app);

//previo a mostrar la notificacion
messaging.onBackgroundMessage(payload => {
    console.log("Tienes un mensaje");
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: "/icon512_maskable.png"
    }

    return self.registration.showNotification(
        notificationTitle,
        notificationOptions
    )
})