import axios from "axios";

// modules/user.js
const state = {
  todos:[],
  todoId:0
  };
  
  const mutations = {

    setTodos(state, todos) {
      state.todos = todos
    },
    incrementTodoId(state){
      state.todoId++;
    },
    addTodo(state, todo) {
      state.todos.push(todo)
    },
    deleteTodo(state, todoId) {
      state.todos = state.todos.filter(todo => todo.id !== todoId)
    },
    updateTodo(state, updatedTodo) {
      state.todos = state.todos.map(todo => {
        if (todo.id === updatedTodo.id) {
          return updatedTodo
        }
        return todo
      })
    }
  
  };
  
  const actions = {
 
    async fetchTodos({ commit }) {
      try {
        const response = await axios.get('http://localhost:3000/todos');
        if(response.status===200){
        commit('setTodos', response.data)
       
        }
      } catch (error) {
        console.error('Error fetching todos:', error)
      }
      
    },
    async createTodo({ commit }, todo) {
      try {
        const response = await axios.post('http://localhost:3000/todos', todo)
        console.log(response);
        if(response.status===201){
        commit('addTodo', response.data)
        return true
        }
      } catch (error) {
        console.error('Error creating todo:', error)
      }
      return false;
    },
    async deleteTodo({ commit }, todo) {
      try {
       const response= await axios.delete(`http://localhost:3000/todos/${todo.id}`)
if(response.status===200) {
  commit('deleteTodo', todo.id);
  return true

}
      } catch (error) {
        console.error('Error deleting todo:', error);
        
      }
      return false;
    },
    async updateTodo({ commit }, updatedTodo) {
      console.log(updatedTodo);
      try {
        const response = await axios.put(`http://localhost:3000/todos/${updatedTodo.id}`, updatedTodo);
        
        if(response.status===200) {
        commit('updateTodo', response.data)
    return true;
        }
      } catch (error) {
        console.error('Error updating todo:', error);
       
      }
      return false;
    }
  }

    

  
  const getters = {


    getTodoById: state => id => {
      return state.todos.find(todo => todo.id === id)
    },

    getUserTodos: state => user => {
      return state.todos.filter(todo => todo.user === user)
    },
      getTodoId:state=> state.todoId,

  

getTodoDataById: state=>todoId=> state.todos.filter(todo=> 
  {
   if( todo.id==todoId)
    {
      return todo;
    }
   
  }
)

  };
  
  export default {
    state,
    mutations,
    actions,
    getters
  };
  