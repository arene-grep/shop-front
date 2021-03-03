<template>
  <div>
    <div v-for="product in myProducts" :key="product.id">
      <md-card>
        <md-card-header>
          <md-card-media>
            <img src="../../assets/logo-arene.png" alt="Skyscraper">
          </md-card-media>
          <md-card-header-text>
            <div class="md-title">{{ product.name }}</div>
            <div class="md-subhead">Prix unitaire : {{ product.price }} CHF</div>
            <div class="md-subhead">Prix total : {{ product.price * product.cpt }} CHF</div>
          </md-card-header-text>
        </md-card-header>

        <md-card-actions>
          <input type="number" v-model="product.cpt" style="width: 50px;" min="1" @input="updateCart(product)"/>
          <md-button class="md-list-action md-raised md-accent" @click="removeProduct(product)">
            Supprimer
          </md-button>
        </md-card-actions>
      </md-card>
    </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import router from '@/router'

export default {
  name: 'GetCartMobile',
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
    }
  }
}
</script>

<style scoped>

</style>
