

<template>
    <v-dialog v-model="isDialogOpen"  >
        <v-card  class="mx-auto  pa-12 pb-8 "  style="margin-top: 170px; width: 800px !important; " elevation="8" >
              <div style="display: flex; justify-content: end;">
              <v-btn @click="closeEditUserModal" icon v-bind="props" color="secondary">
            <v-icon size="large">mdi-close-circle</v-icon>
          </v-btn>
        </div>
        
    <UserregistrationReusable :is-editing="true" @submitForm="editUserData" />
        </v-card>
    </v-dialog>
</template>
<script setup>
import { ref, watch } from 'vue';
import UserregistrationReusable from './UserregistrationReusable.vue';
import { useAuthStore } from '../store/userRegister';
const userStore= useAuthStore()
const props= defineProps({
    isEditUserModalOpen: {
        type: Boolean,
        required: true
    }

})
const emit= defineEmits(['openEdituser'])
const isDialogOpen= ref(props?.isEditUserModalOpen)


const closeEditUserModal=()=>{
    emit('openEdituser', false)
}
const editUserData =async(userData)=>{
   const res= await userStore.updateUserDetails(userData)
 alert(res.message)
}
watch(()=>props?.isEditUserModalOpen, (newVal)=>{
    isDialogOpen.value= newVal
})
</script>