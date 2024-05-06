<template>
    <h1>provider Component</h1><hr>
  
    <ProviderCompo />
  </template>
  
  <script>
  import ProviderCompo from '@/components/ProviderCompo.vue'
  
  export default {
    components: { ProviderCompo },
    provide: {
      username: 'madhuri'
    }
  }
  </script>