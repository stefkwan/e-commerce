import Vue from 'vue'
import Vuex from 'vuex'
// import db from './config/firebase'
import axios from 'axios'
Vue.use(Vuex)

// /users /cart /products
export default new Vuex.Store({
  state: {
    baseURL: 'http://localhost:3000',
  	loggedIn: false
  },
  mutations: {
  },
  actions: {
  	addToCart (context, payload){
  		let {state, commit, dispatch} = context

  	}
  }
})
