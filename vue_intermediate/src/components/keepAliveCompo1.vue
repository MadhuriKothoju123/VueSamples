<script setup>
import { ref } from 'vue'

const count = ref(0)
</script>

<template>
  <p>Current component: A</p>

  <VBtn @click="count++">+</VBtn>
  <span>count: {{ count }}</span>
</template>