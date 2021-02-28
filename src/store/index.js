import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    nbProducts: 0,
    products_cart: []
  },
  getters: {
    myProducts: state => {
      return state.products_cart
    },
    nbMyProducts: state => {
      return state.nbProducts
    }
  },
  mutations: {
    UPDATE_CART (state, product) {
      state.nbProducts = 0
      for (let i = 0; i < state.products_cart.length; i++) {
        state.nbProducts = state.nbProducts + parseInt(state.products_cart[i].cpt)
      }
    },
    ADD_PRODUCT (state, product) {
      state.nbProducts++
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
        state.nbProducts = state.nbProducts - product.cpt
      }
    },
    EMPTY_CART (state) {
      state.products_cart = []
      state.nbProducts = 0
    }
  },
  actions: {
  },
  modules: {
  }
})
