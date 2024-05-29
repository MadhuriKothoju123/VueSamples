<!-- src/components/SignUp.vue -->
<template>
  <div style="display: flex; justify-content: center; margin-top: 30px;">
    <VCard style="width: 500px; padding: 30px;">
      <h2>Password less Login</h2>
      <form @submit.prevent="sendLink">
        <VTextField v-model="email" type="email" placeholder="Enter your email" required />
        <v-btn color="blue" type="submit">Send Sign-In Link</v-btn>
      </form>
    </VCard>
  </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  // import { useAuthStore } from '../stores/auth';
  
  const email = ref('');
  // const authStore = useAuthStore();
  
  const sendLink = async () => {
    try {
      await authStore.sendSignInLink(email.value);
      alert('Sign-in link sent! Check your email.');
    } catch (error) {
      alert('Error sending sign-in link: ' + error.message);
    }
  };
  </script>
  