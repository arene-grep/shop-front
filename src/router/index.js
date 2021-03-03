import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Cart from '@/views/Products/Cart'
import store from '../store/index.js'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/home' },

  {
    path: '/products',
    name: 'getProducts',
    component: () => import('../views/Products/Products.vue')
  },
  {
    path: '/products/:id',
    name: 'getProduct',
    component: () => import('../views/Products/ProductGet')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Login/Register.vue')
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/mycart',
    name: 'Cart',
    component: Cart,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/account',
    name: 'Account',
    component: () => import('../views/Login/Account.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/validationorder',
    name: 'ValidationOrder',
    component: () => import('../views/Products/OrderValidation'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/confirmationorder',
    name: 'ConfirmationOrder',
    component: () => import('../views/Products/OrderConfirmation'),
    meta: {
      requiresAuth: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next('/login')
  } else {
    if (store.getters.isLoggedIn && to.path === '/register') {
      next('/account')
      return
    }
    if (store.getters.isLoggedIn && to.path === '/login') {
      next('/account')
      return
    }
    next()
  }
})

export default router
