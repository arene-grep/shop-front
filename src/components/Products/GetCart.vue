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
          <md-table-cell>
            <md-avatar>
              <img src="../../assets/logo-arene.png">
            </md-avatar>
          </md-table-cell>
          <md-table-cell>{{ product.name }}</md-table-cell>
          <md-table-cell style="width: 250px">
            <input type="number" v-model="product.cpt" style="width: 50px;" min="1" @input="updateCart(product)"/>
          </md-table-cell>
          <md-table-cell>{{ product.price }} CHF</md-table-cell>
          <md-table-cell>{{ product.price * product.cpt }} CHF</md-table-cell>
          <md-table-cell>
            <md-button class="md-list-action md-raised md-accent" @click="removeProduct(product)">
              Supprimer
            </md-button>
          </md-table-cell>
        </md-table-row>
        <h4 style="float: right; margin-top: 10%; margin-right: 25%" v-if="myProducts.length>0">
          Prix total : {{ myTotalPrice }} CHF
        </h4>
        <div style="margin-top: 15%">
          <div>
            <md-button class="md-list-action md-raised md-accent" @click="empty()"
                       style="float: left; margin-left: 25%">
              Vider
            </md-button>
            <md-button class="md-list-action md-raised md-primary" @click="buy(myProducts)"
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
import router from '@/router'

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
    goProduct: function (product) {
      router.push({ name: 'getProduct', params: product.id })
    },
    removeProduct: function (product) {
      this.$store.commit('DELETE_PRODUCT', product)
    },
    empty: function () {
      this.$store.commit('EMPTY_CART')
    },
    updateCart (product) {
      this.$store.commit('UPDATE_CART', product)
    },
    buy: function (products) {
      const myBuys = []
      for (let i = 0; i < products.length; i++) {
        const myProduct = {}
        myProduct.product_id = products[i].id
        myProduct.quantity = products[i].cpt
        myBuys.push(myProduct)
      }
      console.log(JSON.stringify(myBuys))
      router.push({ name: 'ValidationOrder' })
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
