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
  <div v-if="loading" class="spinner-border text-primary" role="status">
    <span class="sr-only">Loading...</span>
  </div>
  <b-form v-else @submit.prevent="onSubmit" @reset.prevent="onReset">
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
    <b-form-file
      v-model="form.image"
      :state="Boolean(form.image)"
      placeholder="Choose a file..."
      required
    ></b-form-file>
    <div class="mt-3">Selected Image: {{ form.image ? form.image.name : '' }}</div>
    <b-img thumbnail v-show="imagePreview" :src="imagePreview" alt="preview" height="240" width="240"></b-img>
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
      errorMsg: '',
      loading: false
    }
  },
  computed: {
    imagePreview(){
      if (typeof this.form.image == typeof "string"){
        return this.form.image
      } else {
        return URL.createObjectURL(this.form.image)
      }
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
    onSubmit () {
      // process form.image from file to url
      this.loading = true
      const image = this.form.image

      let dataToUpload = new FormData();
      dataToUpload.append('name', 'my-picture');
      dataToUpload.append('image', image);

      let baseURL = this.$store.state.baseURL
      let access_token = this.$store.state.access_token

      axios({
        method: "POST",
        url: baseURL+"/products/uploadImage",
        data: dataToUpload,
        headers:{
          "access_token": access_token,
          "Content-Type": "application/x-www-form-urlencoded"
        }
      })
      .then(({data}) => {
        this.form.image = data
        this.$store.dispatch('addProduct', this.form)
        this.onReset()
        this.loading = false
      })
      .catch(({response}) => {
        console.log("created error:",response)
        this.showAlert(response)
        this.loading = false
      })
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
