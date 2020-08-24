import Layout from '@src/layout/Index.vue';
import route from './route';

const defaultRoute = { name: 'goodsCategory' };

export default [
  {
    path: '/',
    component: Layout,
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: '',
        redirect: defaultRoute,
      },
      ...route,
    ],
  },
];
