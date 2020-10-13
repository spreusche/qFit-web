import Vue from 'vue'
import VueRouter from 'vue-router'
import Explorar from '../components/Explorar'
import MisRutinas from '../components/MisRutinas'
import MisEjercicios from '../components/MisEjercicios'
import Principal from '../components/Principal'
import EditarPerfil from '../components/EditarPerfil'
import Notificaciones from '../components/Notificaciones'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Principal',
    component: Principal
  },
  {
    path: '/Explorar',
    name: 'Explorar',
    component: Explorar
  },
  {
    path: '/MisRutinas',
    name: 'MisRutinas',
    component: MisRutinas
  },
  {
    path: '/MisEjercicios',
    name: 'MisEjercicios',
    component: MisEjercicios
  },
  {
    path: '/EditarPerfil',
    name: 'EditarPerfil',
    component: EditarPerfil
  },
  {
    path: '/Notificaciones',
    name: 'Notificaciones',
    component: Notificaciones
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
