<template>
  <div>
    <select v-model="selected" @change="successfully" class="custom-select">
  <option v-for="(option, index) in options" :value="option.value" :key="index" class="custom-option">
    {{ option.text }}
  </option>

</select>
<div>Selected: {{ selected }}</div>

<input v-model="num1" placeholder="Please enter the number" />
<input v-model="num2" placeholder="Please enter the number" />
<div>Area: {{ area }}</div>

</div>


</template>
<script>

export default {
  data() {
    return {
      selected: 'A',
      num1: 0,
      num2: 0,
      options: [
        { text: 'One', value: 'A' },
        { text: 'Two', value: 'B' },
        { text: 'Three', value: 'C' }
      ]
    }
  },
  methods:{
    successfully(){
       alert(`selected ${ this.selected }`)
    }
  },
  computed:{
    area(){
      return  this.num1* this.num2;
    }
  }
}
</script>
<style scoped>
/* Apply styles to the select element */
.custom-select {
  width: 200px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
}

/* Apply styles to the select options */
.custom-option {
  background-color: #f4f4f4;
  color: #333;
  padding: 5px;
}

/* Style for the selected option */
.custom-select option:checked {
  background-color: #ccc;
  font-weight: bold;
}
</style>