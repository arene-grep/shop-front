<template>
  <div>
    <md-button class="md-fab md-primary md-fixed md-fab-bottom-right" @click="addCart(selectedProducts)">
      <md-icon>add_shopping_cart</md-icon>
    </md-button>
    <md-list class="md-triple-line">
    <md-card-header>
      <div class="md-title">Nos produits</div>
    </md-card-header>
    </md-list>
    <md-list class="md-triple-line">
      <div v-for="product in products" :key="product.id">
        <md-list-item :to="{name: 'getProduct', params:{id:product.id}}">
          <md-avatar>
            <img src="../../assets/logo-arene.png">
          </md-avatar>
          <div class="md-list-item-text">
            <span>{{ product.name }}</span>
            <span>CHF {{ product.price }}</span>
            <p v-if="product.stock==1">{{ product.stock }} pièce en stock</p>
            <p v-else>{{ product.stock }} pièces en stock</p>
          </div>
<!--          <md-checkbox v-model="selectedProducts" :value="product" name="product"/>-->
        </md-list-item>
        <md-divider class="md-inset"></md-divider>
      </div>
    </md-list>
  </div>
</template>

<script>
import api from '../../connection/api.js'

export default {
  name: 'TripleLine',
  data: () => {
    return {
      products: [],
      selectedProducts: []
    }
  },
  beforeMount () {
    api.getProducts()
      .done((data) => {
        this.products = data
      })
      .fail(() => {
      })
      .always(() => {
      })
  },
  methods: {
    getProduct: function (id) {
      api.getProduct(id)
        .done((data) => {
          console.log(data)
        })
    },
    addCart: function (productsSelected) {
      this.$store.commit('UPDATE_CART', productsSelected)
      console.log(productsSelected)
    }
  }
}

</script>

<style lang="scss" scoped>
.md-list {
  width: 25000px;
  max-width: 85%;
  display: inline-block;
  vertical-align: top;
  border: 1px solid rgba(#000, .12);
}
</style>
