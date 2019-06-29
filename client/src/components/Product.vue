<template>
  <div class="product">
    <b-card :title="item.name" :img-src="item.image" img-alt="Image" img-top style="max-width: 20rem;" class="mb-2">
      <b-button @click="addToCart(index)" href="#" variant="primary">Add to Cart</b-button>
    </b-card>
  </div>
</template>
<script>
export default {
  name: 'Product',
  props: ['item'],
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
