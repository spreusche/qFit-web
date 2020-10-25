
<template >
  <v-container fluid id="Explorar">
    <v-row>
      <v-col>
        <h1>Explorar</h1>
        <p class="text--secondary">Descubre rutinas de otros entrenadores</p>
      </v-col>
    </v-row>


    <v-row>
      <v-col cols="2">

        <v-select :items="filters" @click="update"  label="Filtrar" dense outlined v-model="difficulty" item-text="spanish" item-value="id"></v-select>

      </v-col>
      <v-col cols="2">
        <v-select :items="orderBy" @click="update" label="Ordenar Por" dense outlined v-model="order" item-text="spanish" item-value="id"></v-select>
      </v-col>
      <v-col cols="2">
        <v-select :items="ascOrDesc" @click="update" label="Orden" dense outlined v-model="direction" item-text="spanish" item-value="id"></v-select>
      </v-col>
    </v-row>

    <hr/>

<div v-if="routinesE && routinesE.length > 0">
    <div class="ma-3" v-for="(routine, index) in routinesE" :key="index">
      <!-- cuando clickeo, tengo que llamar a los getters(routine.id) y luego cuando estoy dentro del dialogo, haer v-if cycles y eso tan vacios o no... -->
      <v-card elevation="4" outlined @click="getRoutineInfo(routine.id)">
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

      <v-dialog  v-model="routineDialog" @click:outside="[routineDialog = !routineDialog]" width="600px">
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
                      

                      <v-card-subtitle> <h2><u>Ejercicios que encontrará en esta rutina:</u></h2></v-card-subtitle>
                          <v-list>
                          <v-list-item><u>Entrada en calor:</u></v-list-item>

                            <v-list-item v-for="(name, index) in entrada" :key="index">
                                <h4>{{name}}:</h4> {{entradaD[index]}}
                            </v-list-item>

                            <v-list-item><u>Ejercitación principal:</u></v-list-item>
                            <v-list-item v-for="(name, index) in ppal" :key="index">
                                <h4>{{name}}:</h4> {{ppalD[index]}}
                            </v-list-item>


                            <v-list-item><u>Enfriamiento:</u></v-list-item>
                            <v-list-item v-for="(name, index) in enfriamiento" :key="index">
                                 <h4>{{name}}:</h4>{{enfriamientoD[index]}}
                          </v-list-item>
                          </v-list>

                      
                     
                     

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
      j: 0,

      
      i: 0,
      cycleIDs: [0,0,0],
      routineContent: [],
      entrada: [],
      entradaD: [],
      ppal: [],
      ppalD: [],
      enfriamiento: [],
      enfriamientoD: [],
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

        for(this.j = 0; this.j < this.routinesE.length; this.j++){
            this.routineDialog[this.j] = false;
        }
        })
        .catch(() => console.log("Error al obtener los datos de rutinas"));



    },
    methods:{
     
     saveIndex: function(index){
              this.routineDialog = !this.routineDialog
              this.index = index;
      },
      getRoutineInfo(id){
        this.routineDialog = !this.routineDialog
        this.entrada = [];
        this.ppal = [];
        this.enfriamiento = [];
        this.entradaD = [];
        this.ppalD = [];
        this.enfriamientoD = [];
        
        this.axios
          //get CycleIDs
          .get(UserApi.baseUrl + "/routines/" + id + "/cycles/")
          .then((response) => {
            console.log(response.data.results);
            this.cycleIDs[0] = response.data.results[0].id;
            this.cycleIDs[1] = response.data.results[1].id;
            this.cycleIDs[2] = response.data.results[2].id;
          })
      .then((response) => {
        console.log(response);

        this.axios
            .get(UserApi.baseUrl + "/routines/" + id + "/cycles/" + this.cycleIDs[0] + "/exercises")
            .then((response) => {
              for(this.i=0 ; this.i< response.data.results.length; this.i++)
              {
                this.entrada = this.entrada.concat(response.data.results[this.i].name);
                this.entradaD = this.entradaD.concat(response.data.results[this.i].detail);
              }

        this.axios
            .get(UserApi.baseUrl + "/routines/" + id + "/cycles/" + this.cycleIDs[1] + "/exercises")
            .then((response) => {
              for(this.i=0 ; this.i< response.data.results.length; this.i++)
              {
                this.ppal = this.ppal.concat(response.data.results[this.i].name);
                this.ppalD = this.ppalD.concat(response.data.results[this.i].detail);
              }
            });
        this.axios
            .get(UserApi.baseUrl + "/routines/" + id + "/cycles/" + this.cycleIDs[2] + "/exercises")
            .then((response) => {
              for(this.i=0 ; this.i< response.data.results.length; this.i++)
              {
                this.enfriamiento = this.enfriamiento.concat(response.data.results[this.i].name);
                this.enfriamientoD = this.enfriamientoD.concat(response.data.results[this.i].detail);
              }
            });
        });
      })
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

