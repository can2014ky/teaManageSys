import Vue from 'vue';
import VCharts from 'v-charts';
import VueHighcharts from 'vue-highcharts';
import Highcharts from 'highcharts';
// eslint-disable-next-line import/extensions
import loadHighchartsMore from 'highcharts/highcharts-more.js';
import App from './App.vue';
import router from './router';
import store from './store';
import '@src/components/index';
import '@src/icons/index';
import './mock'; // simulation data
import '@src/plugins/element';
import '@src/themes/index';
import i18n from './i18n';

Vue.use(VueHighcharts, {
  Highcharts,
});
loadHighchartsMore(Highcharts);

Vue.use(VCharts);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app');
