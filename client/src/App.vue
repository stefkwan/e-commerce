<template>
  <div id="app">
    <div id="nav">
      <router-link to="/" exact>Home</router-link>
      <span> | <router-link to="/user">User</router-link>
      </span>
      <span v-if="$store.state.loggedIn"> | <router-link to="/cart">Cart 
        <b-badge v-if="totalQty">{{totalQty}}</b-badge>
      </router-link>
      </span><span> |
      <router-link to="/about">About</router-link></span>
      <ErrorMessage></ErrorMessage>
    </div>
    <router-view/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ErrorMessage from '@/components/ErrorMessage.vue'
export default {
  name: 'App',
  components: {
    ErrorMessage
  },
  created(){
    if(this.loggedIn) this.$store.dispatch('getCart')
  },
  computed: {
    totalQty () {
      let currentCart = this.$store.state.currentCart
      if (!currentCart) return null
      if (currentCart.count && currentCart.count.length > 0){
        let {count} = currentCart
        const add = (a, b) => a + b
        let subTotal = count.reduce(add)
        if (subTotal === 0) return 0
        return subTotal
      }
      return null
    },
    ...mapState(['loggedIn'])
  }
}
</script>

<style>
/*#062399 #775C9E*/
html, body, #app {
  height: 100%;
  background-color: #fafafa;
  font-family: Calibri, sans;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: black;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #775C9E;
}

#nav a.router-link-active {
  color: #062399;
  text-decoration: underline;
}

#nav a:hover {
  color: orange;
}
</style>
