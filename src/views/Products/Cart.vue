<template>
  <div class="home">
    <div v-if="nbMyProducts>0">
      <GetCartMobile v-if="isMobile()"></GetCartMobile>
      <GetCart v-else></GetCart>
    </div>
    <div v-else>
      Votre panier est vide
    </div>
  </div>
</template>

<script>
import GetCart from '@/components/Products/GetCart'
import GetCartMobile from '@/components/Mobile/GetCartMobile'
import { mapGetters } from 'vuex'
export default {
  name: 'Cart',
  components: { GetCartMobile, GetCart },
  methods: {
    isMobile () {
      const toMatch = [
        /Android/i,
        /webOS/i,
        /iPhone/i,
        /iPad/i,
        /iPod/i,
        /BlackBerry/i,
        /Windows Phone/i
      ]
      return toMatch.some((toMatchItem) => {
        return navigator.userAgent.match(toMatchItem)
      })
    }
  },
  computed: {
    ...mapGetters(['nbMyProducts'])
  }
}
</script>

<style scoped>

</style>
