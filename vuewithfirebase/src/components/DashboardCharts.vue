<template>
  <v-container class="mb-6">
    <v-row align="start">
      <v-col>
        <v-card max-width="500px" style="padding: 20px;">
            <v-card-tittle> Vehicles Count</v-card-tittle>

          <v-card-text style="padding: 40px">
            <Bar v-if="barChartData" :data="barChartData" height="300px" :options="barOptions" />
          </v-card-text>
        </v-card>
      </v-col>

      <v-col>
        <v-card max-width="500px" style="padding: 20px;">
            <v-card-tittle> Vehicles Models</v-card-tittle>
          <v-card-text v-if="vehicleListCounts" style="padding: 40px">
            <Doughnut :data="doughnutData" :options="doughnutOption" />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { computed, onBeforeMount, onMounted, reactive, ref, toRaw, watch } from "vue";
import { Bar, Doughnut } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
} from "chart.js";
import { useVehicleStore } from "../store/vehicles";
import { storeToRefs } from "pinia";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement
);




const vehiclesStore = useVehicleStore()
const { vehicleListCounts, vehicleList } = storeToRefs(vehiclesStore);
const {getVehicleCountsByCompany}=vehiclesStore;

onBeforeMount(async()=>{
   await getVehicleCountsByCompany()
})




let vehicleCount=ref(vehicleListCounts?.value)
let vehicleListData= reactive(vehicleList.value)

let barChartData = reactive({
  labels: Object.keys(vehicleCount.value),
  datasets: [
    {
      label: "Number of Vehicles",
      data: Object.values(vehicleCount.value),
      backgroundColor: "rgba(54, 162, 235, 0.2)",
      borderColor: "rgba(54, 162, 235, 1)",
      borderWidth: 1,
    },
  ],
});

watch(()=>vehicleListCounts.value,(newVal)=>{
  console.log(newVal)
  barChartData= {labels: Object.keys(newVal),
  datasets: [
    {
      label: "Number of Vehicles",
      data: Object.values(newVal),
      backgroundColor: "rgba(54, 162, 235, 0.2)",
      borderColor: "rgba(54, 162, 235, 1)",
      borderWidth: 1,
    },
  ],
}
})
const barOptions = reactive({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    tooltip: {
      callbacks: {
        label: (tooltipItem) => {
            const vehicleType = barChartData.labels[tooltipItem.dataIndex]
          const models = vehicleListData
            .filter(vehicle => vehicle.type === vehicleType)
            .map(vehicle => `${vehicle.name} (${vehicle.model})`)
          return models.join(', ')
        }
      }
    }
  },
  scales: {
    y: {
      beginAtZero: true
    }
  }
  
});

const doughnutData = reactive({
  labels: Object.keys(vehicleCount.value),
  datasets: [
    {
      backgroundColor: ["#41B883", "#E46651", "#00D8FF", "#DD1B16"],
      data: Object.values(vehicleCount.value),
    },
  ],
});

const doughnutOption = reactive({
  responsive: true,
  maintainAspectRatio: false,
});

</script>
