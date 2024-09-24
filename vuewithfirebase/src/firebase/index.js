// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
import { getFunctions, connectFunctionsEmulator } from 'firebase/functions';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAEK8ud_G9zinl_broSpimIn9shQN7ZwtU",
  authDomain: "vuewithfirebase-f8f63.firebaseapp.com",
  projectId: "vuewithfirebase-f8f63",
  storageBucket: "vuewithfirebase-f8f63.appspot.com",
  messagingSenderId: "712511560374",
  appId: "1:712511560374:web:7c0f3d5d4a5e4fdf6d6417"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db= getFirestore(app);
const auth= getAuth(app);
const functions = getFunctions(app);


if (window.location.hostname === 'localhost') {
 connectAuthEmulator(auth, "http://localhost:9099");
  connectFirestoreEmulator(db, 'localhost', 8089);
 connectFunctionsEmulator(functions, "localhost", 5001);
  // connectMessagingEmulator('localhost', 8085); 
}

export {auth, db}