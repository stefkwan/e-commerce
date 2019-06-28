<template>
  <div class="products-area">
    <div >
    <!-- v-for="item in productList"> -->
      <b-card title="Card Title" img-src="https://picsum.photos/600/300/?image=25" img-alt="Image" img-top tag="article" style="max-width: 20rem;" class="mb-2">
        <b-button href="#" variant="primary">Add to Cart</b-button>
      </b-card>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ProductsArea',
  data() {
    return {}
  },
  created () {},
  methods: {}
}

</script>
<style scoped>
</style>
