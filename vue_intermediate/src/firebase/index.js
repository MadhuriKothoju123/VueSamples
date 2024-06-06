// Import the functions you need from the SDKs you need
import router from "@/router";
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, getRedirectResult, signInWithPopup, signInWithRedirect } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';
// import { getDatabase } from "firebase/database";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA2emBA7OxDGBzj9Nb_NT3gg2KjI86Gs-E",
  authDomain: "todo-application-96ec1.firebaseapp.com",
  projectId: "todo-application-96ec1",
  storageBucket: "gs://todo-application-96ec1.appspot.com",
  messagingSenderId: "793735905703",
  appId: "1:793735905703:web:94fd74e42bdd777d57b682",
  measurementId: "G-B7ERG53N62"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// const db = getDatabase(app);
const db = getFirestore(app);
const storage = getStorage(app);
const provider = new GoogleAuthProvider();



const signInWithGoogle = async () => {
  try {
    await signInWithRedirect(auth, provider);
  } catch (error) {
    console.error("Error signing in with Google: ", error);
  }
};

const getGoogleRedirectResult = async () => {
  try {
    const result = await getRedirectResult(auth);
    if (result) {
      console.log(result.user);
      return result.user;
    }
  } catch (error) {
    console.error("Error getting redirect result: ", error);
  }
};

export { auth, db, storage, signInWithGoogle, getGoogleRedirectResult }
// const analytics = getAnalytics(app);


// import { getApp } from "firebase/app";
// import { getStorage } from "firebase/storage";

// // Get a non-default Storage bucket
// const firebaseApp = getApp();
// const storage = getStorage(firebaseApp, "gs://my-custom-bucket");