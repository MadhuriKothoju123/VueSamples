<template>
   {{ isVehicleEdit }}
   <v-dialog v-if="isVehicleEdit" v-model="isVehicleEdit" >
      <v-card  class="mx-auto  pa-12 pb-8 "  style="margin-top: 170px; width: 800px !important; " elevation="8" >
              <div style="display: flex; justify-content: end;">
              <v-btn @click="closeEditVehicleModal" icon v-bind="props" color="secondary">
            <v-icon size="large">mdi-close-circle</v-icon>
          </v-btn>
        </div>
   <VehicleResuable  :isEditMode="true" @submitForm="updateVehicleData" :editvehicleId="editvehicleId"/>
</v-card>

</v-dialog>
</template>
<script setup>
import { ref, watch } from 'vue';
import VehicleResuable  from './VehicleReusable.vue'
import { useVehicleStore } from '../store/vehicles';

const vehicleStore= useVehicleStore();
const props= defineProps({
    isEditVehicleModalOpen: {
        type: Boolean,
        required: true
    },
    editvehicleId:{
      type: String,
      required: true
    }

})
const editedVehicleData= ref(props?.editvehicleId)
const isVehicleEdit= ref(props?.isEditVehicleModalOpen);
const emit= defineEmits(['openEditVehicle'])


const closeEditVehicleModal=()=>{
    emit('openEditVehicle', false)
}
watch(()=>props?.isEditVehicleModalOpen, (newVal)=>{
   isVehicleEdit.value= newVal
})

watch(()=>props?.editvehicleId, (newVal)=>{
   editedVehicleData.value= newVal
})
const updateVehicleData=async(vehicleData)=>{
 await  vehicleStore.updateVehicle(vehicleData)
}

</script>