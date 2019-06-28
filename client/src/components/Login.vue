<template>
  <div class="login-area d-flex flex-column">
    <span><label>Enter Your Name: </label></span>
    <span><input v-model="name" type="text"/></span>
    <span><button @click="savename" class="btn btn-success">Start
    </button></span>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      name: ''
    }
  },
  created () {
    if (localStorage.getItem('username')){
      this.name = localStorage.getItem('username')
      this.savename()
      this.goToLobby()
    } 
  },
  methods: {
    savename: function () {
      this.$store.commit('UPDATENAME', this.name)
      localStorage.setItem('username', this.name)
      // go to lobby after saving name
      this.goToLobby()
    },
    goToLobby: function  () {
      this.$router.push('/lobby')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login-area span{
  font-family: Calibri, sans;
  font-size: 2em;
}

label, input, button {
  width: 25%;
  border-radius: 1em;
}

input {
  padding-left: 0.5em;
  padding-right: 0.5em;
}

label {
  color: #F9EC9F;
  font-style: italic;
}

button {
  margin: 1%;
  padding: 0.1em;
  font-size: 1em;
}
</style>
