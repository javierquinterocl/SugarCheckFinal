
import { createWebHistory, createRouter } from 'vue-router'
import login from '../views/login.vue';
import dashboard from '@/components/dashboard.vue';


const routes = [
  
  {  path: '/dashboard', component: dashboard },
  {path: '/', component:login}
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;