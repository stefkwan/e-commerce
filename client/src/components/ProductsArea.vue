<template>
  <div class="products-area">
    <Product v-for="(item, index) in $store.state.products" :key="index" :item="item" />
  </div>
</template>
<script>
import Product from '@/components/Product.vue'
export default {
  name: 'ProductsArea',
  components: {
    Product
  },
  data () {
    return {
    }
  },
  created () {},
  methods: {}
}

</script>
<style scoped>
</style>
