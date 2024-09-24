// src/stores/auth.js
import { defineStore, storeToRefs } from "pinia";
import { ref } from "vue";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { auth, db } from "../firebase";
import { useVehicleStore } from "./vehicles";

export const useAuthStore = defineStore(
  "auth",
  () => {
    const user = ref(null);
    const userRole = ref("");
    const companyId = ref(null);
    const userProfileData = ref({});

    const signup = async (userData) => {
      try {
        // Check if the company already exists
        const companyQuery = query(
          collection(db, "companies"),
          where("name", "==", userData?.company)
        );
        const companySnapshot = await getDocs(companyQuery);

        let companyId;
        if (companySnapshot.empty) {
          const companyDocRef = doc(collection(db, "companies"));
          await setDoc(companyDocRef, {
            name: userData.company,
          });
          companyId = companyDocRef.id;
        } else {
          companyId = companySnapshot.docs[0].id;
        }

        const userCredential = await createUserWithEmailAndPassword(
          auth,
          userData.email,
          userData.password
        );
        const user = userCredential.user;
        await sendEmailVerification(user);
        await setDoc(doc(db, "users", user.uid), {
          id: user.uid,
          name: userData.username,
          email: userData.email,
          locations: userData.location,
          mobileNumber: userData.mobileNumber,
          companyId: companyId,
          companyName: userData?.company,
          gender: userData.gender,
          role: companySnapshot.empty ? "admin" : "employee", 
        });

        return { success: true, message: "User successfully registered" };
      } catch (e) {
        console.error(e.message);
        return { success: false, message: e.message };
      }
    };

    const login = async (userdetails) => {
    const vehicleStore= useVehicleStore();

      const  { fetchVehicles }= vehicleStore
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          userdetails.email,
          userdetails.password
        );
        user.value = userCredential.user;
       await getProfileUserDetails()
       await fetchVehicles()
        const userDoc = await getDoc(doc(db, "users", user.value.uid));
        if (userDoc.exists()) {
          userRole.value = userDoc.data().role;
          companyId.value = userDoc.data().companyId;
        } else {
          console.error("No such document!");
        }
        return true;
      } catch (error) {
        console.error("Login error:", error.message);
        throw error;
      }
    };

    const logout = async () => {
    const vehicleStore= useVehicleStore();

      const {vehicleList, vehicleListCounts}= storeToRefs(vehicleStore);
      await signOut(auth) 
        .then(() => {
          user.value = null;
          userRole.value = null;
          companyId.value = null;
          userProfileData.value={}
          vehicleList.value=[];
          vehicleListCounts.value={}

          return true;
        })
        .catch((error) => {
          console.error("Logout error:", error.message);
          throw error;
        });
    };
    const getProfileUserDetails = async () => {
      const vehicleCollection = collection(db, "users");
      const q = query(vehicleCollection, where("id", "==", user?.value?.uid));
      // const querySnapshot = await getDocs(q);

      // const data = querySnapshot.docs.map((doc) => ({
      //   id: doc.id,
      //   ...doc.data(),
      // }));
      // userProfileData.value = data[0];

      onSnapshot(q,(querySnapShot)=>{ 

        const data=querySnapShot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        console.log(data[0])
        userProfileData.value=data[0]
      });
    };

    const updateUserDetails=async(userData)=> {

      const userDocRef = doc(db, 'users', user.value.uid);
      const updatedFields = {
        id: user.value.uid,
        name: userData.username,
        locations: userData.location,
        mobileNumber: userData.mobileNumber,
        gender: userData.gender,
  
      };
      const res = await updateDoc(userDocRef, updatedFields)
  
        .then((data) => {
          console.log(data)
          return { success: true, message: "User profile Updated" };

        })
        .catch((error) => {
          console.log(error)
          return { success: false, message: error.message };

        })
  return res;
    }

    return {
      user,
      userRole,
      companyId,
      userProfileData,
      signup,
      login,
      logout,
      getProfileUserDetails,
      updateUserDetails
    };
  },
  {
    persist: true,
  }
);
