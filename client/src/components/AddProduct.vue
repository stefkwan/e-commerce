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
    <b-form-file
      v-model="form.image"
      :state="Boolean(form.image)"
      placeholder="Choose a file..."
      drop-placeholder="Drop file here..."
      required
    ></b-form-file>
    <div class="mt-3">Selected form.image: {{ form.image ? form.image.name : '' }}</div>
    <!-- 
      <b-form-input
        id="image"
        v-model="form.image"
        type="text"
        required
      ></b-form-input> -->
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
      dismissSecs: 120,
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
      console.log("add product component onSubmit ---")
      // process form.image from file to url

      console.log("sebelum image")
      const image = this.form.image

      console.log("sebelum dataToUpload")
      let dataToUpload = new FormData();
      dataToUpload.append('name', 'my-picture');
      dataToUpload.append('image', image);

      console.log({baseURL: this.$store.state.baseURL})
      let baseURL = this.$store.state.baseURL
      let access_token = this.$store.state.access_token

      console.log(access_token)

      // axios.post(baseURL+'/products/uploadImage', this.form)
      //   .then( ({data}) => {
      //     console.log('login result:', data)
      //     //get user detail
      //     commit('SAVEUSERLOGIN', 
      //       { name: data.name, 
      //         email: this.form.email,
      //         address: data.address,
      //         access_token: data.access_token
      //       })
      //     this.goToHome()
      //   })
      //   .catch( ({response}) => {
      //     console.log('error at user login:', response)
      //     this.showAlert(response.data)
      //   })

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
        console.log("uploaded an image")
        console.log(data)
        console.log("-------------------was that the link?------")
        this.form.image = data
        localStorage.setItem("imageToUpload", data)
        this.$store.dispatch('addProduct', this.form)
        this.onReset()
      })
      .catch(({response}) => {
        console.log("created error:",response)
        this.showAlert(response)
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
