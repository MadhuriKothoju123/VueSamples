<template>
  <v-dialog v-model="isDialogOpen" max-width="500">
    <v-card>
      <v-card-title>{{ title }}</v-card-title>
      <v-card-text>
        <v-text-field v-model="email" label="Email" outlined></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="error" @click="emitCloseDialog">Close</v-btn>
        <v-btn color="primary" @click="sendPasswordReset">Change Password</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits } from 'vue'
import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '../firebase'

const props = defineProps({
  title: {
    type: String,
    default: "Change Password",
  },
  dialog: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits(['setOpenDialog'])

const email = ref('')
const isDialogOpen = ref(props.dialog)

watch(() => props.dialog, (newVal) => {
  isDialogOpen.value = newVal
})

const emitCloseDialog = () => {
  emit('setOpenDialog', false)
}

const sendPasswordReset = async () => {
  try {
    await sendPasswordResetEmail(auth, email.value)
    alert('Password reset email sent. Please check your inbox.')
  } catch (error) {
    alert(`Error: ${error.message}`)
  }
}
</script>

<style scoped>
/* Add any styles you need here */
</style>
