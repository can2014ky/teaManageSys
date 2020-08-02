import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import site from "./modules/site.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    site,
  },
  plugins: [createPersistedState()],
});
