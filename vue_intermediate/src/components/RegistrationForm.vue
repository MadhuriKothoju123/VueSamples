<template>
         <v-app >
      <v-main>
         <v-container >
          
             
                <v-sheet class="mx-auto">
                  
                  <v-card  class="mx-auto  pa-12 pb-8 "  style="margin-top: 170px; width: 800px !important; " elevation="8" >
                  <h2 style="margin-top: 14px; margin-bottom: 45px; display: flex; justify-content: center;">CREATE ACCOUNT</h2>
                    
                     <form ref="form" @submit.prevent="submitForm()">
                      <v-row style="margin-bottom: -40px;">
                        <v-col>
                          <div class="text-subtitle-1 text-medium-emphasis">User Name</div>

                            <v-text-field
                              v-model="userData.username"
                              prepend-inner-icon="mdi-account"
                              name="username"
                              type="text"
                              variant="outlined"
                              density="compact"
                            
                              required
                           ></v-text-field>
                          </v-col>
                          <v-col>
                          <div class="text-subtitle-1 text-medium-emphasis">Email</div>

                           <v-text-field
                              v-model="userData.email"
                              name="email"
                              placeholder="Enter email address"
                              type="text"
                              variant="outlined"
                              density="compact"
                              prepend-inner-icon="mdi-email-outline"
                              required
                           ></v-text-field>
                          </v-col>
                          </v-row>
                          <v-row style="margin-bottom: -40px;" >
                        <v-col>
                          <div class="text-subtitle-1 text-medium-emphasis">Mobile</div>
                            <v-text-field
                              v-model="userData.mobileNumber"
                              name="mobilenumber"
                               placeholder="enter mobile number"
                              type="number"
                              variant="outlined"
                              density="compact"
                              prepend-inner-icon="mdi-phone"
                           
                           ></v-text-field>
                          </v-col>
                          <v-col>
                          <div class="text-subtitle-1 text-medium-emphasis">Country</div>

                            <v-select 
                            v-model="userData.country"
                            placeholder="select the country"
                           :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
                           variant="outlined"
                              density="compact"

                         ></v-select>
                          </v-col>
                          </v-row >
                        <v-row style="margin-bottom: -40px;">
                          <v-col>
                          <div class="text-subtitle-1 text-medium-emphasis">Password</div>

                            <v-text-field
                              v-model="userData.password"
                              type="password"
                              name="password"
                              variant="outlined"
                              density="compact"
                              placeholder="Enter Password"
                            
                              required
                           ></v-text-field>
                          </v-col>
                          <v-col>
                          <div class="text-subtitle-1 text-medium-emphasis">confirm Password</div>

                           <v-text-field
                              v-model="userData.confirmPassword"
                              name="confirmPassword"
                              type="password"
                              variant="outlined"
                              density="compact"
                              required
                              placeholder="Enter Confirm Password"

                           ></v-text-field>
                          </v-col>
                          </v-row>
                          <v-row style="display: flex;margin-top: 46px;">
                           <v-btn type="submit" style='width: 100%;' class="mt-4" color="primary" value="log in">Sign Up</v-btn>
                          </v-row>
                          <v-row style="display: flex;margin-top: 20px;">
                           <v-btn @click="resetData()" style='width: 100%;' class="mt-4" color="secondary" value="log in">Reset</v-btn>
                          </v-row>
                      </form>
                  <p style="margin-top: 20px; display: flex; justify-content: center;">Alerady Have an Account  <p>&nbsp;</p><router-link to="/login" > Sign in</router-link></p>
                  </v-card>
                </v-sheet>
             
         </v-container>
      </v-main>
   </v-app>

</template>
<script setup>
import {reactive, ref  } from 'vue';
 import axios from 'axios';
import router from '@/router';
import store from '@/store';
const userData= reactive({
   username: '',
   email :'',
   mobileNumber:'',
   country: '',
   password:'',
   confirmPassword:''

});


const form = ref(null);

const submitForm =async()=>{  
store.commit('incrementUserId');
          try {   
          
        const res= await axios.post('http://localhost:3000/users', {
            id: store.getters.getUserId,
            username: userData.username,
            email: userData.email,
            country: userData.country,
            password: userData.password,
            mobileNumber: userData.mobileNumber,
            confirmPassword:userData.confirmPassword
          });
         if(res?.status===201){
          alert("Succesfully registered");
       
         router.push('/login')
         }
        } catch (error) {
          if (error.response.data.errors) {
            this.errors = error.response.data.errors;
          }
        }
      }

const resetData=()=>{
  form.value.reset();
}

// onMounted(async () => {
//   try {
//     const response = await axios.get('your_api_endpoint');
//     items.value = response.data;
//     loading.value = false;
//   } catch (error) {
//     console.error('Error fetching data:', error);
//     loading.value = false;
//   }
// });

</script>