import { createRouter, createWebHistory } from 'vue-router';
import AdminView from '../views/AdminView.vue';
import UserView from '../views/UserView.vue';
import HomePage from '../components/Home/HomePage.vue';
import AdminLogin from '../components/Auth/AdminLogin.vue';

const routes = [
  { path: '/', name: 'HomePage', component: HomePage },
  { path: '/user', name: 'UserView', component: UserView },
  { path: '/admin', name: 'AdminLogin', component: AdminLogin },
  { 
    path: '/admin-view', 
    name: 'AdminView', 
    component: AdminView,
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('adminToken')) {
        next(); 
      } else {
        next('/admin'); 
      }
    }
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;

