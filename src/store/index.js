import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    nbProducts: 0,
    products_cart: [],
    myTotalPrice: 0
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
    }
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
        state.products_cart.push(product)
      } else {
        state.products_cart[myIndex].cpt = parseInt(product.cpt)
      }
      state.nbProducts = 0
      for (let i = 0; i < state.products_cart.length; i++) {
        state.nbProducts = state.nbProducts + parseInt(state.products_cart[i].cpt)
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
    }
  },
  actions: {
  },
  modules: {
  }
})
