<template>
  <div class="cart">
    <h1>Your shopping list</h1>
    <b-list-group>
	  <b-list-group-item class="d-flex justify-content-between align-items-center cartItem">
	  </b-list-group-item>

	  <CartItem v-for="(shopItem, index) in products" :key="index" 
	      :shopItem="shopItem"
	      :quantity="count[index]"
	      :dateAdded="dateAdded[index]"/>
	    
	  <b-list-group-item class="d-flex justify-content-between align-items-center cartItem">
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
		products: this.$store.state.currentCart.products,
		count: this.$store.state.currentCart.count,
		dateAdded: this.$store.state.currentCart.dateAdded
  	}
  }
}
</script>