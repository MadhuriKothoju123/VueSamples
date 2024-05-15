<template>
 
    <v-container >
     
        
           <v-sheet width="800" class="mx-auto">
             
             <v-card class="mx-auto  pa-12 pb-8 "  style="margin-top: 170px;" elevation="8"    
 >
             <h2 style="margin-top: 14px; margin-bottom: 45px; display: flex; justify-content: center;">SIGN IN</h2>
               
                <form ref="form" @submit.prevent="login()">
              
                     <div class="text-subtitle-1 text-medium-emphasis">Email</div>

                      <v-text-field
                         v-model="email"
                         name="email"
                         placeholder="Enter email address"
                         type="text"
                         variant="outlined"
                         density="compact"
                         prepend-inner-icon="mdi-email-outline"
                         required
                      ></v-text-field>
                   

                  
                
                     <div class="text-subtitle-1 text-medium-emphasis">Password</div>

                       <v-text-field
                         v-model="password"
                         type="password"
                         name="password"
                         density="compact"
                         variant="outlined"
                         placeholder="Enter Password"
                       
                         required
                      ></v-text-field>
                      <v-btn type="submit" style='width: 100%;' class="mt-4" color="primary" value="log in">Login</v-btn>
                  
                 </form>
             <p style="margin-top: 20px; display: flex; justify-content: center;">Not a member <br/> <router-link to="/registration" > Sign up</router-link></p>
             </v-card>
           </v-sheet>
        
    </v-container>


  </template>
<script setup>
import router from '@/router';
import { ref } from 'vue';
import { useStore } from 'vuex';
const store= useStore();
const loading = ref(false);
const email = ref('');
const password = ref('');
const error = ref(null);



const login=async()=>{
   loading.value = true;
  try {
    // Simulating user authentication with a delay
   console.log(email.value);
    await store.dispatch('loginUser', email.value
);
  
    router.push('/todoForm');
  } catch (err) {
    error.value = 'Invalid username or password';
  } finally {
    loading.value = false;
  }
}


</script>