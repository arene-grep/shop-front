<template>
  <div>
    <md-table class="md-table">
      <div>
        <md-table-row>
          <md-table-head></md-table-head>
          <md-table-head>Produit</md-table-head>
          <md-table-head>Quantité</md-table-head>
          <md-table-head>Prix unitaire</md-table-head>
          <md-table-head>Prix total</md-table-head>
        </md-table-row>
        <md-table-row v-for="product in myProducts" :key="product.id">
          <md-avatar>
            <img src="../../assets/logo-arene.png">
          </md-avatar>
          <md-table-cell>{{ product.name }}</md-table-cell>
          <md-table-cell>{{ product.cpt }}</md-table-cell>
          <md-table-cell>{{ product.price }} CHF</md-table-cell>
          <md-table-cell>{{ product.price * product.cpt }} CHF</md-table-cell>
          <md-table-cell>
            <md-button class="md-list-action md-raised md-accent" @click="removeProduct(product)">
              Supprimer
            </md-button>
          </md-table-cell>
        </md-table-row>
        <span style="float: right; margin-top: 10%">
            Prix total : {{ myTotalPrice }} CHF
        </span>
        <div style="margin-top: 15%">
          <div>
            <md-button class="md-list-action md-raised md-accent" @click="empty()"
                       style="float: left; margin-left: 25%">
              Vider
            </md-button>
            <md-button class="md-list-action md-raised md-primary" @click="empty()"
                       style="float: right; margin-right: 25%">
              Commander
            </md-button>
          </div>
        </div>
      </div>
    </md-table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'GetCart',
  data: () => {
    return {
      totalPrice: 0
    }
  },
  computed: {
    ...mapGetters(['myProducts', 'nbMyProducts', 'myTotalPrice'])
  },
  methods: {
    removeProduct: function (product) {
      this.$store.commit('DELETE_PRODUCT', product)
    },
    empty: function () {
      this.$store.commit('EMPTY_CART')
    }
  }
}
</script>

<style scoped>
.md-table {
  max-width: 85%;
  display: inline-block;

}
</style>
