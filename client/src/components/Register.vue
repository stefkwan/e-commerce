<template>
  <div id="registerArea" class="d-inline-flex flex-column">
    <b-form @submit="onSubmit" @reset="onReset">
      <b-form-group
        id="group-email"
        label="Email address:"
        label-for="email"
        description="We'll never share your email with anyone else."
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

      <b-button class="m-1" type="submit" variant="primary">Register</b-button>
      <b-button class="m-1" type="reset" variant="danger">Reset</b-button>
      <br/>
      <label>Already have an account? <a href="#" @click.prevent="goToLoginPage">Login</a></label>

    </b-form>
  </div>
  </div>
</template>
<script>
export default {
  name: 'Register',
  data() {
    return {
      form: {
        email: '',
        password: ''
      },
    }
  },
  created() {},
  methods: {
    goToLoginPage(){
      this.$router.push('/user/login')
    },
    onSubmit(event) {
      event.preventDefault()

    },
    onReset(event) {
      event.preventDefault()
      this.form = {
        email: '',
        password: ''
      }

    }
  }
}

</script>
<style scoped>
#registerArea {
  padding: 1em;
  max-width: 30em;
}
</style>
