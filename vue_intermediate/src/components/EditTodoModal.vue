<template>
 <Teleport to="#modal-container">

  <SlotsComponent :openModal="openModal"
    :maxWidth="'500px'"
    :cardHeight="'600px'"
  >
    
   
      <template #title>
      Edit Todo
    </template>
    <template #content>
      <v-text-field density="compact" v-model="todoItem" label="Todo Item" variant="outlined"></v-text-field>
      <VueDatePicker v-model="date" :format="format"></VueDatePicker>
      <v-select
        style="margin-top: 20px;"
        density="compact"
        variant="outlined"
        v-model="status"
        placeholder="select"
        :items="statusOptions"
        label="Status"
      ></v-select>
      <v-textarea density="compact" variant="outlined" v-model="note" label="Note"></v-textarea>
    </template>
    <template #actions>
      <v-btn color="blue darken-1" text @click="closeModal">Cancel</v-btn>
      <v-btn color="blue darken-1" text @click="updateTodo">Update</v-btn>
    </template>
</SlotsComponent>
</Teleport>
</template>


<script setup>
import '@vuepic/vue-datepicker/dist/main.css'
import VueDatePicker from '@vuepic/vue-datepicker';

import store from '@/store';
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';  
import SlotsComponent from './SlotsComponent.vue';

const route = useRoute()
const router= useRouter()
const id=computed(()=> route.params.id)


const openModal=ref(true);
const todoItem = ref('');
      const date = ref(new Date());;
      const status = ref('');
      const note = ref('');
      const editId = ref(0);
      const formattedDate = ref(new Date());

const format = (date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  formattedDate.value = `${day}-${month}-${year}`;
  return `${day}-${month}-${year}`;
}


onMounted(()=>{
    const todo =  store.getters.getTodoDataById(id.value)
    console.log(todo)
    editId.value= todo[0].id
    todoItem.value=todo[0].todoItem;
    date.value=todo[0].date;
    status.value=todo[0].status;
     note.value=todo[0].note;
     editId.value= todo[0].id;
    openModal.value=true;
})

const updateTodo= async()=>{
  const updatedTodoData = {
          id: editId.value,
          todoItem: todoItem.value,
          date: formattedDate.value,
          status: status.value,
          note: note.value,
          user: store.getters.getCurrentUser
        };
       const isSuccess= await store.dispatch('updateTodo', updatedTodoData);
       if(isSuccess){
        alert('Todo Updated Successfully');
        router.go(-1)
       }
}
const statusOptions= ref( ['Pending', 'In progress', 'Completed']);

const closeModal=()=>{
  openModal.value= false;
  router.go(-1);
  
}
</script>