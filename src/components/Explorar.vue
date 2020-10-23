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
      <v-card elevation="4" outlined @click="[saveIndex(index), getRoutineInfo(routine.id)]">
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

      <v-dialog  v-model="routineDialog" @click:outside="[routineDialog = !routineDialog, errorOccured = false, cleanArrays()]" width="600px">
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

                      <template v-if="!errorOccured">

                        <v-card-text v-for="cycle in cycles" :key="cycle.id">
                            <v-card-subtitle>
                            {{ cycle.name }} 
                            </v-card-subtitle>
                            <v-card-text>
                            {{ cycle.detail }}
                            </v-card-text> 
                        </v-card-text>
                          <div v-for="(exercises, index) in exerciseArray" :key="index">
                            <template v-for="(exercise, index2) in exercises">
                              <v-card-text :key="index2">
                                <v-card-subtitle>
                                {{ exercise.name }}
                              </v-card-subtitle>
                              <v-card-text>
                                {{ exercise.detail }}
                              </v-card-text> 
                            </v-card-text>
                            </template>
                          </div>

                        

                      </template>
                      <template v-else>
                        <v-card-text>
                          OH NO! Algo salió mal al cargar esta rutina. Intentalo de nuevo. <!--Esto contempla ambos ciclos y ejercicios -->
                        </v-card-text>
                      </template>
                         
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
      exerciseArray: [],
      cycles: [],
      errorOccured: false,
      i: 0
    };
  },
  beforeCreate: function () {
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
      },
      getRoutineCycles(id){
console.log("CREMON");
console.log(UserApi.baseUrl + "/routines/" + id + "/cycles");
        this.axios.get(UserApi.baseUrl + "/routines/" + id + "/cycles")
        .then(response => {
          this.cycles = response.data.results;
console.log(this.cycles);
        }).catch(error => {
          console.log(error.description); 
        });
      },
      getRoutineExcercises(routineId, cycleId){

        this.axios.get(UserApi.baseUrl + "/routines/" + routineId + "/cycles/" + cycleId + "/exercises")
        .then(response => {
          this.exerciseArray.push(response.data.results); //pongo en ejercicios[] los ejercicios correspondientes al ciclo N de una rutina M
        }).catch(error => console.log(error.description));
      },
      getRoutineInfo(id){
        this.errorOccured = false;
        console.log("MARMOTA");
        console.log(id);
        this.getRoutineCycles(id);

        if(this.cycles.length > 0){
          for(this.i = 0; this.i < this.cycles.length; this.i++){
            console.log(this.cycles[this.i].id + "ERES AZUCAR AMARGOOOO");
            this.getRoutineExcercises(id, this.cycles[this.i].id);
          }
        }else{
          this.errorOccured = true;
        }

        if(this.cycles.length <= 0){
          this.errorOccured = true;
        }
      },
      cleanArrays: function(){ 
        this.exerciseArray = [];
      }
    }
}
</script>