import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/store';
import '../src/assets/main.css';
import Vuelidate from 'vuelidate';
Vue.use(Vuelidate);
import { Component } from 'vue-property-decorator';

Component.registerHooks(['validations']);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
