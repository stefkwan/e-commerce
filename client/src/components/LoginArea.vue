<template>
  <div id="loginArea" class="d-inline-flex flex-column">
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
export default {
  name: 'LoginArea',
  data() {
    return {
      form: {
        email: '',
        password: '',
        checked: []
      },
    }
  },
  created() {},
  methods: {
    onSubmit(event) {
      event.preventDefault()

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
