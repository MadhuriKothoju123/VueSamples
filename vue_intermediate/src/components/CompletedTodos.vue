<script setup>
import { onMounted, computed } from 'vue';
import store from '@/store';
const todos=computed(()=> store?.getters?.getPendingTodos);


onMounted(()=>{
 store.dispatch("setPendingTodos");
todos.value= store?.getters?.getPendingTodos;
console.log(todos.value)
})
</script>
<template>
       <v-table style="margin: 20px;" height="500px"
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
        </tr>
      </thead>
  
      <tbody>
        
        <TransitionGroup name="fade" >
        
        <tr 
          v-for="(todo, index) in todos"
          :key="index" v-memo="[todo.id]"
        >
          <td>{{ todo.id }}</td>
          <td>{{ todo.todoItem }}</td>
          <td>{{ todo.date }}</td>
          <td>{{ todo.status }}</td>
          <td>{{ todo.note }}</td>
        
        </tr>

      </TransitionGroup>
      </tbody>

    </v-table>
</template>
