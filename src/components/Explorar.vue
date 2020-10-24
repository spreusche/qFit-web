
<template >
  <v-container fluid id="Explorar">
    <v-row>
      <v-col>
        <h1>Explorar</h1>
        <p class="text--secondary">Descubre rutinas de otros entrenadores</p>
      </v-col>
    </v-row>

    <hr/>

    <v-row>
      <v-col cols="2">

        <v-select :items="filters" label="Filtrar" dense outlined v-model="difficulty" item-text="spanish" item-value="id"></v-select>

      </v-col>
      <v-col cols="2">
        <v-select :items="orderBy" label="Ordenar Por" dense outlined v-model="order" item-text="spanish" item-value="id"></v-select>
      </v-col>
      <v-col cols="2">
        <v-select :items="ascOrDesc" label="Orden" dense outlined v-model="direction" item-text="spanish" item-value="id"></v-select>
      </v-col>
      <v-col>
        <v-btn icon color="orange" @click="update">
          <v-icon>mdi-cached</v-icon>
        </v-btn>
      </v-col>
    </v-row>

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
        </v-card-text>
      </v-card>
    </div>
</div>
<div v-else>
  Parece que no hay rutinas aun.
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
<hr/>
                      <v-card-subtitle>
                        <h2><u>Descripción:</u></h2>
                      </v-card-subtitle>
                        <v-card-text>
                          {{ routinesE[index].detail }}
                        </v-card-text>
<hr/>
                      <template v-if="!errorOccured">

                      <v-card-subtitle> <h2><u>Ejercicios que encontrará en esta rutina:</u></h2></v-card-subtitle>

                          <div v-for="(exercises, index) in exerciseArray" :key="index + 'd'">
                            <template v-for="(exercise, index2) in exercises">
                              <v-card-text :key="index2 + 'f'">
                                <v-card-subtitle>
                               <h3><u> {{ exercise.name }} </u></h3>
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
                        <h2 style="color:red;">
                        OH NO! Algo salió mal al cargar esta rutina.
                        Intentalo de nuevo.
                      </h2> <!--Esto contempla ambos ciclos y ejercicios -->
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
      filters: [
        {id:"", spanish:""}, {id:"rookie", spanish:"Novato"}, {id:"begginer", spanish:"Principiante"}, {id:"intermediate", spanish:"Intermedio"}, {id:"advanced", spanish:"Avanzado"}, {id:"expert", spanish:"Experto"}
      ],
      difficulty: "",
      orderBy: [
        {id:"", spanish:""}, {id:"id", spanish:"ID"}, {id:"name", spanish:"Nombre"}, {id:"detail", spanish:"Detalles"}, {id:"dateCreated", spanish:"Fecha de creación"}, {id:"averageRating", spanish:"Rating"}, {id:"difficulty", spanish:"Dificultad"}, {id:"categoryID", spanish:"Categoría"}, {id:"creatorID", spanish:"Creador"}
      ],
      order: "",
      ascOrDesc: [
        {id:"", spanish:""}, {id:"asc", spanish:"Ascendiente"}, {id:"desc", spanish:"Descendiente"}
      ],
      direction: "",
      queryFilters: "",

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

    if(this.$route.params.query != null){
      this.queryFilters = "search=" + this.$route.params.query;7
    } else {
      this.queryFilters = "";
    }

        this.axios
        .get(UserApi.baseUrl + "/routines/?" + this.queryFilters)
        .then((response) => {
            this.routinesE = response.data.results;

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
        this.axios.get(UserApi.baseUrl + "/routines/" + id + "/cycles")
        .then(response => {
          this.cycles = response.data.results;

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
        this.getRoutineCycles(id);

        if(this.cycles.length > 0){
          for(this.i = 0; this.i < this.cycles.length; this.i++){
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

      },

      update: function() {
        this.queryFilters="";

        if(this.$route.params.query != null){
          this.queryFilters = "search=" + this.$route.params.query;7
        } else {
          this.queryFilters = "";
        }


        if(this.order != ""){
          if(this.queryFilters != ""){
            this.queryFilters = this.queryFilters + "&";
          }
          this.queryFilters = this.queryFilters + "orderBy=" + this.order;
        }
        if(this.direction != ""){
          this.queryFilters = this.queryFilters + "&direction=" + this.direction;
        }
        this.queryFilters=this.queryFilters + "&size=9999";

        this.axios
            .get(UserApi.baseUrl + "/routines/?" + this.queryFilters)
            .then((response) => {
              this.routinesE = response.data.results;

              for(this.i = 0; this.i < this.routinesE.length; this.i++){
                this.routineDialog[this.i] = false;
              }
            })
            .catch(() => console.log("Error al obtener los datos de rutinas"));

      }
    }
}
</script>

