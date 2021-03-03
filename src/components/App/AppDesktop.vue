<template>
  <div class="page-container" >
    <md-app md-waterfall md-mode="fixed-last" style="position: fixed; width: 100%; z-index: 10">
      <md-app-toolbar class="md-large md-dense md-primary">
        <div class="md-toolbar-row">
          <div class="md-toolbar-section-start">
            <span class="md-title">L'Arène de Duel</span>
          </div>
          <md-button @click="showSidepanel = true">
            <md-icon>shopping_cart</md-icon>
            Panier ({{nbMyProducts}})
          </md-button>
        </div>
        <div class="md-toolbar-row" style="justify-content:center; ">
          <md-menu md-size="medium" md-align-trigger>
            <md-button md-menu-trigger id="tab-home" md-label="Accueil" to="/home">Accueil</md-button>
          </md-menu>
          <md-menu md-size="medium" md-align-trigger>
            <md-button md-menu-trigger id="tab-products" md-label="Produits">Produits</md-button>
              <md-menu-content>
                <md-menu-item v-for="tcgames in tcgames" :key="tcgames.id" :value=" tcgames.name " to="/products">{{ tcgames.name }}</md-menu-item>
              </md-menu-content>
          </md-menu>
          <md-menu md-size="medium" md-align-trigger>
            <md-button md-menu-trigger id="tab-events" md-label="Événements" to="/events">Événements</md-button>
          </md-menu>
          <md-menu md-size="medium" md-align-trigger>
            <md-button md-menu-trigger id="tab-account" md-label="Account" to="/account">Account</md-button>
          </md-menu>
          <md-menu md-size="medium" md-align-trigger>
            <md-button md-menu-trigger id="tab-logout" md-label="Logout" @click="logout" v-if="isLoggedIn" >Logout</md-button>
          </md-menu>
        </div>
      </md-app-toolbar>
    </md-app>
    <md-drawer class="md-right" :md-active.sync="showSidepanel" style="position: fixed; z-index: 10">
      <md-toolbar class="md-transparent" md-elevation="0">
        <span class="md-title">Panier</span>
      </md-toolbar>
      <h3>Prix total {{ myTotalPrice }} CHF</h3>
      <md-list class="md-triple-line">
        <md-list-item>
          <div>
          <md-button class="md-list-action md-raised md-accent" @click="empty()">
            Vider
          </md-button>
          <md-button class="md-list-action md-dense md-raised md-primary" @click="buy()">
            Afficher le panier
          </md-button>
          </div>
        </md-list-item>
        <div v-for="product in myProducts" :key="product.id">
          <md-list-item>
            <md-avatar >
              <img src="../../assets/logo-arene.png">
            </md-avatar>
            <div class="md-list-item-text">
              <span>{{ product.name }}</span>
              <span>Prix unitaire : CHF {{ product.price }}</span>
              <span>Dans panier : {{ product.cpt }}</span>
            </div>
          </md-list-item>
          <div>
            Quantité :
            <input type="number" v-model="product.cpt" style="width: 15%;" min="1" @input="updateCart(product)"/>
            <md-button class="md-list-action md-raised md-accent" @click="removeProduct(product)">
              Supprimer
            </md-button>
          </div>
          <md-divider class="md-inset"></md-divider>
        </div>
      </md-list>
    </md-drawer>
  </div>
</template>

<style lang="scss" scoped>

// Demo purposes only
.md-drawer {
  width: 25%;
  max-width: calc(100vw - 125px);
}

.page-container {
  min-height: 100px;
  overflow: hidden;
  //position: relative;
  //border: 1px solid rgba(#000, .12);
}
</style>

<script>

import { mapGetters } from 'vuex'
import router from '@/router'
import api from '../../connection/api.js'
export default {
  name: 'LastRowFixed',
  data: () => ({
    menuVisible: false,
    showSidepanel: false,
    tcgames: []
  }),
  computed: {
    ...mapGetters(['myProducts', 'nbMyProducts', 'myTotalPrice']),
    isLoggedIn: function () { return this.$store.getters.isLoggedIn }
  },
  beforeMount () {
    api.getTcgames()
      .done((data) => {
        this.tcgames = data
      })
      .fail(() => {
      })
      .always(() => {
      })
  },
  methods: {
    logout: function () {
      this.$store.dispatch('logout')
        .then(() => {
          this.$router.push('/login')
        })
    },
    updateCart (product) {
      this.$store.commit('UPDATE_CART', product)
    },
    removeProduct: function (product) {
      this.$store.commit('DELETE_PRODUCT', product)
    },
    empty: function () {
      this.$store.commit('EMPTY_CART')
    },
    buy: function () {
      router.push({ name: 'Cart' })
      this.showSidepanel = false
    }
  }
}

</script>
