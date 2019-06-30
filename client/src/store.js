import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

let admins = ['admin@ecommerce.com', 'admin1@ecommerce.com', 'admin2@ecommerce.com']
// /users /cart /products
const store = new Vuex.Store({
  state: {
    baseURL: 'http://localhost:3000',
    loggedIn: false,
    currentUser: { name: '', email: '' },
    currentCart: null,
    access_token: '',
    products: [],
    addProduct: false,
    isAdmin: false,
    errMsg: ''
  },
  mutations: {
    toggleAddProduct (state) {
      state.addProduct = !state.addProduct
    },
    SHOWERROR (state, payload){
      state.errMsg = payload
    },
    INITSTORE (state) {
      if (localStorage.getItem('store')) {
        this.replaceState(
          Object.assign(state, JSON.parse(localStorage.getItem('store')))
        )
      }
    },
    LOGOUT (state) {
      // console.log('logout mutation')
      state.loggedIn = false
      state = null
      localStorage.clear()
    },
    SAVEUSERLOGIN (state, payload) {
      if (admins.includes(payload.email)) {
        state.isAdmin = true
      }
      state.loggedIn = true
      state.currentUser = {
        name: payload.name,
        email: payload.email,
        address: payload.address
      }
      state.access_token = payload.access_token
    },
    UPDATEPRODUCTS (state, payload) {
      state.products = payload
    },
    UPDATECART (state, payload) {
      state.currentCart = payload
      // console.log({ cart: payload })
    }
  },
  actions: {
    addProduct (context, payload) {
      let { state, commit, dispatch } = context
      axios.post(state.baseURL + '/products',
        payload,
        { headers:
          { access_token: state.access_token }
        })
        .then(({ data }) => {
          dispatch('getProducts')
        })
        .catch(({ response }) => {
          // console.log(response)
          commit('SHOWERROR', response.data)
        })
    },
    editProduct (context, payload) {
      // payload is:
      // form: {
      //   id: 'product id'
      //   name: 'new name',
      //   image: 'new image url',
      //   price: 0,
      //   stock: 0,
      //   oldImage: 'old image url'
      // }
      let uploadData = {
        name: payload.name,
        image: payload.image,
        price: payload.price,
        stock: payload.stock
      }
      let { state, commit, dispatch } = context
      axios.patch(state.baseURL + '/products/' + payload.id,
        uploadData,
        { headers:
          { access_token: state.access_token }
        })
        .then(({ data }) => {
          // successfully updated product,
          // delete payload.oldImage from gcs
          dispatch('deleteImageFromGCS', payload.oldImage)
          dispatch('getProducts')
        })
        .catch(({ response }) => {
          // fail to update product,
          // delete new image payload.image from gcs
          dispatch('deleteImageFromGCS', payload.image)
          // console.log(response)
          commit('SHOWERROR', response.data)
        })
    },
    deleteImageFromGCS (context, payload) {
      let { state, commit } = context
      axios.post(state.baseURL + '/products/deleteImage',
        { imageURL: payload },
        { headers:
          { access_token: state.access_token }
        })
        .then(({ data }) => {
          // successfully deleted image from gcs
          console.log({ imageDeletedFromGCS: payload })
        })
        .catch(({ response }) => {
          // fail to delete image from gcs
          // console.log(response)
          commit('SHOWERROR', response.data)
        })
    },
    takeFromCart (context, payload) {
      let { state, commit, dispatch } = context
      if (!state.currentCart) {
        dispatch('getCart')
        console.log('getting cart for user')
      } else {
        axios.patch(state.baseURL + '/cart/del',
          { productId: payload },
          { headers:
            { access_token: state.access_token }
          })
          .then(({ data }) => {
            // console.log({ takeFromCart: data })
            dispatch('getCart')
          })
          .catch(({ response }) => {
            // console.log('error at dec 1 item from cart:', response)
            commit('SHOWERROR', response.data)
          })
      }
    },
    addToCart (context, payload) {
      let { state, commit, dispatch } = context
      // add to cart, check user's cart
      if (!state.currentCart) {
        dispatch('getCart')
        console.log('creating cart for user')
      } else {
        axios.patch(state.baseURL + '/cart/add',
          { productId: payload },
          { headers:
            { access_token: state.access_token }
          })
          .then(({ data }) => {
            // console.log({ addToCart: data })
            dispatch('getCart')
          })
          .catch(({ response }) => {
            // console.log('error at inc 1 item to cart:', response)
            commit('SHOWERROR', response.data)
          })
      }
    },
    getProducts (context) {
      let { state, commit } = context
      // console.log('getProducts')
      axios.get(state.baseURL + '/products',
        {
          headers: {
            access_token: state.access_token
          }
        })
        .then(({ data }) => {
          // console.log({getProducts: data})
          commit('UPDATEPRODUCTS', data)
        })
        .catch(({ response }) => {
          // console.log('error loading products: ', response)
          commit('SHOWERROR', response.data)
        })
    },
    createCart (context) {
      let { state, commit, dispatch } = context
      axios.post(state.baseURL + '/cart', {},
        {
          headers: {
            access_token: state.access_token
          }
        })
        .then(({ data }) => {
          // console.log('created cart for user')
          dispatch('getCart') // get populated cart
        })
        .catch(({ response }) => {
          // console.log('error creating cart for user: ', response)
          commit('SHOWERROR', response.data)
        })
    },
    getCart (context) {
      let { state, commit, dispatch } = context
      axios.get(state.baseURL + '/cart',
        {
          headers: {
            access_token: state.access_token
          }
        })
        .then(({ data }) => {
          if (!data) { // if user has no default cart (status ""), create one
            dispatch('createCart')
            // console.log('creating new cart for user')
          } else {
            // console.log('retrieved cart for user: ', data)
            commit('UPDATECART', data)
          }
        })
        .catch(({ response }) => {
          // console.log('error retrieving cart for user: ', response)
          commit('SHOWERROR', response.data)
        })
    }
  }
})

store.subscribe((mutation, state) => {
  if (state.loggedIn) localStorage.setItem('store', JSON.stringify(state))
})

export default store
