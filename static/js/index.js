import Vue from 'vue'
import App from './App'
import store from './store'
import router from './routes'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import 'css'

Vue.use(Buefy, {
  defaultIconPack: 'fa',
})

Vue.config.debug = process.env.NODE_ENV !== 'production'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
