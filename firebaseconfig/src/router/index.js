import { createRouter, createWebHistory } from 'vue-router'
import RegistrationView from '../views/RegistrationView.vue';
import LoginView from '../views/LoginView.vue';
import UserListView from '../views/UserListView.vue';
import PostView from '../views/PostView.vue';
import { useUserStore } from '../piniaStore/user';
import PostListView from '../views/PostListView.vue';

 



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/registration',
      name: 'Registration',
      component: RegistrationView
    },
    {
      path: '/',
      name: 'login',
      component: LoginView
    },
    {
      path: '/users',
      component: UserListView,
   meta:  { requiresAuth: true}
    },
    {
      path: '/createPost',
      component: PostView,
      meta: { requiresAuth: true}
   
    },
    {
      path: '/postsList',
      component: PostListView,
      meta: { requiresAuth: true}
   
    }
  ]

})


router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !useUserStore()?.user?.emailVerified) {

    // If route requires authentication and user is not logged in, redirect to login page
    next('/');
  } else {
    // Proceed to the next route
    next();
  }
});
export default router
