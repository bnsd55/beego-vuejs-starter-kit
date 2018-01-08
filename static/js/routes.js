import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './components/Home'
Vue.use(VueRouter)

const routes = [
  { path: '/', component: Home, name: 'Home' }
]

const router = new VueRouter({
  mode: 'history',
  routes,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

export default router
