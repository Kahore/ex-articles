import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('./views/About.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('./views/Register.vue'),
    },
    {
      path: '/article/:articleId',
      name: 'article',
      component: () => import('./views/Article.vue'),
    },
    {
      path: '/editor/:articleId?',
      name: 'editor',
      component: () => import('./views/Editor.vue'),
    },
    {
      path: '/@:id',
      name: 'profies',
      component: () => import('./views/Profies.vue'),
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('./views/Settings.vue'),
    },
  ],
});
