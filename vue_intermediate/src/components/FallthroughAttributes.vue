<template>
    <p> Hello</p>
      <strong v-bind="$attrs">Fall through attributes</strong>

      <button v-on:click="this.$parent.text='Hello!'">Change text in parent</button>
      {{ console.log(this.$parent) }}
</template>