import Vue from 'vue'
import Vuex from 'vuex'
// import db from './config/firebase'
import axios from 'axios'
Vue.use(Vuex)

// /users /cart /products
const store = new Vuex.Store({
  state: {
    baseURL: 'http://localhost:3000',
    loggedIn: false,
    currentUser: { name: '', email: '' },
    access_token: ''
  },
  mutations: {
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
      state = {
        baseURL: 'http://localhost:3000',
        loggedIn: false,
        currentUser: { name: '', email: '', address: '' },
        access_token: ''
      }
      localStorage.clear()
    },
    SAVEUSERLOGIN(state, payload) {
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
    addToCart(context, payload) {
      let { state, commit, dispatch } = context

    }
  }
})

store.subscribe((mutation, state) => {
  if (state.loggedIn) localStorage.setItem('store', JSON.stringify(state))
})

export default store
