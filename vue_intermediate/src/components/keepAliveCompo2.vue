<script setup>
import { ref } from 'vue'
const msg = ref('')
</script>

<template>
  <p>Current component: B</p>
 
  <VTextField v-model="msg"></VTextField>

  <span>Message is: {{ msg }}</span>
</template>
