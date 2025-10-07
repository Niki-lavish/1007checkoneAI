import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default.vue'),
    children: [
      {
        path: '',
        component: () => import('@/pages/index.vue'),
      },
      {
        path: 'page1',
        component: () => import('@/pages/page1.vue'),
      },
      {
        path: 'page2',
        component: () => import('@/pages/page2.vue'),
      },
    ],
  },
  {
    path: '/seat-map',
    component: () => import('@/layouts/admin.vue'),
    children: [
      {
        path: '',
        name: 'SeatMap',
        component: () => import('@/pages/SeatMap.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
