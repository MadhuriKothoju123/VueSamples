
<!-- conditional Render -->

<template>
    <p v-if="num === 0">The number is 0</p>
    <p v-else-if="num > 0">The number is positive</p>
    <p v-else-if="num < 0">The number is negative</p>
    <p v-else>The number is a lie</p>
    <div v-show="showContent"> This content will visable abased on showContent boolean using 'v-show'</div>

<br />
    <p v-for="(name, x) in list" :key="name.id">
    {{ x }} - {{ name.first }} {{ name.last }}
  </p>
  </template>
  
  <script setup>
import { ref } from 'vue';

const num= ref(10);
const list =ref( [
        { id: 0, first: 'John', last: 'Doe' },
        { id: 1, first: 'Jane', last: 'Doe' }
      ])

      const showContent= ref(false);

  </script>