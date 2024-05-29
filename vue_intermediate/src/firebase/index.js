// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA2emBA7OxDGBzj9Nb_NT3gg2KjI86Gs-E",
  authDomain: "todo-application-96ec1.firebaseapp.com",
  projectId: "todo-application-96ec1",
  storageBucket: "todo-application-96ec1.appspot.com",
  messagingSenderId: "793735905703",
  appId: "1:793735905703:web:94fd74e42bdd777d57b682",
  measurementId: "G-B7ERG53N62"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);



export { auth, db }
// const analytics = getAnalytics(app);
