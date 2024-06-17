import {  db } from '@/firebase'
import { useAuthStore } from '@/piniastore/auth'
import { Timestamp, and, collection, deleteDoc, doc, getDocs, limit, onSnapshot, orderBy, query, setDoc, updateDoc, where } from 'firebase/firestore'

// modules/user.js
const state = {
  todos: [],
  todoId: 0,
  pendingTodos: []

}

const mutations = {
  setTodos(state, todos) {
    state.todos = todos
  },
  incrementTodoId(state) {
    state.todoId++
  },
  addTodo(state, todo) {
    state.todos.push(todo)
  },
  deleteTodo(state, todoId) {
    state.todos = state.todos.filter((todo) => todo.id !== todoId)
  },
  setPendingTodos(state, todos) {
    state.pendingTodos = todos
  },
  updateTodo(state, updatedTodo) {
    state.todos = state.todos.map((todo) => {
      if (todo.id === updatedTodo.id) {
        return updatedTodo
      }
      return todo
    })
  }
}

const actions = {
  async fetchTodos({ commit }) {
    const auth = useAuthStore();
    try {
    
      const todosRef = collection(db, 'todos')

      const q = query(todosRef, where('userId', '==', auth.user.uid)) // Create a query to find todos with the user's UID
      // const querySnapshot = await getDocs(q);
    
      onSnapshot(q,(querySnapShot)=>{
     
        const todos = querySnapShot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  console.log(todos);
   
        commit('setTodos', todos)  
  
      });

    } catch (error) {
      console.error('Error fetching todos:', error)
    }
  },
  async createTodo({ commit }, todo) {

    const newUserDocRef = doc(db, 'todos',todo.id);
  const res=  await setDoc(newUserDocRef, { ...todo, id: todo.id,  created_at: Timestamp.now(), }) .then(() => {
      commit('addTodo', todo);
      localStorage.setItem('todoDocId', 1);  
      return true
    })
    .catch((error) => {
      console.log('Error creating todo:', error)
      return false
    });
    
     

    return res
  },
  async deleteTodo({ commit }, todo) {
    
      const todoDocRef = doc(db, 'todos', todo.id);
  const res=await deleteDoc(todoDocRef).then(()=>{
    commit('deleteTodo', todo.id);
    return true;
  }).catch((error)=>{
    console.error('Error deleting todo:', error)
  })
    return res;

  },

  async subscribeToTodos({ commit }) {
    const todosRef = collection(db, 'todos');
    const q = query(todosRef, where('userId', '==', useAuthStore().user.uid));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const todos = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      commit('setTodos', todos);
    });
    return unsubscribe;
  
  },
  async updateTodo({ commit }, updatedTodo) {
    console.log(updatedTodo)

    //     const response = await axios.put(`http://localhost:3000/todos/${updatedTodo.id}`, updatedTodo);

    //     if(response.status===200) {
    //     commit('updateTodo', response.data)
    // return true;
    //     }
    const todoDocRef = doc(db, 'todos', updatedTodo.id);
    console.log(todoDocRef)
    const updatedFields = {
      todoItem: updatedTodo.todoItem,
      date: updatedTodo.date,
      status: updatedTodo.status,
      note: updatedTodo.note,
      userId:updatedTodo.userId

    };
    todoDocRef
    const res = await updateDoc(todoDocRef, updatedFields)

      .then((data) => {
        console.log(data)
        commit('updateTodo', updatedTodo)
        return true;
      })
      .catch((error) => {
        console.log(error)
        return false
      })

    return res
  },

  async setPendingTodos({commit}){
    const auth = useAuthStore();
    try {
    
      const todosRef = collection(db, 'todos')

      const q = query(todosRef, and(where('userId', '==', auth.user.uid), where('status', '!=','Completed')),orderBy('status', 'asc'),limit(4))
       // Create a query to find todos with the user's UID
      const querySnapshot = await getDocs(q)

      const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      
      commit('setPendingTodos', data)
    } catch (error) {
      console.log('Error fetching todos:', error)
    }
           
  }
}

const getters = {
  getTodoById: (state) => (id) => {
    return state.todos.find((todo) => todo.id === id)
  },

  getUserTodos: (state) => state.todos,
  getTodoId: (state) => state.todoId,

  getTodoDataById: (state) => (todoId) =>
    state.todos.filter((todo) => {
      if (todo.id == todoId) {
        return todo
      }
    }),
getPendingTodos: (state)=> state.pendingTodos,


}

export default {
  state,
  mutations,
  actions,
  getters
}
