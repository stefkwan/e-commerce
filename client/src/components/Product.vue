<template>
  <div class="product">
    <b-card :title="item.name" :img-src="item.image" img-alt="Image" img-top style="max-width: 20rem;" class="mb-2">
      <b-button @click="addToCart(item.id)" href="#" variant="primary">Add to Cart</b-button>
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
  methods: {
    addToCart (itemId) {
      // add item id to cart of logged in user
      let {state, commit, dispatch} = this.$store
      // if user not logged in, route to login page
      if (state.loggedIn === false ){
        this.goToLoginPage()
      } else {
        dispatch('addToCart', itemId)
      }
    },
    goToLoginPage(){
      this.$router.push('/user/login')
    }
  }
}

</script>
<style scoped>
</style>
