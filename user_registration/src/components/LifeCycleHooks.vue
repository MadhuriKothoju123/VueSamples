<template>
    <div class="hook">
    <div  ref="greeting">Hello readers !</div>
    <img ref="img" src="https://picsum.photos/200" 
    alt="image" width="200" />
    <span style="margin-top: 10px;">comment/uncomment me to see beforeUpdate/updated hook's reactivity</span>
    {{ test }}
</div>
  </template>
  
  <script>
  import { ref } from 'vue';
  export default {
    setup() {
      console.log("I'm setup hook");  // 
    },
    data() {
      console.log("I'm data hook");
      return {
        stateOfBob: "sleeping",
        img: "",
      };
    },
    computed: {
      test: function () {
        return `I'm computed hook ${ this.stateOfBob }}`;
      },
    },
    beforeCreate() {
      console.log("I'm beforeCreate hook");
      console.log("Bob is currently ", this.stateOfBob);
      console.log("computed hook is returning ", this.test);
      return {
      exampleData: ref('Hello, Vue!') //reactive data, refs, or other configurations
    };
    },
    created() {
      console.log("I'm created hook");
      console.log("Bob is currently ", this.stateOfBob);
      this.stateOfBob = "awakened but still sleeping";
      console.log("Bob is currently ", this.stateOfBob);
      console.log("computed hook is returning ", this.test);
      console.log("ref created in beforeCreate", this.exampleData); 
      console.log("The Dom node is ", this.$refs["greeting"]);
      
      // we can make api call
    },
    beforeMount() {
      console.log("I'm beforeMount hook");
      console.log("The Dom node is ", this.$refs["greeting"]);
    },
    mounted() {
      console.log("I'm mounted hook");
      console.log("The Dom node is ", this.$refs["greeting"]);
    },
    beforeUpdate() {
      console.log(
        "I'm beforeUpdate hook and i can help to apply extra effects before a DOM is updated"
      );
      console.log("width of img div ", this.$refs.img.width);
      this.$refs.img.width = 300;
      console.log("width of img div after overriding ", this.$refs.img.width);
    },
    updated() {
      console.log("I'm updated hook");
      this.img = "https://picsum.photos/200/300"; //updates the image src
    },
    beforeUnmount() {
      console.log("I'm beforeUnmount hook");
      this.$refs.img.width = 0;
    },
    unmounted() {
      console.log("I'm unmounted hook");
  
    },
  };
  </script>
  <style scope>
  .hook{
    display: flex;
    flex-direction: column;

  }
</style>