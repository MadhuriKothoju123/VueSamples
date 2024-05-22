<script setup>
import { RouterView } from 'vue-router'
import HeaderToolbarRouter from './components/HeaderToolbarRouter.vue';
// import RegistrationForm from './components/RegistrationForm.vue';

</script>

<template>
  <Suspense>
    <div>
  <HeaderToolbarRouter  />
  <RouterView />
</div>
</Suspense>
</template>


