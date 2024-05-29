<template>
 
    <v-container >
     
        
           <v-sheet width="800" class="mx-auto">
             
             <v-card class="mx-auto  pa-12 pb-8 "  style="margin-top: 170px;" elevation="8"    
 >
             <h2 style="margin-top: 14px; margin-bottom: 45px; display: flex; justify-content: center;">SIGN IN</h2>
               
                <form ref="form" @submit.prevent="login()">
              
                     <div class="text-subtitle-1 text-medium-emphasis">Email</div>

                      <v-text-field
                         v-model="user.email"
                         name="email"
                         placeholder="Enter email address"
                         type="text"
                         variant="outlined"
                         density="compact"
                         prepend-inner-icon="mdi-email-outline"
                         required
                         :error-messages="v$.email.$invalid? emailValidation(v$.email.$invalid, user?.email ): ''"
                   
                      ></v-text-field>
                   

                  
                
                     <div class="text-subtitle-1 text-medium-emphasis">Password</div>

                       <v-text-field
                         v-model="user.password"
                         type="password"
                         name="password"
                         density="compact"
                         variant="outlined"
                         placeholder="Enter Password"
                         :error-messages="v$.password.$invalid? passwordValidation(v$.password.$invalid, user?.password ): ''"
                       
                         required
                      ></v-text-field>
                      <v-btn type="submit" style='width: 100%;' class="mt-4" color="primary" value="log in">Login</v-btn>
                  
                 </form>
             <p style="margin-top: 20px; display: flex; justify-content: center;">Not a member <br/> <router-link to="/registration" > Sign up</router-link></p>
             <p style="margin-top: 20px; display: flex; justify-content: center;">Not a member <br/> <router-link to="/emialLinlLogin" > Send Sign-In Link</router-link></p>

             </v-card>
           </v-sheet>
        
    </v-container>


  </template>
<script setup>
import router from '@/router';
import useVuelidate from '@vuelidate/core';
import { computed } from 'vue';
import { reactive } from 'vue';
import { required, email, minLength } from '@vuelidate/validators';
import { emailValidation, passwordValidation } from '@/validation/registrationFormValidations';
import { useAuthStore } from '@/piniastore/auth';
// const store= useStore();
const user=reactive({
  email:'' ,
password:''
});

const authStore= useAuthStore();



const rules = computed(()=>({
    email: { required, email },
    password: { required, minLength: minLength(8) },
}));
  
 
  

const v$ = useVuelidate(rules, user)

const login=async()=>{

  try {
   console.log(email);
  const res= await authStore.login(user);
  //  if(res.status===200) {
  //   await store.dispatch('loginUser', email.value);
  //   alert('Successfully User Logined');
  //   router.push('/todoForm');
  //  }

  if(res){
    alert('Successfully User Logined');
    router.push('/todoForm');
  }
  
  } catch (err) {
  console.log('Invalid username or password');
  } 
}


</script>