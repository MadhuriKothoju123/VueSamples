<template>
         <v-app >
      <v-main>
         <v-container >
          
             
                <v-sheet class="mx-auto">
                  
                  <v-card  class="mx-auto  pa-12 pb-8 "  style="margin-top: 170px; width: 800px !important; " elevation="8" >
                  <h2 style="margin-top: 14px; margin-bottom: 45px; display: flex; justify-content: center;">CREATE ACCOUNT</h2>
                    
                     <form  @submit.prevent="submitForm()">
                      <v-row style="margin-bottom: -40px;">
                        <v-col>
                          <div class="text-subtitle-1 text-medium-emphasis">User Name</div>

                            <v-text-field
                              v-model="userData.username"
                              prepend-inner-icon="mdi-account"
                              name="username"
                              placeholder="Enter username"
                              type="text"
                              variant="outlined"
                              density="compact"
                             :error-messages="v$.username.$invalid? usernameValidation(v$.username.$invalid, userData.username ): ''"
                           

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
                             :error-messages="v$.email.$invalid? emailValidation(v$.email.$invalid, userData.email ): ''"

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
                              :error-messages="v$.mobileNumber.$invalid? moblieNumberValidation(v$.mobileNumber.$invalid, userData.mobileNumber ): ''"
                          
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
                             :error-messages="v$.password.$invalid? passwordValidation(v$.password.$invalid, userData.password ): ''"

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
import router from '@/router';
import { useAuthStore } from '@/piniastore/auth';
import useVuelidate from '@vuelidate/core';
import { required, email, minLength, sameAs } from '@vuelidate/validators';
import { computed } from 'vue';
import { reactive } from 'vue';
import { emailValidation, moblieNumberValidation, passwordValidation, usernameValidation } from '@/validation/registrationFormValidations';
const userData= reactive({
   username: '',
   email :'',
   mobileNumber:'',
   country: '',
   password:'',
   confirmPassword:''

});

const rules = computed(()=>({
    username: { required,  minLength: minLength(3) },
    email: { required, email },
    mobileNumber: { required, minLength: minLength(10) },
    country: { required },
    password: { required, minLength: minLength(8) },
    confirmPassword: { required, sameAsPassword: sameAs(userData?.password) }
}));
  
 
  

const v$ = useVuelidate(rules, userData)
const authStore= useAuthStore();


const submitForm =async()=>{  
          try {   
       const res= await authStore.signup(userData);
  
    if(res){
      alert('Signup successful');
      router.push('/login')

    }
    
        } catch (error) {
    alert(error.message);
  }
      }

const resetData=()=>{
  v$.value.$reset();
  Object.keys(userData).forEach(key => {
    userData[key] = '';
  });
}

</script>