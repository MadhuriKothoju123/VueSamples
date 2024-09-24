<template>

    <v-tabs v-model="tab" background-color="primary">
      <v-tab v-for="item in tabs" :key="item.value" :value="item.value">{{ item.text }}</v-tab>
    </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item v-for="item in tabs" :key="item.value" :value="item.value">
          <div v-if="tab === item.value">
            <component :is="item.component" v-if="tab === item.value"></component>
          </div>
        </v-tab-item>
      </v-tabs-items>

</template>



<script setup>
import { ref } from 'vue';
import DashboardCharts from '../components/DashboardCharts.vue';
import VehicleList from '../components/VehicleList.vue';
const tab = ref('dashboard');


const tabs = [
  { value: 'dashboard', text: 'Dashboard', component: DashboardCharts },
  { value: 'vehicles', text: 'Vehicles', component: VehicleList }
];
</script>
  