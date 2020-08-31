import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { apiBase, cdnUrl, botId, callbackURL } from "../conf.json";
import axios from "axios";
import vueSelect from "vue-select";

Vue.config.productionTip = false

Vue.prototype.$apiBase = apiBase;
Vue.prototype.$axios = axios;
Vue.prototype.$cdnUrl = cdnUrl;
Vue.prototype.$botId = botId;
Vue.prototype.$callbackURL = callbackURL;
Vue.component("v-select", vueSelect);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
