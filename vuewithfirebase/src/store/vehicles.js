// src/stores/auth.js
import { defineStore } from 'pinia';
import { reactive, ref } from 'vue';
import {   collection, deleteDoc, doc,onSnapshot,query,setDoc, updateDoc, where } from 'firebase/firestore';
import {  db } from '../firebase';
import { useAuthStore } from './userRegister';

export const useVehicleStore = defineStore('vehicles', () => {
  let vehicleList = ref([]);
  let vehicleId= ref(0);
  let vehicleListCounts= ref({});
  const companyId = useAuthStore().companyId;

  const fetchVehicles = async () => {
   
    const vehicleCollection = collection(db, 'vehicles');
    const q = query(vehicleCollection, where('companyName', '==', companyId));
    onSnapshot(q,(querySnapShot)=>{ 
        vehicleList.value = querySnapShot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        console.log(vehicleList.value)
      });
  

  };
  const incrementVehicleId=()=>{
    vehicleId.value++;
  }

  const addVehicle = async (vehicle) => {
    console.log(vehicleId.value)
    console.log(vehicle)
    const vehicleDocRef = doc(db, 'vehicles', vehicle.id);
   const res= await setDoc(vehicleDocRef, {
        id: vehicle.id, 
        name: vehicle.name,
        type: vehicle.type,
        model: vehicle.model,
        year: vehicle.year,
        status: vehicle.status,
        licensePlate: vehicle.licensePlate,
        mileage: vehicle.mileage,
        price: vehicle.price,
        companyName: useAuthStore().companyId,
        userEditOrAdd: useAuthStore().user.email
    }).then(()=>{
      return {success: true, message: "Vehicle Added successfully"}
    }).catch((e)=>{
      return  {success: false, message: e.message}
    })

    return res;
  };

  const updateVehicle = async (updateVehicle) => {
    const vehicleDoc = doc(db, 'vehicles', updateVehicle.id);
   const updatedData= {
        id: updateVehicle.id,
        name: updateVehicle.name,
        type: updateVehicle.type,
        model: updateVehicle.model,
        year: updateVehicle.year,
        status: updateVehicle.status,
        licensePlate: updateVehicle.licensePlate,
        mileage: updateVehicle.mileage,
        price: updateVehicle.price,
        companyName: useAuthStore().companyId,
        userEditOrAdd: useAuthStore().userProfileData.name
    }
    await updateDoc(vehicleDoc, updatedData) .then(() => {  
        return true;
      })
      .catch((error) => {
        console.log(error)
        return false
      })


  };

  const deleteVehicle = async (vehicleId) => {
    const vehicleDoc = doc(db, 'vehicles', vehicleId);
    await deleteDoc(vehicleDoc);
  };

  const getVehicleCountsByCompany = async () => {
    console.log(companyId)
    const q = query(collection(db, 'vehicles'), where('companyName', '==', companyId))

  
    onSnapshot(q,async(querySnapShot)=>{ 
        querySnapShot.forEach(async(doc) => {
            const vehicleType = await doc.data().type 
            console.log(vehicleType)
            if (vehicleListCounts.value[vehicleType]) {
              vehicleListCounts.value[vehicleType] += 1
            } else {
              vehicleListCounts.value[vehicleType] = 1
            }
          })
          });
 
  }
  

  return {
   vehicleId,
   vehicleList,
   vehicleListCounts,
   addVehicle,
   updateVehicle,
   deleteVehicle,
   fetchVehicles,
   incrementVehicleId,
   getVehicleCountsByCompany
  };
},
{
  persist: true
}
);
