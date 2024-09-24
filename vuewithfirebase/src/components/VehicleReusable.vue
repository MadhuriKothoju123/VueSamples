<template>

      <v-card-title>
        {{ isEditMode ? 'Edit Vehicle' : 'Add New Vehicle' }}
      </v-card-title>
      <v-card-text>
        <v-form @submit.prevent="submitVehicleData">
          <v-text-field v-model="vehicleData.name" label="Name" required ></v-text-field>
          <v-text-field v-model="vehicleData.type" label="Type" required></v-text-field>
          <v-text-field v-model="vehicleData.model" label="Model" required></v-text-field>
          <v-text-field v-model="vehicleData.year" label="Year" type="number" required></v-text-field>
          <v-text-field v-model="vehicleData.licensePlate" label="License Plate" required></v-text-field>
          <v-text-field v-model="vehicleData.status" label="Status" required></v-text-field>
          <v-text-field v-model="vehicleData.mileage" label="Mileage (km)" type="number" required></v-text-field>
          <v-text-field v-model="vehicleData.price" label="price" type="number" required></v-text-field>

          <v-btn type="submit" color="primary">{{ isEditMode ? 'Update Vehicle' : 'Add Vehicle' }}</v-btn>
        </v-form>
      </v-card-text>
 
  </template>
  
  <script setup>
  import { storeToRefs } from 'pinia';
import { reactive, watch, ref } from 'vue';
import { useVehicleStore } from '../store/vehicles';
  const vehicleStore= useVehicleStore();
  const { vehicleList}= storeToRefs(vehicleStore)
  const props = defineProps({
    isEditMode: {
      type: Boolean,
      default: false,
      required: true
    },
    editvehicleId:{
      type:String
    }
  });

  const vehicleData= reactive({
        name: '',
        type: '',
        model: '',
        year: '',
        licensePlate: '',
        status: '',
        mileage: '',
        price: ''
  })
  const editVehicleId= ref(props?.editvehicleId)
  const editedVehicleData= ref({})
  const emit = defineEmits(['submitForm']);
  watch(editVehicleId, (newValue) => {
    editVehicleId.value= newValue
  if (props.isEditMode) {
    editedVehicleData.value = vehicleList.value.find(vehicle => vehicle.id === editVehicleId.value);

    vehicleData.name = editedVehicleData.value.name || '';
    vehicleData.type = editedVehicleData.value.type || '';
    vehicleData.model = editedVehicleData.value.model || '';
    vehicleData.year = editedVehicleData.value.year || '';
    vehicleData.licensePlate = editedVehicleData.value.licensePlate || '';
    vehicleData.status = editedVehicleData.value.status || '';
    vehicleData.mileage = editedVehicleData.value.mileage || '';
    vehicleData.price = editedVehicleData.value.price || '';

  }
}, { immediate: true });
const submitVehicleData=()=>{
  if(props?.isEditMode){
  emit('submitForm', {id:editVehicleId.value, ... vehicleData })
  }
  else{
  emit('submitForm',  vehicleData)

  }
}

  </script>
  