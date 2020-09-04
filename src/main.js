import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { apiBase } from "../conf.json";
import axios from "axios";
import vueSelect from "vue-select";

Vue.config.productionTip = false

Vue.prototype.$apiBase = apiBase;
Vue.prototype.$axios = axios;
Vue.component("v-select", vueSelect);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
