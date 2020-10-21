import Vue from 'vue'
import VueRouter from 'vue-router'
import Explorar from '../components/Explorar'
import MisRutinas from '../components/MisRutinas'
import MisEjercicios from '../components/MisEjercicios'
import Principal from '../components/Principal'

import { UserApi } from '../api/user'

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
   // meta: {requiresAuth:true}
    
  },
  {
    path: '/MisRutinas',
    name: 'MisRutinas',
    component: MisRutinas,
   // meta: {requiresAuth:true}
  },
  {
    path: '/MisEjercicios',
    name: 'MisEjercicios',
    component: MisEjercicios,
   // meta: {requiresAuth:true}
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
   const token = UserApi.token;
//   //console.log(token + "HOLAAAAAAAA");
   if(routeAuth && token == null){
     next({name:'Principal'});
   } else {
     next();
   }
 });

export default router
