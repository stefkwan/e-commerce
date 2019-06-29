<template>
  <div class="product d-flex justify-content-center">
    <b-card :title="$store.state.currentUser.name" style="max-width: 20rem;" class="mb-2">
      <label>E-mail:</label>
      <p>{{$store.state.currentUser.email}}</p>
      <label>Address:</label>
      <p>{{$store.state.currentUser.address}}</p>
      <b-button @click="edit" href="#" variant="primary">Edit Profile</b-button>
    </b-card>
  </div>
</template>
<script>
export default {
  name: 'Profile',
  data () {
    return {
    }
  },
  created () {},
  methods: {
    goToLoginPage(){
      this.$router.push('/user/login')
    },
    edit(){
      this.$router.push('/user/edit')
    }
  }
}

</script>
<style scoped>
</style>
