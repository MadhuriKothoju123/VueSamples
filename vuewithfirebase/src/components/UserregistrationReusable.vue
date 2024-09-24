<template>
       
    <h2 style="margin-top: 14px; margin-bottom: 45px; display: flex; justify-content: center;">{{ isEditing? 'Edit Profile' : 'CREATE ACCOUNT'}}</h2>
    <form ref="form" @submit.prevent="submitUserData()">
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
                        :rules="usernameRules"
                         :disabled="isEditing"
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
                       :rules="emailRules"
                         :disabled="isEditing"
                         variant="outlined"
                         density="compact"
                         prepend-inner-icon="mdi-email-outline"

                      ></v-text-field>
                     </v-col>

                     </v-row >
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
                        :rules="mobileRules"
                  
                      ></v-text-field>
                     </v-col>
                        <v-col cols="6">
                           <label class="text-subtitle-1 text-medium-emphasis">Gender</label>
                             <v-radio-group v-model="userData.gender" >
                         <v-row>
                       
                                <v-col cols="12" md="4">
                                <v-radio label="Male" value="male"></v-radio>
                         </v-col>
                          <v-col cols="12" md="4">
                          <v-radio label="Female" value="female"></v-radio>
                       </v-col>
                    <v-col cols="12" md="4">
                  <v-radio label="Other" value="other"></v-radio>
                </v-col>
              </v-row>
            </v-radio-group>
          </v-col>

          
        </v-row>
                     <v-row style="margin-bottom: -40px;" >
                   <v-col>
                     <div class="text-subtitle-1 text-medium-emphasis">company</div>
                       <v-text-field
                         v-model="userData.company"
                          name="company"
                          placeholder="enter company name"
                         type="text"
                         variant="outlined"
                         density="compact"
                        :rules="companyRules"
                          required
                        :disabled="isEditing"
                      ></v-text-field>
                     </v-col>
                     <v-col>
                     <div class="text-subtitle-1 text-medium-emphasis">location</div>

                       <v-select 
                         v-model="userData.location" 
                         placeholder="select the locations"
                        :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
                         variant="outlined"
                         density="compact"
                         multiple

                    ></v-select>
                     </v-col>
                     </v-row >
                   <v-row v-if="!isEditing" style="margin-bottom: -40px;">
                     <v-col>
                     <div class="text-subtitle-1 text-medium-emphasis">Password</div>

                       <v-text-field
                         v-model="userData.password"
                         type="password"
                         name="password"
                         variant="outlined"
                         density="compact"
                         placeholder="Enter Password"
                         :rules="passwordRules"
                         required

                      ></v-text-field>
                     </v-col>
                     <v-col>
                     <div class="text-subtitle-1 text-medium-emphasis">Confirm Password</div>

                     <v-text-field
                         v-model="userData.confirmPassword"
                  
                         type="password"
                         name="confirm password"
                         variant="outlined"
                         density="compact"
                         placeholder="Enter confirm password"
                         :rules="confirmPasswordRules(userData.password)"
                         required

                      ></v-text-field>
             
                     </v-col>
                     </v-row>
                     <v-row style="display: flex;margin-top: 46px;">
                      <v-btn type="submit" style='width: 100%;' class="mt-4" color="primary" >{{ isEditing? 'Submit' :'Sign Up'}}</v-btn>
                     </v-row>
                     <v-row style="display: flex;margin-top: 20px;">
                      <v-btn v-if="!isEditing" @click="resetData()" style='width: 100%;' class="mt-4" color="secondary" value="log in">Reset</v-btn>
                     </v-row>
    </form>
  </template>
  
  <script setup>
import { ref, watch } from 'vue';
import { companyRules, confirmPasswordRules, emailRules, mobileRules, passwordRules, usernameRules } from '../validations/userValidations';
import { useAuthStore } from '../store/userRegister';
import { storeToRefs } from 'pinia';
const userStore= useAuthStore();
const { user, userProfileData} =storeToRefs(userStore)

const userProfile= ref(userProfileData?.value);

  const props = defineProps({
    isEditing: {
      type: Boolean,
      default: false
    }
  })


  const emit= defineEmits(['submitForm'])
  const form= ref(null)
  const userData = ref({
    username: '',
    email: '',
    mobileNumber: '',
    gender: '',
    company: '',
    location: [],
    password: '',
    confirmPassword: ''
  })
  watch(userProfileData, (newValue) => {
  if (props.isEditing) {
    userProfile.value = newValue || {};
    userData.value.username = userProfile.value.name || '';
    userData.value.email = userProfile.value.email || '';
    userData.value.mobileNumber = userProfile.value.mobileNumber || '';
    userData.value.gender = userProfile.value.gender || '';
    userData.value.company = userProfile.value.companyName || '';
    userData.value.location = userProfile.value.locations || [];
  }
}, { immediate: true });
  const submitUserData =()=>{
    emit('submitForm', userData.value)
  }
const resetData = () => {
  form.value.reset();
  Object.keys(userData).forEach(key => {
    if(key==='location'){
      userData[key] = [];
    }
    else{
    userData[key] = '';
    }
  });
};

</script>
  