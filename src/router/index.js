import Vue from 'vue';
import VueRouter from 'vue-router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
// eslint-disable-next-line import/no-cycle
import asyncRouterMap from './asyncRouterMap';
import constantRouterMap from './constantRouterMap';

NProgress.configure({
  showSpinner: false,
});

const VueRouterPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(to) {
  return VueRouterPush.call(this, to).catch(err => err);
};

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [...constantRouterMap, ...asyncRouterMap],
});

router.beforeEach((to, from, next) => {
  NProgress.start();
  next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
