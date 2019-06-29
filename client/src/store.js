import Vue from 'vue'
import Vuex from 'vuex'
// import db from './config/firebase'
import axios from 'axios'
Vue.use(Vuex)

const baseURL = 'http://localhost:3000/'
// /users /cart /products

export default new Vuex.Store({
  state: {
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
