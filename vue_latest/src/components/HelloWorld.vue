<script setup>
import { ref } from 'vue';
import ComponentSample from './sample/ComponentSample.vue';

const count = ref(0) //Takes an inner value and returns a reactive and mutable ref object
console.log(count.value)


const name = ref('Vue.js')

function greet(event) {
  alert(`Hello ${name.value}!`)
  // `event` is the native DOM event
  if (event) {
    alert(event.target.tagName)
  }
}

function warn(msg, e){
  if(e){

e.preventDefault()
  }
 alert(msg)
}
defineProps({
  msg: {
    type: String,
    required: true
  }
})

</script>



<template>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
    <p> using html bind directive v-html<span v-html="msg"></span></p>
    <h3>
      You’ve successfully created a project with
     
    </h3>

 <!-- Two way Data Binding -->
    <button @click="count++">Add 1</button>
      <p>Count is: {{ count }}</p>




<button @click="greet">Greet</button>
  </div>


  <button @click="warn('Form cannot be submitted yet.', $event)">
  Submit
</button>
<button @click="warn('Hello', $event)"> Hello</button>

<!-- using inline arrow function -->
<button @click="(event) => warn('Form cannot be submitted yet.', event)">
  Submit
</button>
<a @click.once="greet"> hello modifiers</a>

<input @keyup.alt.enter="greet" />


<!-- component usage -->

<component :is="ComponentSample" />  

</template>















<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>


//expoxt