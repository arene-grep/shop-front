<template>
  <div class="page-container">
    <md-app md-waterfall md-mode="fixed-last">
      <md-app-toolbar class="md-large md-dense md-primary">
        <div class="md-toolbar-row">
          <div class="md-toolbar-section-start">
            <span class="md-title">L'Arène de Duel</span>
          </div>
        </div>
        <div class="md-toolbar-row" style="justify-content:center;">
          <md-tabs class="md-primary">
            <md-tab id="tab-home" md-label="Accueil" to="/home"></md-tab>
            <md-tab id="tab-products" md-label="Produits" to="/products"></md-tab>
            <md-tab id="tab-events" md-label="Évènements" to="/events"></md-tab>
            <md-tab id="tab-login" md-label="Login" to="/login"></md-tab>
            <md-tab id="tab-register" md-label="Register" to="/register"></md-tab>
          </md-tabs>
        </div>
      </md-app-toolbar>
      <md-app-content>
      </md-app-content>
    </md-app>
    <img src="../../assets/logo-arene.png" />
    <br><br>
  </div>
</template>

<style lang="scss" scoped>

// Demo purposes only
.md-drawer {
  width: 230px;
  max-width: calc(100vw - 125px);
}
</style>

<script>
export default {
  name: 'LastRowFixed',
  data: () => ({
    menuVisible: false
  })
}
</script>
