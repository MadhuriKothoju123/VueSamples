<template>
<div>
   <Header />
  <RouterView />
</div>
</template>
<script setup>
import { RouterView } from 'vue-router';
import Header from './components/HeaderView.vue';

</script>
