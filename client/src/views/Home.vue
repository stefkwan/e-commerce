<template>
  <div class="home">
    <div class="container">
      <LandingPage />
      <ProductsArea />
    </div>
  </div>
</template>
<script>
import LandingPage from '@/components/LandingPage.vue'
import ProductsArea from '@/components/ProductsArea.vue'

export default {
  name: 'home',
  components: {
    LandingPage,
    ProductsArea
  },
  created(){
    this.$store.dispatch('getProducts')
  }
}

</script>

<style scoped>
</style>