<template>
  <div class="cart">
    <h1>Your shopping list</h1>
    <div v-if="loading" class="spinner-border text-primary" role="status">
      <span class="sr-only">Loading...</span>
    </div>
    <b-list-group v-else>
	  <b-list-group-item class="d-flex justify-content-around align-items-center cartItem">
	  <b-img v-bind="mainProps" alt="Transparent image"></b-img>
	  <b-col>Name</b-col>
	  <b-col></b-col>
	  <b-col>Qty</b-col>
	  <b-col>Total</b-col>
	  </b-list-group-item>

	  <CartItem v-for="(shopItem, index) in $store.state.currentCart.products" :key="index" 
	      :shopItem="shopItem"
	      :quantity="$store.state.currentCart.count[index]"
	      :dateAdded="$store.state.currentCart.dateAdded[index]"/>

	  <b-list-group-item class="d-flex justify-content-around align-items-center cartItem">
	  <b-img v-bind="mainProps" alt="Transparent image"></b-img>
	  <b-col></b-col>
	  <b-col></b-col>
	  <b-col>{{totalQty}} Products</b-col>
	  <b-col><strong>{{totalPrice}}</strong></b-col>
	  </b-list-group-item>
    </b-list-group>
    <a v-if="$store.state.currentCart && loading == false" href="#" @click.prevent="checkout" class="btn btn-primary m-1">Check-out</a>
  </div>
</template>

<script>
import CartItem from '@/components/CartItem.vue'
import axios from 'axios'
export default {
  name: 'cart',
  components: {
  	CartItem
  },
  created(){
    this.$store.dispatch('getCart')
  },
  data () {
  	return {
      loading: false,
		mainProps: { blank: true, width: 52, height: 52, class: 'm1' }
  	}
  },
  computed: {
    totalPrice () {
      let currentCart = this.$store.state.currentCart
      if (currentCart){
        let subTotal = 0
        let {products, count} = currentCart
        products.forEach((item, index) => {
          subTotal += item.price * count[index]
        })
        if (subTotal === 0) return 'Free'
        return 'Rp. '+ this.formatNumber(subTotal)
      }
      return null
    },
    totalQty () {
      let currentCart = this.$store.state.currentCart
      if (!currentCart) return null
      if (currentCart.count && currentCart.count.length > 0){
        let {count} = currentCart
        const add = (a, b) => a + b
        let subTotal = count.reduce(add)
        if (subTotal === 0) return 'Out of Stock'
        return this.formatNumber(subTotal)
      }
      return null
    }
  },
  methods: {
    checkout(){
      this.loading = true
      let { state } = this.$store
      axios.patch(state.baseURL + '/cart/checkout', {},
        { headers:
          { access_token: state.access_token }
        })
        .then(({ data }) => {
          this.reduceStock()
          console.log({checkout: data})
        })
        .catch(({ response }) => {
          console.log('error at checking-out cart:', response)
        })
    },
    reduceStock () {
      let { state, dispatch } = this.$store
      let { products, count } = state.currentCart
      let numProductsUpdated = 0;

      products.forEach( (product, index) => {
        let newStock = product.stock - count[index]
        axios.patch(state.baseURL + '/products/'+product._id, 
        { stock: newStock},
        { headers:
          { access_token: state.access_token }
        })
        .then(({ data }) => {
          console.log({updatedProductStock: data})
          numProductsUpdated++
          if (numProductsUpdated == count.length){
            dispatch('getCart') // get updated cart and
            dispatch('getProducts') //get updated products
            this.loading = false
          }
        })
        .catch(({ response }) => {
          console.log('error at checking-out cart:', response)
        })
      })
    }
  }
}
</script>

<style scoped>
.cart {
  padding: 1em;
}
</style>