// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Mint from 'mint-ui'
import 'mint-ui/lib/style.min.css'
import axios from 'axios'
import App from './App'
import router from './router'
import './assets/normalize.css'
Vue.config.productionTip = false
Vue.config.debug = true
Vue.use(Mint)
Vue.prototype.$http = axios
/* eslint-disable no-new */
new Vue({
  el: '#app', 
  router,
  Mint,
  components: { App },
  template: '<App/>'
})
