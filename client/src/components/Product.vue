<template>
  <div class="product">
    <b-card :title="item.name" :img-src="item.image" img-alt="Image" img-top style="width: 10rem;" class="mb-2 overflow-hidden">
      <b-card-text>
      Price: {{idrPrice}}
      </b-card-text>
      <b-card-text>
      Stock: {{stockNum}}
      </b-card-text>
      <b-button class="mb-2" @click="addToCart(item._id)" href="#" variant="primary">Add to Cart</b-button>
      <b-button class="mb-2" v-if="$store.state.isAdmin" @click="deleteProduct(item.id)" href="#" variant="secondary">Edit</b-button>
      <b-button v-if="$store.state.isAdmin" @click="deleteProduct(item.id)" href="#" variant="danger">Delete</b-button>
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
  computed: {
    idrPrice() {
      let price = this.item.price
      let result = []
      while(price > 0){
        let rem = price % 1000
        if (rem === 0) rem = '000'
        result.unshift(rem)
        price -= rem
        price /= 1000
      }
      return result.length === 0 ? 'Free' : 'Rp. ' + result.join('.')
    },
    stockNum() {
      let stock = this.item.stock
      let result = []
      while(stock > 0){
        let rem = stock % 1000
        if (rem === 0) rem = '000'
        result.unshift(rem)
        stock -= rem
        stock /= 1000
      }
      return result.join('.')
    }
  },
  methods: {
    addToCart (itemId) {
      console.log({itemId})
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
