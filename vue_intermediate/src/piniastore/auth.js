// src/stores/auth.js
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { auth, db } from '@/firebase';
import { createUserWithEmailAndPassword, isSignInWithEmailLink, sendEmailVerification, sendSignInLinkToEmail, signInWithEmailAndPassword, signInWithEmailLink, signOut } from 'firebase/auth';
import { addDoc, collection, doc, getDocs, limit, orderBy, query, setDoc } from 'firebase/firestore';
// import { ref as dbRef, set } from 'firebase/database';

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null);
const userId= ref('');

const  getNextUserId=async(db)=>{
  const usersCollection = collection(db, 'users');
  const q = query(usersCollection, orderBy('id', 'desc'), limit(1));
  const querySnapshot = await getDocs(q);

  let newId = 1; // Start IDs from 1 if the collection is empty
  if (!querySnapshot.empty) {
    const lastUserDoc = querySnapshot.docs[0];
    const lastUserId = lastUserDoc.data().id;
    newId = lastUserId + 1;
  }

  return newId;
}

  const signup = async (userData) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, userData.email, userData.password);
      const user = userCredential.user;
      console.log(user);
      await sendEmailVerification(user);

      // Store user data in Realtime Database
     // await set(dbRef(db, 'users/' + user.uid),userData);
  
// const usersRef = collection(db, 'users');
await setDoc(doc(db, 'users', user.uid),{
  name: userData.username,
  email: userData.email,
  phoneNumber: userData.mobileNumber,
  country: userData.country
})



      return true;
    } catch (error) {
      console.error("Signup error:", error.message);
      throw error.message;
    } 
  };

  const login = async (userdetails) => {
    console.log(user.value);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, userdetails.email, userdetails.password);
      console.log(userCredential)
      user.value = userCredential.user;
      return true;
    } catch (error) {
      console.error("Login error:", error.message);
      throw error;
    }
  };

  const logout = async () => {
  
      await signOut(auth).then(()=>{
        user.value = null;
        return true;
      }).catch((error)=>{
        console.error("Logout error:", error.message);
        throw error;
      })
    
    
  };


  const sendSignInLink = async (email) => {
    const actionCodeSettings = {
      url: 'http://localhost:5173/finishSignIn/',
      handleCodeInApp: true,
    };
    try {
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      window.localStorage.setItem('emailForSignIn', email);
    } catch (error) {
      console.error("Error sending email sign-in link:", error);
      throw error;
    }
  };

  const completeSignIn = async (url) => {
    try {
      if (isSignInWithEmailLink(auth, url)) {
        const email = window.localStorage.getItem('emailForSignIn');
        const result = await signInWithEmailLink(auth, email, url);
        window.localStorage.removeItem('emailForSignIn');
        user.value = result.user;
      }
    } catch (error) {
      console.error("Error completing sign-in:", error);
      throw error;
    }
  };

  return {
    user,
    signup,
    login,
    logout,
    completeSignIn,
    sendSignInLink
  };
},
{
  persist: true
}
);
