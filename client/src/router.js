import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import User from './views/User.vue'
import store from './store'
Vue.use(Router)

let { state } = store

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/user',
      name: 'user',
      component: User,
      children: [
        { name: 'login', path: 'login', component: () => import('@/components/LoginArea.vue') },
        { name: 'register', path: 'register', component: () => import('@/components/Register.vue') },
        { name: 'edit', path: 'edit', component: () => import('@/components/UserEditArea.vue') },
        { name: 'history', path: 'history', component: () => import('@/views/UserHistory.vue') },
        { name: 'allUsers', path: 'allUsers', component: () => import('@/views/allUsers.vue') }
      ]
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import('./views/Cart.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('./views/About.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (!state.loggedIn && to.path === '/user') {
    next({ name: 'login' })
  } else {
    next()
  }
})

export default router
