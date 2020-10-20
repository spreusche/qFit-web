import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user/index.js';
import allRoutines from './modules/allRoutines/index.js'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    allRoutines,
    user
  },
})