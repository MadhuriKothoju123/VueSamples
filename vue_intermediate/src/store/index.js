import { createStore } from 'vuex';
import userModule from './userModule';
import VuexPersistence from 'vuex-persist';
import TodoModule from './TodoModule';
const vuexLocal = new VuexPersistence({
	storage: window.localStorage,
  });

// created a store and intialized data
export default createStore({  
	modules: {
		user: userModule,
		todoList: TodoModule 
	},
	plugins: [vuexLocal.plugin],
});