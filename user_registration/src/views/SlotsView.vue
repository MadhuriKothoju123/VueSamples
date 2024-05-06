<template>
    <div class="slots">
 <slot-sample>
    <template #cardTitle="propChild">{{ propChild.pTitle }}</template>
    <template v-slot:default>
      <img src="https://picsum.photos/200">
    </template>
  </slot-sample>
</div>
  </template>
  
  <script>
  import SlotSample from '@/components/SlotSample.vue'
  
  export default {
    components: { SlotSample },

    

    data() {
      return { postTitle: 'Post Title' }
    }
  }
  </script>
  <style>
  @media (min-width: 1024px) {
    .slots {
      min-height: 100vh;
      display: flex;
      align-items: center;
    }
    
  }
  </style>