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

<div v-if="routinesE && routinesE.length > 0">
    <div class="ma-3" v-for="(routine, index) in routinesE" :key="index">
      <!-- cuando clickeo, tengo que llamar a los getters(routine.id) y luego cuando estoy dentro del dialogo, haer v-if cycles y eso tan vacios o no... -->
      <v-card elevation="4" outlined @click="saveIndex(index)">
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
    </div>
</div>
<div v-else>
  Parece que hay rutinas aun.
</div>

     <v-dialog  v-model="routineDialog" @click:outside="routineDialog = !routineDialog" width="600px">
        <div v-if="routinesE && routinesE.length > 0">
                    <v-card>
                      <v-app-bar flat dark color="#2d2d2a"> 
                        <v-toolbar-title> <h1>{{ routinesE[this.index].name }} </h1> </v-toolbar-title>
                      </v-app-bar>
                      
                      <v-card-title>
                          <v-icon>mdi-account</v-icon>
                          Creado por {{ routinesE[index].creator.username }}
                      </v-card-title>
                      <v-card-subtitle>
                        Descripción:
                      </v-card-subtitle>
                        <v-card-text>
                          {{ routinesE[index].detail }} 
                                
                                    
                        </v-card-text>   
                    </v-card>
        </div>
      </v-dialog> 

  
    

    
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
      routineDialog: false,
      index: 0,
      exercises: [],
      cycles: []
    };
  },
  created: function () {
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
      saveIndex: function(index){
              this.routineDialog = !this.routineDialog
              this.index = index;
              console.log("HOLAAAAAAA");
              console.log(this.routinesE);
              console.log(this.index);        
      },
      getRoutineCycles(id){
        this.axios.get(UserApi.baseUrl + "/routines/" + id + "/cycles")
        .then(response => {
          this.cycles = response.data.results;
        }).catch(error => {
          console.log(error.description);
          
        })
      }

    }
   
}
</script>