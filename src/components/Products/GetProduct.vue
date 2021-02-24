<template>
  <div>
    <form novalidate class="md-layout" @submit.prevent="validateProduct">
      <md-card class="md-layout-item">
        <md-card-header>
          <div class="md-title">{{ tmpProduct.name }}</div>
        </md-card-header>
        <md-card-content>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field>
                Prix : CHF {{ tmpProduct.price }}
              </md-field>
            </div>
          </div>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field>
                Stock : {{ tmpProduct.stock }} pièces
              </md-field>
            </div>
          </div>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field>
                TCG : {{ tmpProduct.trading_card_game_id }}
              </md-field>
            </div>
          </div>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field>
                Catégorie : {{ tmpProduct.category_id }}
              </md-field>
            </div>
          </div>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field>
                Langue : {{ tmpProduct.language_id }}
              </md-field>
            </div>
          </div>
        </md-card-content>
        <div>
          <md-card-actions>
            <md-button class="md-dense md-raised md-primary" @click="addCart()">Ajouter au panier</md-button>
          </md-card-actions>
        </div>
      </md-card>
    </form>
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
    }
  }),
  methods: {
    addCart: function () {
      this.$store.commit('ADD_PRODUCT', this.tmpProduct)
    }
  },
  beforeMount () {
    this.idProduct = this.$route.params.id
    api.getProduct(this.idProduct)
      .done((data) => {
        this.tmpProduct = data
        this.form.name = data.name
        this.form.price = data.price
        this.form.stock = data.stock
        this.form.minimum_stock = data.minimum_stock
        this.form.tcg = data.trading_card_game_id
        this.form.category = data.category_id
        this.form.language = data.language_id
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
  display: inline-block;
  margin-left: auto;
  margin-right: auto;
}
</style>
