<template>
  <div class="cart">
    <h1>Your shopping list</h1>
    <b-list-group>
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
  </div>
</template>

<script>
import CartItem from '@/components/CartItem.vue'
export default {
  name: 'cart',
  components: {
  	CartItem
  },
  data () {
  	return {
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
  }
}
</script>

<style scoped>
.cart {
  padding: 1em;
}
</style>