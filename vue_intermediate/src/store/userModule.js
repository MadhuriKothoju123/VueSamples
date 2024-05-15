// modules/user.js
const state = {
    currentUser: null,
    isLoggedIn: false,
    lastUserId:0
  };
  
  
  const mutations = {
    setCurrentUser(state, user) {
      state.currentUser=user;
      state.isLoggedIn=!!user;
  
    }, 
    incrementUserId(state) {
      state.lastUserId++;
    }
  };
  
  
  const actions = {
 
    loginUser({ commit }, user) {
      console.log(user);
      // Logic to authenticate user and commit mutation
      commit('setCurrentUser', user);
    },
    logoutUser({ commit }) {
      // Logic to logout user and commit mutation
      commit('setCurrentUser', null);
    },
    setUserTodos({commit}, todos){
      commit('setCurrentUserTodos', todos);
    }
  };
  
  const getters = {
    getCurrentUser: state => state.currentUser,
    isLoggedIn: state => state.isLoggedIn,
    getUserId:state=> state.lastUserId
  };

  
  export default {
    state,
    mutations,
    actions,
    getters
  };
  