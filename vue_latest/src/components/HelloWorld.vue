



<script setup>
import { ref } from 'vue';
import ComponentSample from './sample/ComponentSample.vue';
import BaseCompoForFallthroughDirectives from './sample/FallthroughDirectives.vue';
import ClassStyleBinding from './sample/ClassStyleBinding.vue';
import FormHandling from './sample/FormHandling.vue';

const count = ref(0) //Takes an inner value and returns a reactive and mutable ref object
console.log(count.value)


const name = ref('Vue.js')

function greet(event) {
  alert(`Hello ${name.value}!`)
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
















    <br/>
 <!-- Two way Data Binding  and inline Event Hnadling-->
    <button @click="count++">Add 1</button>
      <p>Count is: {{ count }}</p>




  <button @click="greet">Greet</button>
  </div>
  <br/>
  <!-- Method EventHandling -->
  <button @click="warn('Form cannot be submitted yet.', $event)">
  Submit
</button>
<br/>
<button @click="warn('Hello', $event)"> Hello</button>

<!-- using inline arrow function -->
<br/>
<button @click="(event) => warn('Form cannot be submitted yet.', event)">
  Submit
</button>
<br/>
<!-- Event Modifier -->
<a @click.once="greet"> hello modifiers</a>

<input @keyup.alt.enter="greet" />



<!-- component usage -->
<br/>

<component :is="ComponentSample" />  
<br/>

<!-- the attributes in child will be overriden in parrent component -->
<BaseCompoForFallthroughDirectives class="large" style="color: red;" />
<br/>
<ClassStyleBinding />
<br/>
<FormHandling />

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