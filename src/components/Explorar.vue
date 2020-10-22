<template >
  <v-container fluid id="Explorar">
    <v-row>
      <v-col>
        <h1>Explorar</h1>
        <p class="text--secondary">Descubre rutinas de otros entrenadores</p>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="3">
        <v-select :items="filters" label="Filtrar" dense outlined></v-select>
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

    <hr/>


    <div class="ma-3" v-for="(routine, index) in routinesE" :key="index">
      <v-card elevation="4" outlined @click="routineDialog[index] = true">
        <v-card-title>{{ routine.name }}</v-card-title>
        <v-card-subtitle>
          <v-icon>mdi-account</v-icon>
          <span>{{ routine.creator.username }}</span>
        </v-card-subtitle>
        <v-card-text>
          <h3>Descripción:</h3>
          <p>{{ routine.detail }}</p>
          <h3>Duración:</h3>
          <p>{{ routine.duracion }}</p>

          <h3>Materiales:</h3>
          <p>-</p>
          <h3>Dificultad:</h3>
          <p>{{ routine.difficulty }}</p>
        </v-card-text>
      </v-card>
    
    <v-dialog v-model="routineDialog[index]" width="600px">
            <template v-slot:activator="{ on, attrs }">
            <v-btn color="#00e140" dark v-bind="attrs" v-on="on">
                Más Información
            </v-btn>
            </template>
            <v-card>
            <v-app-bar flat dark color="#2d2d2a"> </v-app-bar>
            <v-card-title>
                <span class="headline">{{ routine.name }}</span> 
            </v-card-title>
            <v-card-subtitle>
            Creado por {{ routine.creator.username }} 
            </v-card-subtitle>

            <v-card-text>
               {{ routine.detail }}
            </v-card-text>
            </v-card>
        </v-dialog>
    </div>
    
<!-- 
@click="[routineDialog[index]=true , cc()]"

<template v-for="(r, i) in routinesE">
        <v-dialog v-model="routineDialog[i]" width="600px" :key="r.id">
            <v-card elevation="0">
            <v-app-bar flat dark color="#2d2d2a"> </v-app-bar>
            <v-card-title>
                <span class="headline">{{ routinesE[i].name }}</span>
            </v-card-title>

            <v-card-text>
                Lorem ipsum dolor sit amet, semper quis, sapien id natoque elit.
                Nostra urna at, magna at neque sed sed ante imperdiet, lorem
            </v-card-text>
            </v-card>
        </v-dialog>
</template> -->
    

    
  </v-container>
</template>


<script>
import { UserApi } from "../api/user";
//const axios = require('axios').default;
//import router from '../router/index'
export default {
  data() {
    return {
      categories: ["Cat 1", "Cat 2", "Cat 3"],
      filters: ["Deporte", "Duracion", "Puntuacion"],
      routinesE: [],
      routineDialog: [],
      wanted: Number,
      i: Number
    };
  },
  beforeCreate: function () {
console.log("DSADASD");
        this.axios
        .get(UserApi.baseUrl + "/routines/")
        .then((response) => {
            console.log(response.data.results);
            this.routinesE = response.data.results;
            console.log(this.routinesE[0].creator.username);

        for(this.i = 0; this.i < this.routinesE.length; this.i++){
            this.routineDialog[this.i] = false;
        }
        })
        .catch(() => console.log("Error al obtener los datos de rutinas"));


       
    },
    methods:{
    cc: function(){
             console.log(this.routineDialog[0]);
        }

    }
   
}
</script>

