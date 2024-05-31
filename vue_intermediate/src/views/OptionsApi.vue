<template>
    <div ref="rootDiv">
      <h1>hello</h1>
      <p>{{ sharedProperty }}</p>
      <button @click="sharedMethod">Click me</button>

      <!-- fallthrough attributes -->
      <FallthroughAttributes style="background-color: red;" id="pink" />  
      <div>{{ color }}</div>


      <div 
    v-bind:style="{backgroundColor:$data.color}"
    v-on:click="changeColor"
  >
    <p>Click me</p>


  </div>

  <pre>{{ text }}</pre>
  
    </div>
  </template>
  
  <script>

  import FallthroughAttributes from '@/components/FallthroughAttributes.vue';
import { mixinA } from '@/mixins/mixinA';
  import { mixinB } from '@/mixins/mixinB';

  export default {
    mixins: [ mixinB, mixinA],
    components: {
      FallthroughAttributes
    },
    data(){
      return{
        color: 'lightgreen',
        text: 'Initial text in the parent component.',
        sharedProperty: "local Data "
      }
    },
    methods: {
    changeColor() {
      this.$data.color = 'pink';
      // this.$el.style.backgroundColor = 'red';
      this.$refs.rootDiv.style.backgroundColor = 'lightgreen';
    }
  }
  };
  </script>
  