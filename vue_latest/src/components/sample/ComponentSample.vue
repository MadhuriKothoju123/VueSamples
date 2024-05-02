<script setup>
import { ref } from 'vue'

// component is used in Component Parent component

const UseComponent = ref("madhuri")
 function compoUsage(){
  alert("used component in Helloworld parent component");
}
</script>

<template>
  <button @click="compoUsage" > {{ UseComponent }} UseComponent</button>
</template>