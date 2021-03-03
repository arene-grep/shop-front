import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

// const APIENDPOINT = 'http://localhost:8000/api/'
const APIENDPOINT = 'https://api-arene.menopi.ch/api/'
// const APIENDPOINT = 'http://o34z4ajegy.preview.infomaniak.website/'

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    nbProducts: 0,
    products_cart: [],
    myTotalPrice: 0,
    status: '',
    token: localStorage.getItem('token'),
    user: {},
    linkLogin: ''
  },
  getters: {
    myProducts: state => {
      return state.products_cart
    },
    nbMyProducts: state => {
      return state.nbProducts
    },
    myTotalPrice: state => {
      return state.myTotalPrice
    },
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status
  },
  mutations: {
    UPDATE_CART (state) {
      state.nbProducts = 0
      state.myTotalPrice = 0
      for (let i = 0; i < state.products_cart.length; i++) {
        state.nbProducts = state.nbProducts + parseInt(state.products_cart[i].cpt)
        state.myTotalPrice = state.myTotalPrice + parseInt(state.products_cart[i].price) * parseInt(state.products_cart[i].cpt)
      }
    },
    ADD_PRODUCT (state, product) {
      var myIndex = -1
      for (let i = 0; i < state.products_cart.length; i++) {
        if (state.products_cart[i].id === product.id) {
          myIndex = i
        }
      }
      if (myIndex === -1) {
        product.cpt = 0
        if (product.nb > 1) {
          product.cpt = parseInt(product.nb)
          state.nbProducts = parseInt(state.nbProducts) + parseInt(product.nb)
        } else {
          product.cpt = 1
          state.nbProducts++
        }
        state.products_cart.push(product)
      } else {
        const myProduct = state.products_cart[myIndex]
        if (product.nb > 1) {
          myProduct.cpt = parseInt(myProduct.cpt) + parseInt(product.nb)
          state.nbProducts = parseInt(state.nbProducts) + parseInt(product.nb)
        } else {
          myProduct.cpt++
          state.nbProducts++
        }
      }
      state.myTotalPrice = 0
      for (let i = 0; i < state.products_cart.length; i++) {
        state.myTotalPrice = state.myTotalPrice + parseInt(state.products_cart[i].price) * parseInt(state.products_cart[i].cpt)
      }
    },
    DELETE_PRODUCT (state, product) {
      const index = state.products_cart.indexOf(product)
      if (index > -1) {
        state.products_cart.splice(index, 1)
        state.nbProducts = state.nbProducts - product.cpt
        state.myTotalPrice = state.myTotalPrice - parseInt(product.price)
      }
    },
    EMPTY_CART (state) {
      state.products_cart = []
      state.nbProducts = 0
      state.myTotalPrice = 0
    },
    auth_request (state) {
      state.status = 'loading'
    },
    auth_success (state, token, user) {
      state.status = 'success'
      state.token = token
      state.user = user
    },
    auth_error (state) {
      state.status = 'error'
    },
    logout (state) {
      state.status = ''
      state.token = ''
    }
  },
  actions: {
    login ({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({ url: APIENDPOINT + 'login', data: user, method: 'POST' })
          .then(resp => {
            const token = resp.data.token
            const user = resp.data.user
            localStorage.setItem('token', token)
            axios.defaults.headers.common.Authorization = token
            commit('auth_success', token, user)
            resolve(resp)
          })
          .catch(err => {
            commit('auth_error')
            localStorage.removeItem('token')
            reject(err)
          })
      })
    },
    register ({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({ url: APIENDPOINT + 'register', data: user, method: 'POST' })
          .then(resp => {
            const token = resp.data.token
            const user = resp.data.user
            localStorage.setItem('token', token)
            axios.defaults.headers.common.Authorization = token
            commit('auth_success', token, user)
            resolve(resp)
            window.location.reload()
          })
          .catch(err => {
            commit('auth_error', err)
            localStorage.removeItem('token')
            reject(err)
          })
      })
    },
    logout ({ commit }) {
      return new Promise((resolve, reject) => {
        commit('logout')
        localStorage.removeItem('token')
        delete axios.defaults.headers.common.Authorization
        resolve()
      })
    }
  },
  modules: {
  }
})
