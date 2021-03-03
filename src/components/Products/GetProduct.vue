<template>
<div>
  <div class="column">
    <img src="../../assets/logo-arene.png" alt="Skyscraper">
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field>
                Stock : {{ tmpProduct.stock }} pièces
              </md-field>
              <md-field>
                <div class="card">
                  Prix : CHF {{ tmpProduct.price }}
                </div>
                <div class="card">
                  <input id="quantity" type="number" value="1" min="1" size="3" :max=" tmpProduct.stock " @input="updateQuantity(tmpProduct)">
                </div>
                 <div class="card">
                  <md-button class="md-dense md-raised md-primary" @click="addCart(tmpProduct)">Ajouter au panier</md-button>
                </div>
              </md-field>
            </div>
          </div>
  </div>
  <div class="column">
    <form novalidate class="md-layout" @submit.prevent="validateProduct">
      <md-card class="md-layout-item">
        <md-card-header>
          <div class="md-title">{{ tmpProduct.name }}</div>
        </md-card-header>
<!--        <md-card-content>-->
<!--          <div class="md-layout md-gutter">-->
<!--            <div class="md-layout-item md-small-size-100">-->
<!--              <md-field>-->
<!--                TCG : {{ tcgames[tmpProduct.trading_card_game_id].name }}-->
<!--              </md-field>-->
<!--            </div>-->
<!--          </div>-->
<!--          <div class="md-layout md-gutter">-->
<!--            <div class="md-layout-item md-small-size-100">-->
<!--              <md-field>-->
<!--                Catégorie : {{ categories[tmpProduct.category_id].name }}-->
<!--              </md-field>-->
<!--            </div>-->
<!--          </div>-->
<!--          <div class="md-layout md-gutter">-->
<!--            <div class="md-layout-item md-small-size-100">-->
<!--              <md-field>-->
<!--                Langue : {{ languages[tmpProduct.language_id].name }}-->
<!--              </md-field>-->
<!--            </div>-->
<!--          </div>-->
<!--        </md-card-content>-->
      </md-card>
      <md-card class="description">
        <md-field>
          Description
        </md-field>
        <md-card-content>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio itaque ea, nostrum odio. Dolores, sed accusantium quasi non, voluptas eius illo quas, saepe voluptate pariatur in deleniti minus sint. Excepturi.
        </md-card-content>
      </md-card>
    </form>
  </div>
</div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import api from '@/connection/api'
import {
} from 'vuelidate/lib/validators'

export default {
  name: 'FormValidation',
  mixins: [validationMixin],
  data: () => ({
    active: false,
    product: {},
    tmpProduct: {},
    idProduct: null,
    form: {
      name: null,
      price: null,
      stock: null,
      minimum_stock: null,
      tcg: null,
      category: null,
      language: null
    },
    categories: [],
    tcgames: [],
    languages: []
  }),
  methods: {
    addCart: function () {
      this.tmpProduct.nb = document.getElementById('quantity').value
      this.$store.commit('ADD_PRODUCT', this.tmpProduct)
    },
    updateQuantity: function (tmpProduct) {
      if (tmpProduct.cpt > tmpProduct.stock) { tmpProduct.cpt = tmpProduct.stock }
    }
  },
  mounted () {
    this.idProduct = this.$route.params.id
    api.getProduct(this.idProduct)
      .done((data) => {
        this.tmpProduct = data
        this.form.name = data.name
        this.form.price = data.price
        this.form.stock = data.stock
        this.form.minimum_stock = data.minimum_stock
        // this.form.tcg = data.trading_card_game_id
        // this.form.category = data.category_id
        // this.form.language = data.language_id
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
    api.getLanguages()
      .done((data) => {
        this.languages = data
      })
      .fail(() => {
      })
      .always(() => {
      })
  }
}
</script>

<style lang="scss" scoped>
.md-progress-bar {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
}
.md-card {
  max-width: 85%;
  min-width: 85%;
  display: inline-block;
  margin-left: auto;
  margin-right: auto;
}

.md-layout {
  height: 50%;
}

.column {
  float: left;
  width: 50%;
}

.card{
  float: left;
  width: 33%;

}
</style>
