<script setup>
import store from '@/store';
import { computed, onMounted } from 'vue';
import { RouterLink, onBeforeRouteUpdate, useRouter } from 'vue-router';
import { VContainer } from 'vuetify/lib/components/index.mjs';
import { useAuthStore } from '@/piniastore/auth';



const router= useRouter();
const authStore= useAuthStore()



console.log(authStore.user);
const user= computed(()=>authStore?.user?.email)
const todos= computed(()=> store.getters.getUserTodos(user.value));
onBeforeRouteUpdate((to,from,next)=>{
  if(to.params.id) {
    if(to.name==="editTodo"){
      if (confirm('Do you really want to make changes to Todo?')) {
    next();
  } else {
    next(false);
  }
    }
  //   else if(to.name==='deleteTodo'){
  //     if (confirm('Do you really want to make changes to Todo?')) {
  //   next();
  // }
  //  else {
  //   next(false);
  // }
  //   }
  else{
    next();
  }

  }
  else{
  next();
  }
 

})


onMounted(()=>{
    store.dispatch('fetchTodos')
})


const OpenModalContent=(id)=>{
router.push({name: 'editTodo', params: {id: id }})
}



const deleteTodo=async(todo)=>{
   
const isDeleted= await store.dispatch('deleteTodo', todo);


if(isDeleted) alert('Todo Deleted Successfully');

}



 const navigateToTodoDetails=(id)=>{

  //  router.push({ path: `todoList/todo/${{ id }}` })
  router.push({name:'todoDetails',params:{id:id}})
 }
</script>

<template>

  <VContainer  style="display: flex; margin-top: 60px; justify-content: center;">

  <v-card elevation="10"  width="1000px" style="padding: 20px;"> 
    <div style="display: flex; justify-content: flex-end;">
      <RouterLink to="/todoform"><VBtn color="green">Add Todo </VBtn></RouterLink>
  </div>
    <v-table style="margin: 20px;"  hover=true height="500px"
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
          <th class="text-left">
        View
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
          <td><VBtn @click="OpenModalContent(todo.id)" color="orange" >Edit</VBtn></td>
          <td><VBtn color="red"  @click="deleteTodo(todo)">Delete</VBtn></td>
          <td><VBtn color="blue" @click="navigateToTodoDetails(todo.id)"  >View</VBtn></td>
          <td v-if="console.log('Rendering todo:', todo.id)"></td>
          <!-- <td><RouterLink to="{
                                        name: 'todoDetails',
                                        params: { id: post.id },
                                        query: { sort: 'asc' },
                                    }"><VBtn color="blue"   >View</VBtn></RouterLink></td> -->

        </tr>

      </TransitionGroup>
      </tbody>

    </v-table>
 
  </v-card>

</VContainer>

<RouterView/>
  </template>
  <style>

.fade-move,
.fade-enter-active,
.fade-leave-active {
  transition: all 1s cubic-bezier(0.55, 0, 0.1, 1);
}

/* 2. declare enter from and leave to state */
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scaleY(0.01) translate(30px, 0);
}

/* 3. ensure leaving items are taken out of layout flow so that moving
      animations can be calculated correctly. */
.fade-leave-active {
  position: absolute;
}
</style>
