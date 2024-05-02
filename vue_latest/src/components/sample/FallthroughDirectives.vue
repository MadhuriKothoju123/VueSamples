
<script setup>
</script>
<script>

// to stop fallthrough attributes to child component we have disable the 'inheriAttrs= flase'
export default {
    inheritAttrs: false
};

</script>


<template>
 <div>
    <button v-bind="$attrs" class="inherit" style="color: blue; font-size: 15px;">Fallthrough Button(parent to child) without explict prop sending</button>
</div>

</template>