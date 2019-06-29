<template>
  <b-list-group-item class="d-flex justify-content-between align-items-center cartItem">
    <b-img rounded :src="shopItem.image" alt="thumb" height="42" width="42"></b-img>
    <b-col>{{shopItem.name}}</b-col>
    <b-col>{{singlePrice}}</b-col>
    <b-button-group class="mx-1">
      <b-button @click="decItem"> - </b-button>
      <b-button disabled> {{qtyNum}} </b-button>
      <b-button @click="incItem"> + </b-button>
    </b-button-group>
    <b-col>{{totalPrice}}</b-col>
  </b-list-group-item>
</template>

<script>

export default {
  name: 'CartItem',
  props: ['shopItem', 'quantity', 'dateAdded'],
  created () {
    this.$store.dispatch('getProducts')
  },
  computed: {
  	totalPrice(){
  		return this.idrPrice(this.shopItem.price * this.quantity)
  	},
    singlePrice(){
      return this.idrPrice(this.shopItem.price)
    },
    qtyNum() {
      let stock = this.quantity
      let result = []
      while(stock > 0){
        let rem = stock % 1000
        if (rem === 0) rem = '000'
        result.unshift(rem)
        stock -= rem
        stock /= 1000
      }
      return result.length === 0 ? 'Out of stock' : result.join('.')
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
    },
    decItem(){
      this.$store.dispatch('takeFromCart', this.shopItem._id)
    },
    incItem(){
      this.$store.dispatch('addToCart', this.shopItem._id)
    }
  },
  data () {
  	return {
  	}
  }
}
</script>