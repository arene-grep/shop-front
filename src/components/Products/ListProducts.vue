<template>
  <div>
    <div>
    <div class="md-layout md-gutter">
      <div class="md-layout-item">
        <md-field>
          <label for="tcg">TCG</label>
          <md-select name="tcg" id="tcg" v-model="selectedTCG">
            <md-option value="all">Tous</md-option>
            <md-option v-for="tcgames in tcgames" :key="tcgames.id" :value=" tcgames.name ">{{ tcgames.name }}</md-option>
          </md-select>
        </md-field>
      </div>

      <div class="md-layout-item">
        <md-field>
          <label for="product_type">Type de produit</label>
          <md-select v-model="selectedType" name="product_type" id="product_type">
            <md-option value="all">Tous</md-option>
            <md-option v-for="categories in categories" :key="categories.id" :value=" categories.name ">{{ categories.name }}</md-option>
          </md-select>
        </md-field>
      </div>

      <div class="md-layout-item">
        <md-field>
          <label for="tri">Tri</label>
          <md-select v-model="selectedSort" name="tri" id="tri">
            <md-option value="name_asc">Par nom ordre croissant</md-option>
            <md-option value="name_desc">Par nom ordre décroissant</md-option>
            <md-option value="price_low">Par prix le moins chère</md-option>
            <md-option value="price_high">Par prix le plus chère</md-option>
          </md-select>
        </md-field>
      </div>
      <div class="md-layout-item">
      <md-field>
        <label>Chercher</label>
        <md-input v-model="recherche" placeholder="Recherche"></md-input>
      </md-field>
      </div>
      <div class="md-layout-item-button">
        <md-button class="md-primary" @click="searchProduct">Chercher</md-button>
      </div>
    </div>
    </div>
    <div class="card">
      <!-- <div v-for="product in products" :key="product.id">-->
      <!-- pour en afficher que 30 -->
      <div v-for="product in products.slice(0,30) " :key="product.id">
      <md-card md-with-hover>
        <md-card-media-cover md-solid >
          <md-card-media md-ratio="1:1">
            <h2 @click="$router.push({ name: 'getProduct', params: {id: product.id } })">
              <img src="../../assets/logo-arene.png" alt="Skyscraper">
            </h2>
            </md-card-media>
             <md-card-area>
                <md-card-header>
                 <span>{{ product.name }}</span>
                 <span>PRIX : {{ product.price }} CHF</span>
                </md-card-header>
               <md-card-actions>
                  <md-button class="md-icon-button" @click="addCart(product)">
                    <md-icon>shopping_cart</md-icon>
                  </md-button>
                </md-card-actions>
              </md-card-area>
          </md-card-media-cover>
      </md-card>
    </div>
    </div>
  </div>
</template>
<script>
import api from '../../connection/api.js'
import router from '@/router'
export default {
  name: 'TripleLine',
  data: () => {
    return {
      products: [],
      selectedProducts: [],
      categories: [],
      tcgames: [],
      selectedTCG: {},
      selectedType: {},
      selectedSort: {},
      recherche: ''
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
    api.getCategories()
      .done((data) => {
        this.categories = data
      })
      .fail(() => {
      })
      .always(() => {
      })
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
    searchProduct: function () {
      console.log(this.recherche)
    },
    goProduct: function (id) {
      router.push({ name: 'getProduct', params: id })
    },
    getProduct: function (id) {
      api.getProduct(id)
        .done((data) => {
          console.log(data)
        })
    },
    addCart: function (productsSelected) {
      this.$store.commit('ADD_PRODUCT', productsSelected)
      this.$notify({
        title: '',
        text: productsSelected.name + ' a été ajouté au panier',
        type: 'success'
      })
    },
    updateQuantity: function (product) {
      if (product.cpt > product.stock) { product.cpt = product.stock }
    }
  }
}

</script>

<style lang="scss" scoped>

.md-card {
    width: 320px;
    margin: 4px;
    display: inline-block;
    vertical-align: top;
  }
.card {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
    grid-auto-rows: 320px;
    row-gap: 20px;
    vertical-align: top;
    border: 1px solid rgba(#000, .12);
}

.md-layout {
  margin-left: 20px;
  margin-right: 20px;
}

</style>
