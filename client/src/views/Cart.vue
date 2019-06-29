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

	  <CartItem v-for="(shopItem, index) in products" :key="index" 
	      :shopItem="shopItem"
	      :quantity="count[index]"
	      :dateAdded="dateAdded[index]"/>

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
		products: this.$store.state.currentCart.products,
		count: this.$store.state.currentCart.count,
		dateAdded: this.$store.state.currentCart.dateAdded,
		mainProps: { blank: true, width: 52, height: 52, class: 'm1' }
  	}
  },
  computed: {
  	totalPrice(){
  		let subTotal = 0
  		this.products.forEach((item, index) => {
  			subTotal += item.price * this.count[index]
  		})
  		return this.idrPrice(subTotal)
  	},
    totalQty() {
      const add = (a, b) => a + b
      let subTotal = this.count.reduce(add)
      if (subTotal == 0) return 0

      let result = []
      while(subTotal > 0){
        let rem = subTotal % 1000
        if (rem === 0) rem = '000'
        result.unshift(rem)
        subTotal -= rem
        subTotal /= 1000
      }
      return result.join('.')
    }
  },
  methods: {
    idrPrice(price) {
      if (price === 0) return 'Free'
      let result = []
      while(price > 0){
        let rem = price % 1000
        if (rem === 0) rem = '000'
        result.unshift(rem)
        price -= rem
        price /= 1000
      }
      return 'Rp. ' + result.join('.')
    }
  }
}
</script>

<style scoped>
.cart {
  padding: 1em;
}
</style>