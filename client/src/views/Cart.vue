<template>
  <div class="cart">
    <h1>Your shopping list</h1>
    <b-list-group>
      <b-list-group-item v-for="(shopItem, index) in products" :key="index" class="d-flex justify-content-between align-items-center">
        <b-img thumbnail :src="shopItem.image" alt="shirtify" height="32" width="32"></b-img>{{shopItem.image}}{{shopItem.name}}
        <b-badge variant="primary" pill>{{count[index]}}</b-badge>
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>

export default {
  name: 'cart',
  components: {
  },
  created(){
  },
  data () {
  	return {
		products: this.$store.state.currentCart.products,
		count: this.$store.state.currentCart.count,
		dateAdded: this.$store.state.currentCart.dateAdded,
  	}
  }
}
</script>