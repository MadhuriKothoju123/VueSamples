import { defineStore } from 'pinia';
import { ref } from 'vue';
import { auth, database } from '../firebase';
import { createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { ref as dbRef, set } from 'firebase/database';

export const useUserStore = defineStore('user', () => {
  const user = ref(null);

  const writeUserData = (userId, email, username) => {
    set(dbRef(database, 'users/' + userId), {
     email,
      username

    });
  };

const signUp = (email, password, username) => {
  let res;
 res= createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const newUser = userCredential.user;
       sendEmailVerification(newUser)
           writeUserData(newUser.uid, newUser.email, username);
          user.value = newUser;
          console.log('User created and email verification sent');
          return true
        })

    .catch((error) => {
      console.error('Error creating user:', error.message);
      return false
    });
    return res;
};

  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log(userCredential)
      user.value = userCredential.user;
      return true;
    } catch (error) {
      console.error(error);
      return false;
  
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      user.value = null;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  // signUp('test@cognine.com', 'password123', 'dmadhuri');

  // Test with an invalid domain
  return { user, signUp, login, logout };
},
{
  persist: true
}
);
