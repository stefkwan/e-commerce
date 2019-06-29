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
    currentUserName: '',
    access_token: ''
  },
  mutations: {
    INITSTORE(state){
      if(localStorage.getItem('store')){
        this.replaceState(
          Object.assign(state, JSON.parse(localStorage.getItem('store')))
        )
      }
    },
    SAVEUSERLOGIN (state, payload) {
      state.loggedIn = true
      state.currentUserName = payload.name
      state.access_token = payload.access_token
    }
  },
  getters: {},
  actions: {
  	addToCart (context, payload){
  		let {state, commit, dispatch} = context

  	}
  }
})

store.subscribe((mutation, state) => {
  localStorage.setItem('store', JSON.stringify(state))
})

export default store