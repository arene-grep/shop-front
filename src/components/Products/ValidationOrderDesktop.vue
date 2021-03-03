<template>
  <div>
    <div>
      <form novalidate class="md-layout" @submit.prevent="validateUser" style="justify-content:center;">
        <md-card class="md-layout-item md-size-50 md-small-size-100">
          <md-card-header>
            <div class="md-title">Vos informations personnelles</div>
          </md-card-header>

          <md-card-content>
            <div class="md-layout md-gutter">
              <div class="md-layout-item md-small-size-100">
                <md-field :class="getValidationClass('name')">
                  <label>Name</label>
                  <md-input name="name" id="name" v-model="form.name"/>
                  <span class="md-error" v-if="!$v.form.name.required">The name is required</span>
                  <span class="md-error" v-else-if="!$v.form.name.minlength">Invalid name</span>
                </md-field>
              </div>
            </div>
            <div class="md-layout md-gutter">
              <div class="md-layout-item md-small-size-100">
                <md-field :class="getValidationClass('email')">
                  <label>Email</label>
                  <md-input name="email" id="email" v-model="form.email"/>
                  <span class="md-error" v-if="!$v.form.email.required">The email is required</span>
                  <span class="md-error" v-else-if="!$v.form.email.minlength">Invalid email</span>
                </md-field>
              </div>
            </div>
          </md-card-content>
        </md-card>
        <br>
        <div class="md-layout" style="display: grid; justify-content:center;">
          <md-card class="md-layout-item md-large-size-100">
            <md-card-header>
              <div class="md-title">Votre commande</div>
            </md-card-header>
            <md-card-header-text style="float: left">
              Nombre de produits commandés : {{ nbMyProducts }} articles
            </md-card-header-text>
            <br>
            <md-card-header-text style="float: left">
              Sous-total : {{ myTotalPrice }} CHF
            </md-card-header-text>
            <br>
            <md-card-header-text style="float: left">
              Livraison : 0 CHF
            </md-card-header-text>
            <br><br>
            <md-divider></md-divider>
            <br>
            <md-card-header-text style="float: left">
              <h4>Total : {{ myTotalPrice }} CHF</h4>
            </md-card-header-text>
            <md-card-actions>
              <md-button class="md-primary" type="submit">Commander</md-button>
            </md-card-actions>
          </md-card>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate'

import {
  required,
  minLength
} from 'vuelidate/lib/validators'
import { mapGetters } from 'vuex'
import router from '@/router'

export default {
  name: 'RegisterForm',
  mixins: [validationMixin],
  data: () => ({
    user: {},
    form: {
      name: null,
      password: null,
      email: null
    },
    lastUser: null
  }),
  validations: {
    form: {
      name: {
        required,
        minLength: minLength(3)
      },
      email: {
        required,
        minLength: minLength(3)
      }
    }
  },
  computed: {
    ...mapGetters(['myProducts', 'nbMyProducts', 'myTotalPrice'])
  },
  methods: {
    getValidationClass (fieldName) {
      const field = this.$v.form[fieldName]

      if (field) {
        return {
          'md-invalid': field.$invalid && field.$dirty
        }
      }
    },
    clearForm () {
      this.$v.$reset()
      this.form.name = null
      this.form.email = null
    },
    saveUser () {
      const data = {
        name: this.form.name,
        email: this.form.email
      }
      // appel de l'API
      console.log(data)
      router.push({ name: 'ConfirmationOrder' })
    },
    validateUser () {
      this.$v.$touch()

      if (!this.$v.$invalid) {
        this.saveUser()
      }
    }
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
</style>
