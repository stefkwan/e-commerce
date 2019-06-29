<template>
  <div id="userEditArea" >
    <h3>Edit your user profile</h3>
    <div class="d-inline-flex flex-column">
      <b-alert :show="dismissCountDown" dismissible variant="danger" @dismissed="dismissCountDown=0" @dismiss-count-down="countDownChanged">
        <p>{{errorMsg}}. Dimissing in {{dismissCountDown}} seconds...</p>
        <b-progress variant="danger" :max="dismissSecs" :value="dismissCountDown" height="4px"></b-progress>
      </b-alert>
      <b-form @submit.prevent="onSubmit" @reset.prevent="onReset">
        <b-form-group id="group-name" label="Name:" label-for="name">
          <b-form-input id="name" v-model="form.name" type="text" required></b-form-input>
        </b-form-group>
        <b-form-group id="group-address" label="Address:" label-for="textarea-address">
          <b-form-textarea id="textarea-address" v-model="form.address"></b-form-textarea>
        </b-form-group>
        <b-form-group id="group-password" label="Password:" label-for="password">
          <b-form-input id="password" v-model="form.password" type="password" required></b-form-input>
        </b-form-group>
        <b-button class="m-1" type="submit" variant="primary">Update Profile</b-button>
        <b-button class="m-1" type="reset" variant="secondary">Cancel</b-button>
        <br />
      </b-form>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'UserEditArea',
  data() {
    return {
      form: {
        name: '',
        address: '',
        password: ''
      },
      dismissSecs: 10,
      dismissCountDown: 0,
      errorMsg: ''
    }
  },
  created() {
    this.form.name = this.$store.state.currentUser.name
    this.form.address = this.$store.state.currentUser.address
  },
  methods: {
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
    showAlert(msg) {
      this.dismissCountDown = this.dismissSecs
      this.errorMsg = msg
    },
    onSubmit() {
      let { state, commit } = this.$store
      let baseURL = state.baseURL
      //login
      axios.patch(
        baseURL + '/users', 
        this.form,
        {headers: {
          access_token: state.access_token
        }})
        .then(({ data }) => {
          console.log('edit user result:', data)
          commit('SAVEUSERLOGIN', data)
          this.onReset()
        })
        .catch(({ response }) => {
          console.log('error at user login:', response)
          this.showAlert(response.data)
        })
    },
    goToHome() {
      this.$router.push('/')
    },
    onReset() {
      this.$router.push('/user')
    },
    register() {
      this.$router.push('/user/register')
    }
  }
}

</script>
<style scoped>
#loginArea {
  padding: 1em;
  max-width: 30em;
}

</style>
