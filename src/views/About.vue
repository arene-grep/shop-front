<template>
  <div class="page-container md-layout-column">
    <md-button class="md-primaray" @click="test">coucou</md-button>
  </div>
</template>

<script>
export default {
  name: 'Temporary',
  data: () => ({
    showNavigation: false,
    showSidepanel: false
  }),
  methods: {
    test: function () {
      this.$notify({
        title: '',
        text: 'Le produit a été ajouté au panier',
        type: 'success'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.page-container {
  min-height: 300px;
  overflow: hidden;
  position: relative;
  border: 1px solid rgba(#000, .12);
}

// Demo purposes only
.md-drawer {
  width: 230px;
  max-width: calc(100vw - 125px);
}

.md-content {
  padding: 16px;
}
</style>
