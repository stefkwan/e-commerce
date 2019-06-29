<template>
<div class="product d-inline-flex flex-column">
  <!-- name image price stock -->
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
  <b-form @submit.prevent="onSubmit" @reset.prevent="onReset">
    <b-form-group
      id="group-name"
      label="Product Name:"
      label-for="name"
    >
      <b-form-input
        id="name"
        v-model="form.name"
        type="text"
        required
        placeholder="Enter Product Name"
      ></b-form-input>
    </b-form-group>

    <b-form-group
      id="group-image"
      label="Image URL:"
      label-for="image"
    >
      <b-form-input
        id="image"
        v-model="form.image"
        type="text"
        required
      ></b-form-input>
    </b-form-group>

    <b-form-group
      id="group-price"
      label="price"
      label-for="price"
    >
      <b-form-input
        id="price"
        v-model="form.price"
        type="number"
        required
      ></b-form-input>
    </b-form-group>

    <b-form-group
      id="group-stock"
      label="stock:"
      label-for="stock"
    >
      <b-form-input
        id="stock"
        v-model="form.stock"
        type="number"
        required
      ></b-form-input>
    </b-form-group>

    <b-button class="m-1" type="submit" variant="primary">Add Product</b-button>
    <b-button class="m-1" type="reset" variant="secondary">Cancel</b-button>
    <br/>
  </b-form>
</div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'AddProduct',
  data () {
    return {
      form: {
        name: '',
        image: '',
        price: 0,
        stock: 0
      },
      dismissSecs: 10,
      dismissCountDown: 0,
      errorMsg: ''
    }
  },
  created () {},
  methods: {
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
    showAlert(msg) {
      this.dismissCountDown = this.dismissSecs
      this.errorMsg = msg
    },
    onSubmit () {
      console.log("add product component onSubmit")
      this.$store.dispatch('addProduct', this.form)
    },
    onReset(){
      this.form = {
        name: '',
        image: '',
        price: 0,
        stock: 0
      }
      this.$store.commit('toggleAddProduct')
    }
  }
}

</script>
<style scoped>
</style>
