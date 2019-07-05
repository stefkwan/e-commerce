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
      <CartItem v-for="(shopItem, index) in cproducts" :key="index" :shopItem="shopItem" :quantity="$store.state.currentCart.count[index]" :dateAdded="$store.state.currentCart.dateAdded[index]" />
      <b-list-group-item class="d-flex justify-content-around align-items-center cartItem">
        <b-img v-bind="mainProps" alt="Transparent image"></b-img>
        <b-col></b-col>
        <b-col></b-col>
        <b-col>{{totalQty}} Products</b-col>
        <b-col><strong>{{totalPrice}}</strong></b-col>
      </b-list-group-item>
    </b-list-group>
    <b-button v-if="$store.state.currentCart && loading === false" href="#" @click.prevent="deleteCart" variant="secondary" class="m-1">Reset</b-button>
    <b-button :disabled="!totalQty" v-if="$store.state.currentCart && loading === false" href="#" @click.prevent="checkout" variant="primary" class="m-1">Check-out</b-button>
  </div>
</template>
<script>
import CartItem from '@/components/CartItem.vue'
import axios from 'axios'
import { mapState } from 'vuex'
export default {
  name: 'cart',
  components: {
    CartItem
  },
  created () {
    if (loggedIn) this.$store.dispatch('getCart')
  },
  data () {
    return {
      loading: false,
      mainProps: { blank: true, width: 52, height: 52, class: 'm1' }
    }
  },
  computed: {
    cproducts () {
      let currentCart = this.currentCart
      if (!currentCart) return null
      return currentCart.products
    },
    totalPrice () {
      let currentCart = this.currentCart
      if (!currentCart) return null
      let subTotal = 0
      let { products, count } = currentCart
      products.forEach((item, index) => {
        subTotal += item.price * count[index]
      })
      if (subTotal === 0) return 'Free'
      return 'Rp. ' + this.formatNumber(subTotal)
    },
    totalQty () {
      let currentCart = this.currentCart
      if (!currentCart) return null
      if (currentCart.count && currentCart.count.length > 0) {
        let { count } = currentCart
        const add = (a, b) => a + b
        let subTotal = count.reduce(add)
        if (subTotal === 0) return 'Out of Stock'
        return this.formatNumber(subTotal)
      }
      return null
    },
    ...mapState(['loggedIn', 'currentCart'])
  },
  methods: {
    deleteCart () {
      // delete cart then make a new one
      this.loading = true
      let { state, dispatch } = this.$store
      axios.delete(state.baseURL + '/cart', {
        headers: { access_token: state.access_token }
      })
        .then(({ data }) => {
          console.log({ deleteCart: data })
          dispatch('getCart')
          this.loading = false
        })
        .catch(({ response }) => {
          console.log('error at deleting cart:', response)
        })
    },
    checkout () {
      this.loading = true
      let { state } = this.$store
      axios.patch(state.baseURL + '/cart/checkout', {}, {
        headers: { access_token: state.access_token }
      })
        .then(({ data }) => {
          this.reduceStock()
          console.log({ checkout: data })
        })
        .catch(({ response }) => {
          console.log('error at checking-out cart:', response)
        })
    },
    reduceStock () {
      let { state, dispatch } = this.$store
      let currentCart = state.currentCart
      if (!currentCart) return 'No Cart'
      let { products, count } = state.currentCart
      let numProductsUpdated = 0

      products.forEach((product, index) => {
        product.stock -= count[index]
        axios.patch(state.baseURL + '/products/' + product._id,
          product, {
            headers: { access_token: state.access_token }
          })
          .then(({ data }) => {
            console.log({ updatedProductStock: data })
            numProductsUpdated++
            if (numProductsUpdated === count.length) {
              dispatch('getCart') // get updated cart and
              dispatch('getProducts') // get updated products
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
