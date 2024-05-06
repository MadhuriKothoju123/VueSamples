<template>
    <p>child component C</p>
    <p>{{ username }}</p>
    <p>Successfully Done with Providers</p>

  </template>
  
  <script>
  export default {
    inject: ['username']
  }
  </script>
