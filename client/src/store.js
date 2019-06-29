import Vue from 'vue'
import Vuex from 'vuex'
// import db from './config/firebase'
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
    isAdmin: false
  },
  mutations: {
    toggleAddProduct (state) {
      state.addProduct = !state.addProduct
    },
    INITSTORE (state) {
      if (localStorage.getItem('store')) {
        this.replaceState(
          Object.assign(state, JSON.parse(localStorage.getItem('store')))
        )
      }
    },
    LOGOUT (state) {
      console.log('logout mutation')
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
      console.log({ cart: payload })
    }
  },
  getters: {},
  actions: {
    addProduct (context, payload) {
      let { state, dispatch } = context
      axios.post(state.baseURL + '/products',
        payload,
        { headers:
          { access_token: state.access_token }
        })
        .then(({ data }) => {
          dispatch('getProducts')
        })
        .catch(({ response }) => {
          console.log(response)
        })
    },
    takeFromCart(context, payload){
      let {state, commit, dispatch} = context
      if(!state.currentCart){
        dispatch('getCart')
        console.log('getting cart for user')
      } else {
        axios.patch(state.baseURL + '/cart/del',
          { productId: payload },
          { headers:
            { access_token: state.access_token }
          })
          .then(({ data }) => {
            console.log({takeFromCart: data})
            dispatch('getCart')
          })
          .catch(({ response }) => {
            console.log('error at dec 1 item from cart:', response)
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
            console.log({addToCart: data})
            dispatch('getCart')
          })
          .catch(({ response }) => {
            console.log('error at inc 1 item to cart:', response)
          })
      }
    },
    getProducts (context) {
      let { state, commit, dispatch } = context
      console.log('getProducts')
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
          console.log('error loading products: ', response)
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
          console.log('created cart for user')
          dispatch('getCart') //get populated cart
        })
        .catch(({ response }) => {
          console.log('error creating cart for user: ', response)
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
            console.log('creating new cart for user')
          } else {
            console.log('retrieved cart for user: ', data)
            commit('UPDATECART', data)
          }
        })
        .catch(({ response }) => {
          console.log('error retrieving cart for user: ', response)
        })
    }
  }
})

store.subscribe((mutation, state) => {
  if (state.loggedIn) localStorage.setItem('store', JSON.stringify(state))
})

export default store
