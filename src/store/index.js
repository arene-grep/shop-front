import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products_cart: []
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
    ADD_PRODUCT (state, product) {
      const index = state.products_cart.indexOf(product)
      if (index < 0) {
        product.cpt = 1
        state.products_cart.push(product)
      } else {
        product.cpt++
      }
      // check si le produit y est déjà, si oui, afficher un compteur
    },
    DELETE_PRODUCT (state, product) {
      const index = state.products_cart.indexOf(product)
      if (index > -1) {
        state.products_cart.splice(index, 1)
      }
    },
    EMPTY_CART (state) {
      state.products_cart = []
    }
  },
  actions: {
  },
  modules: {
  }
})
