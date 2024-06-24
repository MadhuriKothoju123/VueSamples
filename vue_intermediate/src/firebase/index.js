import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, connectAuthEmulator, getAuth, getRedirectResult, signInWithRedirect } from "firebase/auth";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';
import { getMessaging } from 'firebase/messaging';
import { getFunctions, connectFunctionsEmulator } from 'firebase/functions';


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
const storage = getStorage(app);
 
const provider = new GoogleAuthProvider();

const db = getFirestore(app);

const messaging = getMessaging(app);
const functions = getFunctions(app);


if (window.location.hostname === 'localhost') {
  // connectAuthEmulator(auth, "http://localhost:9099");
  connectFirestoreEmulator(db, 'localhost', 8080);
  connectFunctionsEmulator(functions, "localhost", 5001);
  // connectMessagingEmulator('localhost', 8085); 
}
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



export { auth, db, storage, signInWithGoogle, getGoogleRedirectResult, messaging }
