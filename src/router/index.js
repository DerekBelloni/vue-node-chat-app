import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/useAuthStore'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import ProfileView from '../views/ProfileView.vue'
import RegistrationView from '../views/RegistrationView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: "/registration",
      name: "Registration",
      component: RegistrationView
    },
    {
      path: "/login",
      name: "Login",
      component: LoginView
    },
    {
      path: "/profile",
      name: "Profile",
      component: ProfileView
    }
  ]
})

router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/registration'];
  const authRequired = !publicPages.includes(to.path);
  const authStore = useAuthStore();
  
  if (authRequired && !authStore.sessionID) {
    next({ name: 'Login' });
  } else {
    next();
  }
})

export default router
