<template>
     <v-dialog v-model="isUserDialogOpen" max-width="500">
    <v-card>
      <v-card-title>User Profile</v-card-title>
      <v-card-text>
        <v-list dense>
          <v-list-item v-for="(value, key) in userProfile" :key="key" v-if="key !== 'id'">
            <v-list-item-content>
              <v-list-item-title>{{ formatKey(key) }}</v-list-item-title>
              <v-list-item-subtitle>{{ formatValue(value) }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="error" @click="closeModal" >Close</v-btn>
        <v-btn color="primary" @click="openEdituser(true)" >Edit</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <EditUserProfile :isEditUserModalOpen="isEditUserModalOpen" @openEdituser="openEdituser" />
</template>
<script setup>
import { onMounted, ref, watch } from 'vue';
import { useAuthStore } from '../store/userRegister';
import { storeToRefs } from 'pinia';
import EditUserProfile from './EditUserProfile.vue';
const userStore= useAuthStore();
const { userProfileData } = storeToRefs(userStore)
const userProfile= ref(userProfileData?.value);
const props= defineProps({
  isProfileDialog: {
    type: Boolean,
    required: true
  }
})
const emit= defineEmits(['setProfileDialogOpen'])
const isEditUserModalOpen= ref(false);
const isUserDialogOpen= ref(props?.isProfileDialog);
watch(() => props?.isProfileDialog, (newVal) => {
  isUserDialogOpen.value = newVal
}) 


watch(()=>userProfileData?.value,(newVal)=>{
  userProfile.value= newVal
}

)
const openEdituser=(data)=>{
  isEditUserModalOpen.value= data;
}
const closeModal=()=>{
  emit('setProfileDialogOpen', false)
}

const formatKey = (key) => {

  console.log(key)
  return key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
};

const formatValue = (value) => {
  return Array.isArray(value) ? value.join(', ') : value;
};
onMounted(async()=>{
  await userStore?.getProfileUserDetails()
})
</script>