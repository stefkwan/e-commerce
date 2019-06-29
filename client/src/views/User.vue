<template>
  <div class="user">
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

</style>
