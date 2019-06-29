<template>
  <div class="products-area">
    <a class = 'btn btn-primary btn-block' v-if="$store.state.isAdmin && $store.state.addProduct == false" @click.prevent="addProductForm" href="#">Add Product</a>
    <AddProduct v-if="$store.state.isAdmin && $store.state.addProduct" />
    <div class="d-flex">
      <Product class="product" v-for="(item, index) in $store.state.products" :key="index" :item="item" />
    </div>
  </div>
</template>
<script>
import Product from '@/components/Product.vue'
import AddProduct from '@/components/AddProduct.vue'
export default {
  name: 'ProductsArea',
  components: {
    Product,
    AddProduct
  },
  data () {
    return {
    }
  },
  created () {},
  methods: {
    addProductForm(){
      this.$store.commit('toggleAddProduct')
    }
  }
}

</script>
<style scoped>
</style>
