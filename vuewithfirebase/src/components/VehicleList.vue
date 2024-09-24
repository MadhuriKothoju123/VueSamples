<template>
  <VContainer style="display: flex; margin-top: 60px; justify-content: center">
    <v-card elevation="10" width="1000px" style="padding: 20px">
      <div style="display: flex; justify-content: flex-end">
        <div v-if="isAdminOrUser === 'admin'">
          <RouterLink to="/addVehicle"
            ><VBtn color="green">Add vehicle</VBtn></RouterLink
          >
        </div>
      </div>
      <v-table style="margin: 20px" hover="true" height="500px" fixed-header>
        <thead>
          <tr>
            <th class="text-left">S.No</th>
            <th class="text-left">Vehicle Name</th>
            <th class="text-left">Type</th>
            <th class="text-left">model</th>
            <th class="text-left">year</th>
            <th class="text-left">status</th>

            <th class="text-left">licensePlate</th>
            <th class="text-left">mileage</th>
            <th class="text-left">price</th>

            <th class="text-left">Edit</th>
            <th v-if="isAdminOrUser === 'admin'" class="text-left">Delete</th>
         
          </tr>
        </thead>

        <tbody>
          <TransitionGroup name="fade">
            <tr v-for="(vehicle, index) in vehicleListData" :key="index">
              <td>{{ vehicle.id }}</td>
              <td>{{ vehicle.name }}</td>
              <td>{{ vehicle.type }}</td>
              <td>{{ vehicle.model }}</td>
              <td>{{ vehicle.year }}</td>
              <td>{{ vehicle.status }}</td>
              <td>{{ vehicle.licensePlate }}</td>
              <td>{{ vehicle.mileage }}</td>
              <td>{{ vehicle?.price }}</td>

              <td>
                <VBtn @click="OpenModalContent(vehicle.id)" color="orange"
                  >Edit</VBtn
                >
              </td>
              <td v-if="isAdminOrUser === 'admin'">
                <VBtn color="red" @click="deleteVehicle(vehicle.id)">Delete</VBtn>
              </td>
            
            </tr>
          </TransitionGroup>
        </tbody>
      </v-table>
    </v-card>
  </VContainer>
  <EditVehicle :isEditVehicleModalOpen="isEditVehicleModalOpen" @openEditVehicle="openEditVehicle" :editvehicleId="editvehicleId"/>
</template>
<script setup>
import { computed, onMounted, reactive, ref, watch } from "vue";
import { RouterLink } from "vue-router";
import { useAuthStore } from "../store/userRegister";
import { useVehicleStore } from "../store/vehicles";

import EditVehicle from "./EditVehicle.vue";
import { storeToRefs } from "pinia";

const vehicleStore= useVehicleStore();
const {vehicleList}= storeToRefs(vehicleStore)
const isAdminOrUser = computed(() => useAuthStore()?.userRole);
let vehicleListData= ref(vehicleList.value)
const editvehicleId= ref('')
const isEditVehicleModalOpen= ref(false)
onMounted(async() => {
  await useVehicleStore().fetchVehicles();
});

const openEditVehicle=(data)=>{
  isEditVehicleModalOpen.value= data;
}
const OpenModalContent=async(vehicleId)=>{
  typeof(vehicleId);

  editvehicleId.value = vehicleId
openEditVehicle(true)
}

watch(()=>vehicleList.value,(newVal)=>{
  vehicleListData.value=newVal
})

const deleteVehicle=async(id)=>{
  await useVehicleStore().deleteVehicle(id)
}
</script>
