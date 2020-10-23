import Vue from 'vue'
import VueRouter from 'vue-router'
import Explorar from '../components/Explorar'
import MisRutinas from '../components/MisRutinas'
import MisEjercicios from '../components/MisEjercicios'
import Principal from '../components/Principal'
import EditarRutina from '../components/EditarRutina'
import CrearEjercicio from '../components/CrearEjercicio'
import TablaEjercicios from '../components/TablaEjercicios'
import axios from 'axios'

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
    component: Explorar,
    meta: {requiresAuth:true}

  },
  {
    path: '/MisRutinas',
    name: 'MisRutinas',
    component: MisRutinas,
    meta: {requiresAuth:true}
  },

  {
    path: '/EditarRutina/:id',
    name: 'EditarRutina',
    component: EditarRutina,
    meta: {requiresAuth:true}
  },
  {
    path: '/MisEjercicios',
    name: 'MisEjercicios',
    component: MisEjercicios,
    meta: {requiresAuth:true}
  },
  {
    //los ids para ver en donde se va a guardar el ej
    path: '/MisEjercicios/CrearEjercicio/:routineID/:cycleID',
    name: 'CrearEjercicio',
    component: CrearEjercicio,
    meta: {requiresAuth:true}
  },
  {
    //id es la rutina, num es si es entrada en calor ppal o cooldown, y con esos dos podes sacar el cycleID
    path: '/TablaEjercicios/:id/:num',
    name: 'TablaEjercicios',
    component: TablaEjercicios,
    meta: {requiresAuth:true}
  }
]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// // Para lo de navegacion segura
 router.beforeEach((to, from, next) => {
//   // lo que hace esta constante booleana es preguntar si cada
//   // ruta requiere autenticacion
   const routeAuth = to.matched.some(record => record.meta.requiresAuth);
//   // para ver si el usuario hizo el login
   const token = localStorage.getItem("token");
//
    if(token!=null){
      axios.defaults.headers.common[
        "Authorization"
      ] = `bearer ${localStorage.getItem("token")}`;
    }
   if(routeAuth && token == null){
     next({name:'Principal'});
   } else {
     next();
   }
 });

export default router
