<template>
    <div >
     <LifeCycleHooks />
    </div>
  </template>
  
  <style>
  @media (min-width: 1024px) {
    .about {
      min-height: 100vh;
      display: flex;
      align-items: center;
    }
  }
  </style>
  <script>
  import LifeCycleHooks from   '@/components/LifeCycleHooks.vue';
  export default {
    components: {
        LifeCycleHooks
    } 
  }
  </script>
  