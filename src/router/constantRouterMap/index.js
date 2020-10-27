const Error = () => import(/* webpackChunkName: "error" */ '@src/views/error/404.vue');
const Login = () => import(/* webpackChunkName: "error" */ '@src/views/login/Index.vue');
const SignUp = () => import(/* webpackChunkName: "error" */ '@src/views/login/SignUp.vue');

export default [
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      name: 'login',
      title: '登录',
    },
  },
  {
    path: '/signUp',
    name: 'signUp',
    component: SignUp,
    meta: {
      name: 'signUp',
      title: '注册',
    },
  },
  {
    path: '*',
    name: 'error',
    component: Error,
    meta: {
      name: 'error',
      title: '404',
    },
  },
];
