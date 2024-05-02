<script setup>
import { ref } from 'vue';
import HelloWorld from './components/HelloWorld.vue';
import ComponentSample from './components/sample/ComponentSample.vue';
import ConditionalRender from './components/sample/ConditionalRender.vue';
const invite= ref('Hello madhuri');
</script>

<template>
 <div>{{ invite }}</div>
 
 <HelloWorld msg="Start with Vue js"/>
 
<ComponentSample />
<ConditionalRender />

 
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
