<template >
    <v-container fluid  id="Explorar">
        <v-row>
            <v-col>
                <h1>Explorar</h1>
                <p class="text--secondary"> Descubre rutinas de otros entrenadores</p>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="3">
                <v-select
                :items="filters"
                label="Filtrar"
                dense
                outlined
                ></v-select>
            </v-col>
            <v-col cols="3">
                <v-select
                :items="categories"
                label="Categorias"
                dense
                outlined
                ></v-select>
            </v-col>
        </v-row>

        <hr>

        <!-- <v-skeleton-loader
          v-bind="attrs"
          type="article"
        ></v-skeleton-loader> -->

    <div class="ma-3" v-for="routine in routines" :key="routine">
        <v-card
            elevation="4"
            outlined
            @click="alerta"
        >
        <v-card-title>{{ routine.name }}</v-card-title>       
        <v-card-subtitle>
          <v-icon>mdi-account</v-icon>
          <span>{{ routine.trainer }}</span>
          
        </v-card-subtitle>
        <v-card-text>
            <h3>Duracion: </h3>20 min  FIJARSE PARA QUE QUEDE AL COSTADO
            <h3>Descripcion: </h3> {{ routine.desc }} 
            <h3>Materiales:</h3> -
        </v-card-text>
        </v-card>
    </div>
        
    </v-container>
</template>


<script>
//import { UserApi } from '../api/user'
//const axios = require('axios').default;
//import router from '../router/index'
export default {
    data(){
        return{
            categories: ["Cat 1" ,"Cat 2", "Cat 3"],
            filters: ["Deporte", "Duracion", "Puntuacion"],
            routines: [
                     {name:"Rutina 1", trainer:"Entrenador Horacio", desc: "Ejemplo de como se verian las cards estas con la info de la API. Solo a modo de ejemplo. Luego ver como poner la informacion real"},
                     {name:"Rutina 2", trainer:"Entrenador Tato", desc: "Ejemplo de como se verian las cards estas con la info de la API. Solo a modo de ejemplo. Luego ver como poner la informacion real"},
                //     {name:"Rutina 3", trainer:"Entrenador Jose Luis", desc: "Ejemplo de como se verian las cards estas con la info de la API. Solo a modo de ejemplo. Luego ver como poner la informacion real"},
                //     {name:"Rutina 4", trainer:"Entrenador Paco", desc: "Ejemplo de como se verian las cards estas con la info de la API. Solo a modo de ejemplo. Luego ver como poner la informacion real"},
                //     {name:"Rutina 5", trainer:"Entrenadora Leticia ", desc: "Ejemplo de como se verian las cards estas con la info de la API. Solo a modo de ejemplo. Luego ver como poner la informacion real"}
                
                 ]
        }
    }
}
</script>

