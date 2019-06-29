import Vue from 'vue'
import Vuex from 'vuex'
// import db from './config/firebase'
import axios from 'axios'
Vue.use(Vuex)

let admins = ["admin@ecommerce.com", "admin1@ecommerce.com", "admin2@ecommerce.com"]
// /users /cart /products
const store = new Vuex.Store({
  state: {
    baseURL: 'http://localhost:3000',
    loggedIn: false,
    currentUser: { name: '', email: '' },
    access_token: '',
    products: [],
    addProduct: false
  },
  mutations: {
    toggleAddProduct(state) {
      state.addProduct = state.addProduct ? false : true
    },
    INITSTORE(state) {
      if (localStorage.getItem('store')) {
        this.replaceState(
          Object.assign(state, JSON.parse(localStorage.getItem('store')))
        )
      }
    },
    LOGOUT(state) {
      console.log("logout mutation")
      state.loggedIn = false
      state = null
      localStorage.clear()
    },
    SAVEUSERLOGIN(state, payload) {
      if (admins.includes(payload.email)){
        state.isAdmin = true
      }
      state.loggedIn = true
      state.currentUser = { 
        name: payload.name, 
        email: payload.email,
        address: payload.address 
      }
      state.access_token = payload.access_token
    }
  },
  getters: {},
  actions: {
    addProduct(context, payload){
      let {state, dispatch} = context
      console.log("store att product, "+state.baseURL+ '/products')
      // router.post('/', controllerProduct.create)
      axios.post(state.baseURL+'/products',
        payload, 
        {headers: 
          {access_token: state.access_token}
        })
      .then(({data}) => {
        console.log(data)
        dispatch('getProducts')
      })
      .catch(({response}) => {
        console.log(response)
      })
    },
    addToCart(context, payload) {
      let { state, commit, dispatch } = context
      //add to cart, check user's cart
      axios.patch(state.baseURL+'/cart/add', 
        {productId: payload}, 
        {headers: 
          {access_token: state.access_token}
        })
        .then( ({data}) => {
          console.log('add cart result:', data)
        })
        .catch( ({response}) => {
          console.log('error at add cart:', response)
        })
    },
    getProducts(context){
      let {state, commit, dispatch} = context
      //router.get('/', controllerProduct.findAll)
      axios.get(state.baseURL+'/products', {headers: {access_token: state.access_token}})
      .then(({data}) => {
        state.products = data
      })
      .catch( ({response}) => {
        console.log('error loading products: ', response)
      })
    }
  }
})

store.subscribe((mutation, state) => {
  if (state.loggedIn) localStorage.setItem('store', JSON.stringify(state))
})

export default store
