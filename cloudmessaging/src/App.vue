<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js App"/>
  <button @click="requestPermission">Enable Notifications</button>
</template>

<script setup>
import { onMounted } from 'vue';
import HelloWorld from './components/HelloWorld.vue'
import { getToken} from "firebase/messaging";
import { messaging } from '../firebase';


const requestPermission= async()=> {
  console.log('Requesting permission...');
 const permission=  await Notification.requestPermission();
 console.log(permission)
    if (permission === 'granted') {
      console.log('Notification permission granted.');
    const token=await  getToken(messaging,{vapidKey: "BKr6_GDrshrfeBwQ-nq5p-VclUenW6ifayqNNRtWyuKa82m-tnGi_DbeS0m0_wAoTThBSpTcQHE1DM7wp8rBieE"})
    console.log(token)
    }
    else if(permission==='denied'){
      length.log("Notification is Denied")
    }
  
}

// onMounted(()=>{
//   requestPermission();
// })
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
