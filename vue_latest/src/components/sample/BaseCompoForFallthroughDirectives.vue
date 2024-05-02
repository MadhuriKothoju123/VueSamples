<script>

// to stop fallthrough attributes to child component we have disable the 'inheriAttrs= flase'
export default {    
    inheritAttrs: false
};

</script>


<template>
 

<FallthroughDirectives  v-bind="$attrs"  />

</template>
<script setup>
 import FallthroughDirectives from './FallthroughDirectives'
</script>
