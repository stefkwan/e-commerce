<template>
<div class="product d-inline-flex flex-column">
  <!-- name image price stock -->
  <b-card class="mb-1 overflow-hidden" style="width: 12rem;" :img-src="imagePreview">
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
      ></b-form-file>
      <div class="mt-3">Selected Image: {{ form.image ? form.image.name : '' }}</div>
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

      <b-button class="m-1" type="submit" variant="primary">Update Product</b-button>
      <b-button class="m-1" type="reset" variant="secondary">Cancel</b-button>
      <br/>
    </b-form>
  </b-card>
</div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'EditProduct',
  data () {
    return {
      form: {
        id: '',
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
  props: ['oldform'],
  created () {
    // deep copy initial values
    this.form.id = this.oldform._id
    this.form.name = this.oldform.name+''
    this.form.image = this.oldform.image+''
    this.form.price = this.oldform.price+0
    this.form.stock = this.oldform.stock+0
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
      if (this.form.image == this.oldform.image){
        // if form.image is not changed, it is still a url, skip uploading new image file to gcs
        this.form.oldImage = this.oldform.image
        this.$store.dispatch('editProduct', this.form)
        this.onReset()
        this.loading = false
      } else {
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
          this.form.oldImage = this.oldform.image
          this.$store.dispatch('editProduct', this.form)
          this.onReset()
          this.loading = false
        })
        .catch(({response}) => {
          console.log("created error:",response)
          this.showAlert(response)
          this.loading = false
        })
      }
    },
    onReset(){
      this.form = {
        name: '',
        image: '',
        price: 0,
        stock: 0
      }
      this.$emit('toggleEditProduct')
    }
  }
}

</script>
<style scoped>
</style>
