import Vue from 'vue'
import VueRouter from 'vue-router'

import 'bootstrap'; 
import 'bootstrap/dist/css/bootstrap.min.css';

// components
import App from './App.vue'
import Schedule from "./components/Schedule.vue";
import Profiles from "./components/Profiles.vue";
import Settings from "./components/Settings.vue";
import Login from "./components/Login.vue";
import Home from './components/Home.vue';

import axios from 'axios'
import VueAxios from 'vue-axios';

Vue.use(VueRouter);
Vue.use(VueAxios, axios);
Vue.config.productionTip = false;

const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/login', component: Login, name: 'login'},
    { path: '/', component: Home, name: 'home',
      children: [
        { path: '/schedule', component: Schedule, name: 'schedule' },
        { path: '/profiles', component: Profiles },
        { path: '/settings', component: Settings }
      ]
    },
    // otherwise redirect to home
    { path: '*', redirect: '/' }
  ]
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')