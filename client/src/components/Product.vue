<template>
  <div class="product">
    <b-card v-if="editingProduct===false" :title="itemName" :img-src="itemImage" img-alt="Image" img-top style="width: 12rem;" class="mb-1 overflow-hidden">
      <b-card-text>
      Price: {{idrPrice}}
      </b-card-text>
      <b-card-text>
      Stock: {{stockNum}}
      </b-card-text>
      <b-button class="mb-1" @click="addToCart(itemId)" href="#" variant="primary">Add to Cart</b-button>
      <b-button class="mb-1" v-if="$store.state.isAdmin && $store.state.loggedIn" @click="toggleEditProduct" href="#" variant="secondary">Edit Product</b-button>
      <b-button class="mb-1" v-if="$store.state.isAdmin && $store.state.loggedIn" @click="deleteProduct(itemId)" href="#" variant="danger">Delete</b-button>
    </b-card>
    <!-- <router-view></router-view> -->
    <EditProduct v-else :oldform="item" @toggleEditProduct="toggleEditProduct"></EditProduct>
  </div>
</template>
<script>
import axios from 'axios'
import EditProduct from '@/components/EditProduct.vue'
export default {
  name: 'Product',
  props: ['item'],
  data () {
    return {
      editingProduct: false
    }
  },
  components: {
    EditProduct
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
      let thisImage = this.item.image
      if (!thisImage) return 'No Image'
      return thisImage
    },
    idrPrice() {
      if (this.item.price == null || this.item.price == undefined) return 'NaN'
      if (this.item.price == 0) return 'Free'
      return 'Rp. '+ this.formatNumber(this.item.price)
    },
    stockNum() {
      if (this.item.stock == null || this.item.stock == undefined) return 'Nan'
      if (this.item.stock == 0) return 'Out of Stock'
      return this.formatNumber(this.item.stock)
    }
  },
  methods: {
    deleteProduct(itemId){
      let {state, commit, dispatch} = this.$store
      axios.delete(state.baseURL + '/products/'+itemId,
        { headers:
          { access_token: state.access_token }
        })
        .then(({ data }) => {
          console.log({deleteProduct: data})
          dispatch('getProducts') //get updated products
          dispatch('deleteImageFromGCS', data.image) // delete the old image
          dispatch('getCart')
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
    },
    toggleEditProduct () {
      this.editingProduct = !this.editingProduct
    },
  }
}

</script>
<style scoped>
</style>
