<template>
<span v-pre>{{ this will not be compiled }}</span>
<span v-once>This will never change: {{msg}}</span>
<!-- Used to hide un-compiled template until it is ready. -->
<div v-cloak>
  {{ meg}}
</div>
</template>

<script setup>
import { ref} from 'vue';
const msg= ref("madhuri");

</script>