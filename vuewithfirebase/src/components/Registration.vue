<template>

<div class="snackbar">
    <v-snackbar
      v-model="openAlert"
      multi-line
      :location="'top right'"
      :color="alertProps?.color"
    >
      {{ alertProps?.message }}

      <template v-slot:actions>
        <v-btn color="white" variant="text" @click="openAlert = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
    <v-app >
 <v-main>
    <v-container >
     
        
           <v-sheet class="mx-auto">
             
             <v-card  class="mx-auto  pa-12 pb-8 "  style="margin-top: 170px; width: 800px !important; " elevation="8" >
              <UserregistrationReusable :is-editing="false" @submitForm="registerUser" />
             <p style="margin-top: 20px; display: flex; justify-content: center;">Alerady Have an Account  <p>&nbsp;</p><router-link to="/" > Sign in</router-link></p>
             </v-card>
           </v-sheet>
        
    </v-container>
 </v-main>
</v-app>

</template>
<script setup>
import { reactive, ref } from 'vue';
import { useAuthStore } from '../store/userRegister';
import { companyRules, confirmPasswordRules, emailRules, mobileRules, passwordRules, usernameRules } from '../validations/userValidations';
import { useRouter } from 'vue-router';
import UserregistrationReusable from './UserregistrationReusable.vue';

let alertProps= reactive({color: '', message: ''});
const openAlert= ref(false);
const router= useRouter();
const userAuth= useAuthStore();

const registerUser = async (userData) => {
const res= await userAuth.signup(userData);
if(res?.success){
      alertProps={color:'#43A047', message: res?.message}
      openAlert.value= true;
      setTimeout(() => {
        router.push("/");
      }, 2000);
    }
    else {
      alertProps={color:'#EF5350', message: res?.message}
      openAlert.value= true;
    }
  }

//   const resetData = () => {
//   form.value.reset();
//   Object.keys(userData).forEach(key => {
//     console.log(key)
//     if(key==='location'){
//       userData[key] = [];
//     }
//     else{
//     userData[key] = '';
//     }
//   });
// };

</script>