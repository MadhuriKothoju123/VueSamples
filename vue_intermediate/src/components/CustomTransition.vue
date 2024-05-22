<!-- CustomTransition.vue -->
<template>
    <transition
      enter-from-class="custom-enter-from"
      enter-active-class="custom-enter-active"
      enter-to-class="custom-enter-to"
      leave-from-class="custom-leave-from"
      leave-active-class="custom-leave-active"
      leave-to-class="custom-leave-to"
    >
      <slot></slot>
    </transition>
  </template>
  
  <script>
  export default {
    name: 'CustomTransition',
  };
  </script>
  
  <style>
  .custom-enter-from, .custom-leave-to {
    opacity: 0;
    transform: translateY(-10px);
  }
  
  .custom-enter-active, .custom-leave-active {
    transition: opacity 0.5s, transform 0.5s;
  }
  
  .custom-enter-to, .custom-leave-from {
    opacity: 1;
    transform: translateY(0);
  }
  </style>
  