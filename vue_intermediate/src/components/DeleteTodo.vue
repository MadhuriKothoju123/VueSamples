<template>
 <SlotsComponent :openModal="openModal"
    :maxWidth="'500px'"
    :cardHeight="'600px'"
  >
  <template #content>

  </template>

</SlotsComponent>
</template>
<script setup>
import store from '@/store';
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';  
import SlotsComponent from './SlotsComponent.vue';

const openModal= ref(true);

</script>