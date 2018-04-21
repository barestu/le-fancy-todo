import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false
Vue.prototype.$baseUrl = 'http://localhost:4000'

let token = localStorage.getItem('token')

if (token) {
  Vue.prototype.$isLogin = true
} else {
  Vue.prototype.$isLogin = false
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
