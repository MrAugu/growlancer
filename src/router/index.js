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
    path: "/commands",
    name: "Commands",
    component: () => import("../views/Commands.vue")
  },
  {
    path: "/dashboard/:id/custom-commands",
    name: "Command Settings",
    component: () => import("../views/Command.vue")
  },
  {
    path: "/dashboard/:id/punishments",
    name: "Punishments Settings",
    component: () => import("../views/Punishments.vue")
  },
  {
    path: "/dashboard/:id/security",
    name: "Security Settings",
    component: () => import("../views/Security.vue")
  },
  {
    path: "/dashboard/:id/logging",
    name: "Logger Settings",
    component: () => import("../views/Logger.vue")
  },
  {
    path: "/dashboard/:id/welcomer",
    name: "Welcomer Settings",
    component: () => import("../views/Welcomer.vue")
  },
  {
    path: "/dashboard/:id/automod",
    name: "Automod Settings",
    component: () => import("../views/Automod.vue")
  },
  {
    path: "/dashboard/:id/general",
    name: "General Settings",
    component: () => import("../views/General.vue")
  },
  {
    path: "/dashboard/:id",
    name: "Menu",
    component: () => import("../views/Menu.vue")
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () => import("../views/Dashboard.vue")
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
