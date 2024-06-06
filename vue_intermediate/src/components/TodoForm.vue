<template>
<div class="container mt-5">
  <h1>Todo </h1>
  <div class="card" style="width:600px; padding: 20px;" >
  <form  ref="todoForm" @submit.prevent="submitForm">
    <div class="mb-3">
      <label for="todoItem" class="form-label">Todo Item</label>
      <input v-model="todoItem" class="form-control" id="todoItem" name="todoItem" required>
    </div>
    <div class="mb-3">
      <label for="date" class="form-label">Date</label>
      <input v-model="date" type="date" class="form-control" id="date" name="date" required>
    </div>
    <div class="mb-3">
      <label for="status" class="form-label">Status</label>
      <select v-model="status" class="form-select" id="status" name="status" required>
        <option value="" disabled selected>Select status</option>

        <option value="pending">Pending</option>
        <option value="in_progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>
    </div>
    
    <div class="mb-3">
      <label for="note" class="form-label">Note</label>
      <textarea v-model="note" class="form-control" id="note" name="note" rows="3"></textarea>
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>
  </form>
</div>
</div>
</template>
  
  <script setup>
  import router from '@/router';
import store from '@/store';
import { ref } from 'vue';
import { useAuthStore } from '@/piniastore/auth';


  
      const todoItem = ref('');
      const date = ref(null);
      const status = ref('');
      const note = ref('');
const todoForm=ref(null);
const auth= useAuthStore();

      const submitForm = async () => {
      store.commit('incrementTodoId');
console.log( store.getters.getTodoId);
        const formData = {
          id: String(store.getters.getTodoId),
          todoItem: todoItem.value,
          date: date.value,
          status: status.value,
          note: note.value,
           userId: auth?.user?.uid
        };
        console.log(formData);
        console.log(formData);
      const success=  await  store.dispatch('createTodo', formData );
      console.log(success,'sucess');
      
       if (success){
        alert('Todo Created Successfully');
      router.push('/todoList');
        
       }

      };



  
      // const resetForm = () => {
      //   todoForm.value.reset();
      // };
  
   

  </script>

  