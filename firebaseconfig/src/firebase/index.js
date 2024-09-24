// Import the functions you need from the SDKs you need

import { connectAuthEmulator, getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { connectDatabaseEmulator, getDatabase } from "firebase/database";
import { getFunctions, connectFunctionsEmulator } from 'firebase/functions';

import { getMessaging, getToken, onMessage } from 'firebase/messaging'
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC5rQ8DiIvMmkkX-tebnNZkJdvRYgYbcpA",
  authDomain: "dataaccess-7c490.firebaseapp.com",
  databaseURL: "https://dataaccess-7c490-default-rtdb.firebaseio.com",
  projectId: "dataaccess-7c490",
  storageBucket: "dataaccess-7c490.appspot.com",
  messagingSenderId: "433833016370",
  appId: "1:433833016370:web:de2c160b4302c3951f102b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

const functions = getFunctions(app);


if (window.location.hostname === "localhost") {
  connectDatabaseEmulator(database, 'localhost', 8080);
  connectFunctionsEmulator(functions, "localhost", 5001);
  connectAuthEmulator(auth, "http://localhost:9099");

}



export { auth, database, functions }
// const analytics = getAnalytics(app);
