<template>
  <div class="user">
    <!-- <router-link class="link" to="/user/history">Purchase History</router-link>
    <span v-if='$store.state.isAdmin'> | </span> 
    <router-link class="link" v-if='$store.state.isAdmin' to="/user/allUsers">All Users</router-link> -->
    <router-view></router-view>
    <Profile v-if="$store.state.loggedIn"/>
    <b-button v-if="$store.state.loggedIn" class="m-1" @click="logout" variant="danger">Logout</b-button>
  </div>
</template>
<script>
import Profile from '@/components/Profile.vue'
export default {
  name: 'user',
  components: {
    Profile
  },
  data () {
    return {
    }
  },
  created () {},
  methods: {
    logout() {
      console.log("onsubmit logout")
      this.$store.commit('LOGOUT')
      this.$router.push('/user/login')
    }
  }
}

</script>
<style scoped>
a {
  font-weight: bold;
  color: #775C9E;
}

a.router-link-active {
  color: #062399;
  text-decoration: underline;
}

a:hover {
  color: orange;
}

</style>
