<template>
   <Alert />
    <v-card  width="500px">
    <VehicleReusable :isEditMode="false" @submitForm="addVehicle"  />
    </v-card>

  </template>
  
  <script setup>
import { reactive, ref } from 'vue';
import { useVehicleStore } from '../store/vehicles';
import VehicleReusable from './VehicleReusable.vue';
import { useAlertProperties } from '../composiable/alertProperties';
const { openAlert}= useAlertProperties()


  const vehicleStore= useVehicleStore();
  let alertsData= reactive({
    alertMessage: '',
    color: ''
  })

  const addVehicle = async(vehicle) => {
    
   vehicleStore.incrementVehicleId();
   const res= await vehicleStore.addVehicle({id: vehicleStore.vehicleId.toString(), ...vehicle })
  console.log(res)
  if(res.success){
    alertsData = { alertMessage: "Successfully added vehicle", color: "#43A047" };
    openAlert(alertsData)
    }
    else{
      alertsData = { alertMessage: err.message, color: "#EF5350" };
      openAlert(alertsData)

    }


  };
  </script>
  