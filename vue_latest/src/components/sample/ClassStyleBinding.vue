<template>
    <div>
        <!-- Dynamic Class Binding -->
        <h3 class="vueStyle">Class and style Binding</h3>
        <h3 v-bind:style="{color:colorName}">Style Binding</h3>
        <h3 v-bind:class="{display: true}"> class with Objects</h3>
        <h3 v-bind:class="[checkDisplay?d:v]"> class with List</h3>
    </div>
</template>
<script>
export default{
    name: "ClassStyleBinding",
    data(){
        return{
            colorName: 'skyblue',
            show: true,
            d: 'display',
             v: 'vueStyle',
             checkDisplay: false
        }
    }
}
</script>
<style scoped>
.vueStyle{
    color: orange;
}
.display{
    background-color: aqua;
    padding: 5px;
}
</style>