<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js App"/>
</template>

<script setup>
import { onMounted } from 'vue';
import HelloWorld from './components/HelloWorld.vue'
import { getToken} from "firebase/messaging";
import { messaging } from 'firebase';

const requestPermission= ()=> {
  console.log('Requesting permission...');
  Notification.requestPermission().then(async(permission) => {
    if (permission === 'granted') {
      console.log('Notification permission granted.');
    const token=await  getToken(messaging,{vapidKey: "BH-K81A2FJckZCraAtODHFQATcya0HGy7_dNVd9-TVyGE_waEVa_TXnKn_iAzle9YoZSykxUL_DJg-AZ5DGxcjM"})
    console.log(token)
    }
    else if(permission==='denied'){
      length.log("Notification is Denied")
    }
  })
}

onMounted(()=>{
  requestPermission();
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
