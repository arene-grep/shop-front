import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products_cart: null
  },
  getters: {
    myProducts: state => {
      return state.products_cart
    }
  },
  mutations: {
    UPDATE_CART (state, products) {
      state.products_cart = products
    },
    EMPTY_CART (state) {
      state.products_cart = null
    }
  },
  actions: {
  },
  modules: {
  }
})
