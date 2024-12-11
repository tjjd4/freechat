import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../views/Dashboard.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/:pathMatch(.*)*', // 捕獲所有未匹配的路由
    name: 'NotFound',
    component: () => import('../views/NotFound.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAuth) {
    try {
      const response = await fetch('http://localhost:3000/is_login', {
        method: 'GET',
        credentials: 'include', // 確保帶上 Session cookie
      });

      if (response.ok) {
        next();
      } else {
        next({ path: '/' });
      }
    } catch (error) {
      console.error('Authentication failed:', error);
      next({ path: '/' });
    }
  } else {
    next(); // 對於非保護路由，直接放行
  }
});

export default router;
