<template>
  <div>
    <div>
    <div class="md-layout md-gutter">
      <div class="md-layout-item">
        <md-field>
          <label for="tcg">TCG</label>
          <md-select v-model="tcg" name="tcg" id="tcg">
            <md-option value="Yu-Gi-Oh">Yu-Gi-Oh</md-option>
            <md-option value="Dragonball">Dragonball</md-option>
          </md-select>
        </md-field>
      </div>

      <div class="md-layout-item">
        <md-field>
          <label for="product_type">Type de produit</label>
          <md-select v-model="product_type" name="product_type" id="product_type">
            <md-option value="booster">Booster à l'unité</md-option>
            <md-option value="booster_box">Boite de boosters</md-option>
            <md-option value="deck">Deck</md-option>
          </md-select>
        </md-field>
      </div>

      <div class="md-layout-item">
        <md-field>
          <label for="tri">Tri</label>
          <md-select v-model="tri" name="tri" id="tri">
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
        <md-button class="md-primary">Chercher</md-button>
      </div>
    </div>
    </div>
    <div class="card">
    <div v-for="product in products" :key="product.id">
      <md-card>
        <md-card-media-cover md-solid>
          <md-card-media md-ratio="1:1">
              <img src="../../assets/logo-arene.png" alt="Skyscraper">
            </md-card-media>
             <md-card-area>
                <md-card-header>
                 <span>{{ product.name }}</span>
                 <span>PRIX : {{ product.price }} CHF</span>
                </md-card-header>
               <md-card-actions>
                  <input id="quantity" type="number" value="1" size="3">
                  <md-button class="md-icon-button">
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

.md-card {
    width: 320px;
    margin: 4px;
    display: inline-block;
    vertical-align: top;
  }
.card {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    grid-auto-rows: 320px;
    vertical-align: top;
    border: 1px solid rgba(#000, .12);
}

.md-layout {
  margin-left: 20px;
  margin-right: 20px;
}

</style>
