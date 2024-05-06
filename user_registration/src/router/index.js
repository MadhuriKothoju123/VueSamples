import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue';
import SlotsView from '../views/SlotsView.vue';
import ProviderView from '../views/ProviderView.vue';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path:'/slots',
      name: 'slots',
      component: SlotsView
    },
    {
      path:'/provider',
      name: 'provider',
      component: ProviderView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/registration',
      name: 'registration',
  
      component: () => import('../views/RegistrationVue.vue')
    },
    {
      path: '/lifecycleHooks',
      name: 'lifecycleHooks',
      component: () => import('../views/LifeCycleHookView.vue')
    }
  ]
})

export default router
