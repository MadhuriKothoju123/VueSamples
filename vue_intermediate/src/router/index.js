import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegistrationView from '../views/RegistrationView.vue'
import LoginView from '../views/LoginView.vue';
import TodoFormView from '../views/TodoFormView.vue';
import TodoListView from '../views/TodoListView.vue'


// import store from '@/store'
// import TodoDetailsView from '../views/TodoDetailsView.vue';
import TodoDetailsView from '@/views/TodoDetailsView.vue';
import EditTodoView from '@/views/EditTodoView.vue';
import FinishSignInView from '@/views/FinishSignInView.vue';
import { useAuthStore } from '@/piniastore/auth';
// import { defineAsyncComponent } from 'vue';
// const TodoListView = defineAsyncComponent(() =>
//   import('../views/TodoListView.vue')
// )


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },

    {
      path: '/registration',
      name: 'Registration',
      component: RegistrationView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/todoForm',
      name: 'todoform',
      component: TodoFormView,
      meta: { requiresAuth: true}
    },
    {
      path: '/todo/:id',
      name: 'todoDetails',
      component: () => import('../views/TodoDetailsView.vue'),
      props: true
    },
    {
      path: '/builtInComponents',
      name: 'todoDetails',
      component: () => import('../views/TodoDetailsView.vue'),
      props: true
    },
    {
      path: '/emialLinlLogin',
      name: 'emailLinkLogin',
      component: () => import('../views/EmailLinkAuth.vue'),
      props: true
    }, 
     { path: '/finishSignIn', component: FinishSignInView ,
 
     },
    {
      path: '/todoList/',
      name: 'todolist',
      component: TodoListView,
      meta: { requiresAuth: true},

      children:[
        {
          path: 'todoDetails/:id',
          name: 'todoDetails',
          component:TodoDetailsView,
          props: true
        },
        {
          path: 'editTodo/:id',
          name: 'editTodo',
          component:EditTodoView,
          props: true
        },

        // {
        //   path: 'deleteTodo/:id',
        //   name: 'deleteTodo',
        //   component:DeleteTodoView,
        //   props: true
        // }
      ]
      // component: () => import('../views/TodoListView.vue'),
      // meta: { requiresAuth: true}
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },

    {
      path: '/optionapi',
      name: 'optionapi',
      component: () => import('../views/OptionsApi.vue')
    },
    // {
    //   path: '/user/:id',
    //   component: UserDetails,
    //   props: true // Pass route params as props to the component
    // }
  ]

})
// !store.getters.isLoggedIn

router.beforeEach((to, from, next) => {
  const AuthStore= useAuthStore();
  if (to.meta.requiresAuth && !AuthStore?.user?.emailVerified) {
    // If route requires authentication and user is not logged in, redirect to login page
    next('/login');
  } else {
    // Proceed to the next route
    next();
  }
});

export default router
