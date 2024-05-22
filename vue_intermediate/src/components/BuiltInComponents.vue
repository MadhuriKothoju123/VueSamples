<template>
    <div>
  <VBtn @click="isVisible = !isVisible">Toggle Content</VBtn>
  <br/>
  <transition name="fade" >
    <div v-show="isVisible">This is some hidden content.</div>
  </transition>
  <br/>
  
<VBtn @click="slideInElement">Toggle Content</VBtn>
<br/>
<!-- How many how that transition can appear is duration -->
  <transition duration="5000" name="slide-in">
  <div v-if="showElement">This element will slide in.</div>
</transition>

<br/>

<br/>

    <VBtn @click="showCustomElement = !showCustomElement">Toggle Element</VBtn>
    <br/>
    <custom-transition>
      <p v-if="showCustomElement" class="my-element">This is a transitioning element</p>
    </custom-transition>
    <br/>
    <VBtn @click="showAnotherCustomElement = !showAnotherCustomElement">Toggle Another Element</VBtn>
    <br/>
    <custom-transition>
      <div v-if="showAnotherCustomElement" class="another-element">Another transitioning element</div>
    </custom-transition>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import CustomTransition from '@/components/CustomTransition.vue';

let isVisible = ref(true);
let showElement = ref(true);
 let showCustomElement=ref(false)
  let showAnotherCustomElement= ref( false)

const slideInElement = () => {
  showElement.value = !showElement.value; // Vue will handle animation
};
</script>

<style scoped>
/* Active state for enter. Applied during the entire entering phase */
.fade-enter-active, .fade-leave-active {
  transition: opacity 5s ease-in-out;
  color: aqua;
}
/* v-leave-to: Ending state for leave. Added one frame after a leaving transition is () .fade-enter */
 .fade-leave-to {

  opacity: 0;
}
/* ending state of enter */
.fade-enter-to{  
  transition: opacity 2s ease-in-out;

color: rgb(19, 0, 128);
}

.slide-in-enter-active {
  /* duration of slide of content */
  transition: transform 2s ease-in-out;   
  color: blanchedalmond;
}

.slide-in-enter-from {
  transform: translateX(100px); 
}

</style>
