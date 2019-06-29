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
      let subTotal = this.shopItem.price * this.quantity
      if (subTotal == 0) return 'Free'
  		return 'Rp. '+this.formatNumber(subTotal)
  	},
    singlePrice(){
      let subTotal = this.shopItem.price
      if (subTotal == 0) return 'Free'
      return 'Rp. '+this.formatNumber(subTotal)
    },
    qtyNum() {
      if (this.quantity == 0) return "None"
      return this.formatNumber(this.quantity)
    }
  },
  methods: {
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