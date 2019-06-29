<template>
  <div class="products-area">
    <Product v-for="(item, index) in productList" :key="index" :item="item" />
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
      productList: [{
        name: "shirt1",
        image: "https://picsum.photos/600/300/?image=101",
        price: 25000,
        stock: 3
      }, {
        name: "shirt2",
        image: "https://picsum.photos/600/300/?image=102",
        price: 32000,
        stock: 2
      }]
    }
  },
  created () {},
  methods: {}
}

</script>
<style scoped>
</style>
