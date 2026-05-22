import { type RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
    meta: {
      showInTabBar: true,
      icon: 'home-o',
      requiresAuth: true
    },
  },
  {
    path: '/reports',
    name: 'Reports',
    component: () => import('@/views/Reports/index.vue'),
    meta: {
      showInTabBar: true,
      icon: 'bar-chart-o',
      requiresAuth: true
    },
  },

  {
    path: '/profile',
    name: 'Profile',
    component: () => import('@/views/Profile/index.vue'),
    meta: {
      showInTabBar: true,
      icon: 'contact-o',
      requiresAuth: true
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Auth/Login.vue'),
    meta: {
      showInTabBar: false,
    },
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import('@/views/Auth/Signup.vue'),
    meta: {
      showInTabBar: false,
    },
  },

  // 404
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/PageNotFound.vue'),
    meta: {
      showInTabBar: false,
    },
  },
]

export default routes