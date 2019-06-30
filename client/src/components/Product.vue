<template>
  <div class="product">
    <b-card :title="itemName" :img-src="itemImage" img-alt="Image" img-top style="width: 10rem;" class="mb-2 overflow-hidden">
      <b-card-text>
      Price: {{idrPrice}}
      </b-card-text>
      <b-card-text>
      Stock: {{stockNum}}
      </b-card-text>
      <b-button class="mb-2" @click="addToCart(itemId)" href="#" variant="primary">Add to Cart</b-button>
      <b-button class="mb-2" v-if="$store.state.isAdmin && $store.state.loggedIn" @click="editProduct(itemId)" href="#" variant="secondary">Edit</b-button>
      <b-button v-if="$store.state.isAdmin && $store.state.loggedIn" @click="deleteProduct(itemId)" href="#" variant="danger">Delete</b-button>
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
    itemId(){
      if(!this.item._id) return ''
        return this.item._id
    },
    itemName(){
      if (!this.item.name) return 'No Name'
      return this.item.name
    },
    itemImage(){
      if (!this.item.image) return 'No Image'
      return this.item.image
    },
    idrPrice() {
      if (!this.item.price) return 'NaN'
      if (this.item.price == 0) return 'Free'
      return 'Rp. '+ this.formatNumber(this.item.price)
    },
    stockNum() {
      if (!this.item.stock) return 'Nan'
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
