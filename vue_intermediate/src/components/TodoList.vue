<script setup>
import store from '@/store';
import { ref } from 'vue';
import { computed } from 'vue';
import { VContainer } from 'vuetify/lib/components/index.mjs';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

const user= computed(()=>store.getters.getCurrentUser)
const todos= computed(()=> store.getters.getUserTodos(user.value));
const openModal=ref(false);
const todoItem = ref('');
      const date = ref(null);
      const status = ref('');
      const note = ref('');
console.log(todos);
const OpenModalContent=(todo)=>{
  console.log(todo);
  todoItem.value=todo.todoItem;
  date.value=todo.date;
  status.value=todo.status;
  note.value=todo.note;
  openModal.value=true;
}
 
</script>

<template>
  <VContainer  style="display: flex; margin-top: 60px; justify-content: center;">
  <v-card elevation="10"  width="1000px">
    <v-table  hover=true height="500px"
      fixed-header
    >
      <thead>
        <tr >
          <th  class="text-left">
            S.No
          </th>
          <th class="text-left">
            Todo Item
          </th>
          <th class="text-left">
             Date
          </th>
          <th class="text-left">
             Status
          </th>
          <th class="text-left">
            Note
          </th>
          <th class="text-left">
            Edit
          </th>
          <th class="text-left">
          Delete
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(todo, index) in todos"
          :key="index"
        >
          <td>{{ todo.id }}</td>
          <td>{{ todo.todoItem }}</td>
          <td>{{ todo.date }}</td>
          <td>{{ todo.status }}</td>
          <td>{{ todo.note }}</td>
          <td><VBtn @click="OpenModalContent(todo)" color="blue" >Edit</VBtn></td>
          <td><VBtn color="red" >Delete</VBtn></td>

        </tr>
      </tbody>
    </v-table>
 
  </v-card>

  <v-dialog v-model="openModal" max-width="500px">
    <!-- <template v-slot:activator="{ on }">
      <v-btn color="primary" dark v-on="on">Open Modal</v-btn>
    </template> -->
    <v-card>
      <v-card-title>
        Todo Details
      </v-card-title>
      <v-card-text>
        <v-text-field v-model="todoItem" label="Todo Item"></v-text-field>
        <VueDatePicker v-model="date"></VueDatePicker>
        <v-select v-model="status" :items="statusOptions" label="Status"></v-select>
        <v-textarea v-model="note" label="Note"></v-textarea>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="cancel">Cancel</v-btn>
        <v-btn color="blue darken-1" text @click="save">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  
</VContainer>
  </template>
