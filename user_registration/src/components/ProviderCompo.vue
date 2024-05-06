<template>
    <p>parent component C</p>
    <ChildProvider />
  </template>
  
  <script>
    import ChildProvider from './ChildProvider.vue'
  export default {
    components:{
        ChildProvider
    },
 
  }
  </script>