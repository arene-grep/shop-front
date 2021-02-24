<template>
  <div class="page-container" >
    <md-app md-waterfall md-mode="fixed-last" style="position: fixed; width: 100%; z-index: 10">
      <md-app-toolbar class="md-large md-dense md-primary">
        <div class="md-toolbar-row">
          <div class="md-toolbar-section-start">
            <span class="md-title">L'Arène de Duel</span>
          </div>
          <md-button class="md-icon-button" @click="showSidepanel = true">
            <md-icon>shopping_cart</md-icon>
          </md-button>
        </div>
        <div class="md-toolbar-row" style="justify-content:center; ">
          <md-tabs class="md-primary">
            <md-tab id="tab-home" md-label="Accueil" to="/home"></md-tab>
            <md-tab id="tab-products" md-label="Produits" to="/products"></md-tab>
            <md-tab id="tab-events" md-label="Évènements" to="/events"></md-tab>
            <md-tab id="tab-login" md-label="Login" to="/login"></md-tab>
            <md-tab id="tab-register" md-label="Register" to="/register"></md-tab>
          </md-tabs>
        </div>
      </md-app-toolbar>
      <md-app-content>
      </md-app-content>
    </md-app>
    <md-drawer class="md-right" :md-active.sync="showSidepanel" style="position: fixed; z-index: 10">
      <md-toolbar class="md-transparent" md-elevation="0">
        <span class="md-title">Panier</span>
      </md-toolbar>
      <md-list class="md-triple-line">
        <md-list-item>
          <md-button class="md-list-action md-raised md-accent" @click="empty()">
            Empty
          </md-button>
        </md-list-item>
        <md-list-item>
          <md-button class="md-list-action md-dense md-raised md-primary" @click="buy()">
            Buy
          </md-button>
        </md-list-item>
        <div v-for="product in myProducts" :key="product.id">
          <md-list-item>
            <md-avatar >
              <img src="../../assets/logo-arene.png">
            </md-avatar>
            <div class="md-list-item-text">
              <span>{{ product.name }}</span>
              <span>CHF {{ product.price }}</span>
              <p v-if="product.stock==1">{{ product.stock }} pièce en stock</p>
              <p v-else>{{ product.stock }} pièces en stock</p>
            </div>
          </md-list-item>
          <md-divider class="md-inset"></md-divider>
        </div>
      </md-list>
    </md-drawer>
    <br><br><br><br><br><br><br>
  </div>
</template>

<style lang="scss" scoped>

// Demo purposes only
.md-drawer {
  width: 230px;
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
export default {
  name: 'LastRowFixed',
  data: () => ({
    menuVisible: false,
    showSidepanel: false
  }),
  computed: {
    ...mapGetters(['myProducts'])
  },
  methods: {
    empty: function () {
      this.$store.commit('EMPTY_CART')
    },
    buy: function () {
      console.log('Buy : ')
      console.log(this.myProducts)
    }
  }
}

</script>
