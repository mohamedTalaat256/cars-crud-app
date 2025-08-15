// src/environments/environment.ts
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "AIzaSyBpMlE9aPcdxatQHuqRzq-A7B8mw8RPR2A",
    authDomain: "chat-app-4afc4.firebaseapp.com",
    projectId: "chat-app-4afc4",
    storageBucket: "chat-app-4afc4.firebasestorage.app",
    messagingSenderId: "333543724012",
    appId: "1:333543724012:web:b7e2a0d271e78d021626c9"
  }
};

// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
/* const firebaseConfig = {
  apiKey: "AIzaSyBpMlE9aPcdxatQHuqRzq-A7B8mw8RPR2A",
  authDomain: "chat-app-4afc4.firebaseapp.com",
  projectId: "chat-app-4afc4",
  storageBucket: "chat-app-4afc4.firebasestorage.app",
  messagingSenderId: "333543724012",
  appId: "1:333543724012:web:b7e2a0d271e78d021626c9",
  measurementId: "G-GC8VSLMJ3D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app); */