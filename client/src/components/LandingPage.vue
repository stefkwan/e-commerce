<template>
  <div class="landing-page-area d-flex align-items-center justify-content-center">
    <div>
      <img class="logo" src="../assets/logo.png" alt="Shirtify logo"/>
    </div>
    <div>
      <h1 v-if="$store.state.loggedIn">Hello {{$store.state.currentUser.name}} &#x1F603;</h1>
      <h1 v-else>Welcome to Shirtify</h1>
      <p>Order your shirt today! All size, all designs, one good price.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LandingPage',
  data () {
    return {
    }
  },
  created () {
  },
  methods: {
  }
}
</script>

<style scoped>
h1, p{
  margin: 0;
}

.logo {
  height: 8em;
  width: 8em;
}

</style>
