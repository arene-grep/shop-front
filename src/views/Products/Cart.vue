<template>
  <div class="home">
    <GetCartMobile v-if="isMobile()"></GetCartMobile>
    <GetCart v-else></GetCart>
  </div>
</template>

<script>
import GetCart from '@/components/Products/GetCart'
import GetCartMobile from '@/components/Mobile/GetCartMobile'
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
  }
}
</script>

<style scoped>

</style>
