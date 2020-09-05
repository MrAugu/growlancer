import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/legal",
    name: "Legal",
    component: () => import("../views/Legal.vue")
  },
  {
    path: "/account",
    name: "Account",
    component: () => import("../views/Account.vue")
  },
  {
    path: "*",
    name: "Error",
    component: () => import("../views/Error.vue")
  }
]

const router = new VueRouter({
  mode: "history",
  routes
})

export default router
