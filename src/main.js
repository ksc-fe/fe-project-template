import Vue from 'vue/dist/vue.js';
import VueRouter from 'vue-router';
import routes from './router/router.js';
import store from './store/store';
import Kpc from 'kpc';
import _ from 'lodash';
import utils from '@/utils/utils';
import filters from '@/filters/filter';
import api from '@/api/index.js';

window.utils = utils;
window._ = _;

Vue.use(Kpc);
Vue.use(VueRouter);
Vue.config.productionTip = false
Vue.prototype.api = api;

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

const router = new VueRouter({
  routes
});

new Vue({
  router,
  store,
}).$mount('#app')