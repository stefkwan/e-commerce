<template>
  <div id="loginArea" class="d-inline-flex flex-column">
    <b-alert
      :show="dismissCountDown"
      dismissible
      variant="danger"
      @dismissed="dismissCountDown=0"
      @dismiss-count-down="countDownChanged"
    >
      <p>{{errorMsg}}. Dimissing in {{dismissCountDown}} seconds...</p>
      <b-progress
        variant="danger"
        :max="dismissSecs"
        :value="dismissCountDown"
        height="4px"
      ></b-progress>
    </b-alert>
    <b-form @submit="onSubmit" @reset="onReset">
      <b-form-group
        id="group-email"
        label="Email address:"
        label-for="email"
      >
        <b-form-input
          id="email"
          v-model="form.email"
          type="email"
          required
          placeholder="Enter email"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="group-password"
        label="Password:"
        label-for="password"
      >
        <b-form-input
          id="password"
          v-model="form.password"
          type="password"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="save">
        <b-form-checkbox-group v-model="form.checked" id="checkboxes-4">
          <b-form-checkbox value="savePass">Save Password</b-form-checkbox>
          <b-form-checkbox value="saveEmail">Save E-mail</b-form-checkbox>
        </b-form-checkbox-group>
      </b-form-group>

      <b-button class="m-1" type="submit" variant="primary">Login</b-button>
      <b-button class="m-1" type="reset" variant="danger">Reset</b-button>
      <br/>
      <label>Don't have an account? <a href="#" @click.prevent="register">Register</a></label>
    </b-form>
  </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'LoginArea',
  data() {
    return {
      form: {
        email: '',
        password: '',
        checked: []
      },
      dismissSecs: 10,
      dismissCountDown: 0,
      errorMsg: ''
    }
  },
  created() {
    if (this.$store.state.loggedIn){
      this.goToHome()
    }
  },
  methods: {
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
    showAlert(msg) {
      this.dismissCountDown = this.dismissSecs
      this.errorMsg = msg
    },
    onSubmit(event) {
      event.preventDefault()
      let {state, commit} = this.$store
      let baseURL = state.baseURL
      //login
      axios.post(baseURL+'/users/login', this.form)
        .then( ({data}) => {
          console.log('login result:', data)
          commit('SAVEUSERLOGIN', 
            { name: data.name, 
              email: this.form.email,
              address: data.address,
              access_token: data.access_token
            })
          this.goToHome()
        })
        .catch( ({response}) => {
          console.log('error at user login:', response)
          this.showAlert(response.data)
        })
    },
    goToHome(){
      this.$router.push('/')
    },
    onReset(event) {
      event.preventDefault()
      this.form = {
        email: '',
        password: '',
        checked: []
      }
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
