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
      <b-button class="mb-2" v-if="$store.state.isAdmin && $store.state.loggedIn" @click="editProduct(item.id)" href="#" variant="secondary">Edit</b-button>
      <b-button v-if="$store.state.isAdmin && $store.state.loggedIn" @click="deleteProduct(item.id)" href="#" variant="danger">Delete</b-button>
    </b-card>
  </div>
</template>
<script>
import axios from 'axios'
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
      if (this.item.price == 0) return 'Free'
      return 'Rp. '+ this.formatNumber(this.item.price)
    },
    stockNum() {
      if (this.item.stock == 0) return 'Out of Stock'
      return this.formatNumber(this.item.stock)
    }
  },
  methods: {
    editProduct(itemId){

    },
    deleteProduct(itemId){
      let {state, commit, dispatch} = this.$store
      axios.delete(state.baseURL + '/products/'+itemId, 
        { },
        { headers:
          { access_token: state.access_token }
        })
        .then(({ data }) => {
          console.log({deleteProduct: data})
          dispatch('getProducts') //get updated products
        })
        .catch(({ response }) => {
          console.log('error at deleting product:', response)
        })
    },
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
