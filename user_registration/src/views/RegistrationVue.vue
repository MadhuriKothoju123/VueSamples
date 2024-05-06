

<template>
    <div class="registration">
      <h1>Registration</h1>
      <UserRegistration />
    </div>
  </template>
  
  <style>
  @media (min-width: 1024px) {
    .registration {
      min-height: 100vh;
      display: flex;
      align-items: center;
      flex-direction: column ;
      width: 450px;
      
    }
  }
  </style>
  <script>
  import UserRegistration from '@/components/UserRegistration.vue';
  export default {
  components: {
    UserRegistration
  }
};
</script>
  