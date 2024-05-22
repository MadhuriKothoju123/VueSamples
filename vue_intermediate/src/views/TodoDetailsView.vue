<template>
 <Teleport to="#modal-container">
 <SlotsComponent :openModal= dialog 
 :width="'800px'" :height="'400px'"
  >
  <template #title>
    <v-toolbar>
          <v-toolbar-title >Todo Details</v-toolbar-title>

          <v-spacer></v-spacer>

          <v-toolbar-items>
            <v-btn
            icon="mdi-close"
            @click="navigateToTodoList"
          ></v-btn>
          </v-toolbar-items>
        </v-toolbar>
  </template>
<template #content>
    <!-- <p>Parent ID: {{ $route.params.id }}</p> -->
  <div v-if="todoData!==null">
    <h5 > {{ todoData.todoItem }}</h5>
  <h5>{{ todoData.date }}</h5>
  <VChip>{{ todoData.status }}</VChip>
  <p>{{ todoData.note }}</p>
</div>


  </template>


    <!-- <v-card-text class="bg-surface-light pt-4">
    </v-card-text> -->
<template #actions="{setModalClose}">
  <v-btn color="blue darken-1" text @click="setModalClose">Close</v-btn>
</template>


</SlotsComponent>
</Teleport>
</template>
<script setup>
// import router from '@/router';
import SlotsComponent from '@/components/SlotsComponent.vue';
import router from '@/router';
import { computed, onMounted } from 'vue';
import { ref } from 'vue'
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
console.log('parent')
const route = useRoute()


const id=computed(()=> route.params.id);
const store= useStore();
const todoData= ref(null);
onMounted(()=>{
  console.log('enter parrent')
  const todo =  store.getters.getTodoDataById(id.value);
  console.log(todo)
todoData.value= todo[0];
})
const dialog= ref(true);
console.log(dialog);

const navigateToTodoList=()=>{
  dialog.value= false;
  router.go(-1);

}
</script>