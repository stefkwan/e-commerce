import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App.vue'
import router from './router'
// import cors from 'cors'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
// import db from './config/firebase'
import store from './store'

Vue.config.productionTip = false
Vue.use(BootstrapVue)
// Vue.use(db)
Vue.mixin({
  methods: {
    formatNumber(num) {
	  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
	}
  }
})

new Vue({
  router,
  store,
  beforeCreate () {
    this.$store.commit('INITSTORE')
  },
  render: h => h(App)
}).$mount('#app')
