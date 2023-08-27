import { createRouter, createWebHistory } from 'vue-router'
// import { useAuthStore } from '@/stores'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegistrationView from '../views/RegistrationView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Login',
      component: LoginView
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
      path: "/registration",
      name: "Registration",
      component: RegistrationView
    }
    // {
    //   path: "/login",
    //   name: "Login",
    //   component: LoginView
    // }
  ]
})

// router.beforeEach(async (to) => {
//   const publicPages = ['/login'];
//   const authRequired = !publicPages.includes(to.path);
//   const auth = useAuthStore
// })

export default router
