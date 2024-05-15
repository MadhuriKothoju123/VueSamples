import axios from "axios";

// modules/user.js
const state = {
  todos:[],
  todoId:0
  };
  
  const mutations = {
    // setTodos(state, todo) {
    //     state.todoList.add(todo);
    //    console.log(state);
       
    // },

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
      state.todos = state.todos.filter(post => post.id !== todoId)
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
 
    //  async addTodo({ commit }, todoData) {
    //   let todoId=1;
    //   await axios.post('http://localhost:3000/todos', {
    //         id:todoId,
    //         todoItem: todoData.todoItem,
    //         date: todoData.date,
    //         status: todoData.status,
    //         note: todoData.note,
    //         userEmail: todoData.user
    //       });
    //       todoId++;
    //   console.log(todoData);

    


    //   // Logic to authenticate user and commit mutation
    //   commit('setTodos', todoData);
    // },



    async fetchTodos({ commit }) {
      try {
        const response = await axios.get('http://localhost:3000/todos');
        if(response.status===201){
        commit('setTodos', response.data)
        return true
        }
      } catch (error) {
        console.error('Error fetching posts:', error)
      }
      return false;
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
        console.error('Error creating post:', error)
      }
      return false;
    },
    async deletePost({ commit }, user) {
      try {
        await axios.delete(`http://localhost:3000/todos/${user}`)
        commit('deleteTodo', user)
      } catch (error) {
        console.error('Error deleting post:', error)
      }
    },
    async updatePost({ commit }, updatedTodo) {
      try {
        const response = await axios.put(`http://localhost:3000/todos/${updatedTodo.user}`, updatedTodo)
        commit('updateTodo', response.data)
      } catch (error) {
        console.error('Error updating post:', error)
      }
    }
  }

    

  
  const getters = {
    //getTodos: state => state.todoList;

    getTodoById: state => id => {
      return state.todos.find(todo => todo.id === id)
    },
    // Getter to get posts by a specific author
    getUserTodos: state => user => {
      return state.todos.filter(todo => todo.user === user)
    },
   getTodoId:state=> state.todoId
  };
  
  export default {
    state,
    mutations,
    actions,
    getters
  };
  