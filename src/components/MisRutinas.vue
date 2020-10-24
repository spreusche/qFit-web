<template >
  <v-container fluid id="Mis Rutinas">
    <v-row>
     
        <h1>Mis Rutinas</h1>
     <v-spacer></v-spacer>
      <v-btn
          color="blue"
          elevation="1"

          class="mr-5 mt-2"
          dark
          :to="{ name: 'EditarRutina', params: { id: -1 } }"
        >
          + Crear Rutina
        </v-btn>
    </v-row>
    
    <v-row>
      <v-col cols="2">

        <v-select :items="filters" @click="update" label="Filtrar" dense outlined v-model="difficulty" item-text="spanish" item-value="id"></v-select>

      </v-col>
      <v-col cols="2">
        <v-select :items="orderBy" @click="update" label="Ordenar Por" dense outlined v-model="order" item-text="spanish" item-value="id"></v-select>
      </v-col>
      <v-col cols="2">
        <v-select :items="ascOrDesc" @click="update" label="Orden" dense outlined v-model="direction" item-text="spanish" item-value="id"></v-select>
      </v-col>
    </v-row>
    <hr />



    <div class="ma-3" v-for="routine in routines" :key="routine">
      <v-card elevation="4">
        <v-row>
          <v-col>
            <v-card-title class="pt-1">{{ routine.name }}</v-card-title>

            <v-card-subtitle>
              {{ routine.detail }}
            </v-card-subtitle>
          </v-col>
          <v-col>
            <v-card-actions class="pt-0">
              <v-spacer></v-spacer>

              <v-btn
                icon
                v-bind="attrs"
                :to="{ name: 'EditarRutina', params: { id: routine.id } }"
              >
                <v-icon>mdi-pencil</v-icon>
              </v-btn>

              <v-btn
                icon
                v-bind="attrs"
                color="red"
                @click="eliminarRutina(routine.id)"
              >
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </v-card-actions>
          </v-col>
        </v-row>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn icon @click=" showContent(routine) ">
            <v-icon>{{ routine.isPublic ? "mdi-chevron-down" : "mdi-chevron-up" }}</v-icon>
          </v-btn>
        </v-card-actions>
        <v-expand-transition>
          <div v-show="!routine.isPublic">
            <v-divider></v-divider>

            <v-list>
              <v-list-item>
                <h3>Rating: </h3> {{ routine.averageRating }}
            </v-list-item>
              <v-list-item>
                <h3>Duración: </h3> {{ routine.duracion }}
              </v-list-item>
              <v-list-item>
                <h3>Dificultad: </h3> {{ routine.difficulty }}
              </v-list-item>
              <v-list-item>
                <h3>Visibilidad Pública: </h3> {{ routine.isPublic }}
              </v-list-item>
              <v-list-item>
                <h3>Categoría: </h3> {{ routine.category.name }}
              </v-list-item>
              <v-list-item>
                <h3>Contenido: </h3> 
              </v-list-item>
               <v-list-item><u>Entrada en calor:</u></v-list-item>

                  <v-list-item v-for="(exercises, index) in entrada" :key="index">
                      {{exercises}}
                  </v-list-item>

                  <v-list-item><u>Ejercitación principal:</u></v-list-item>
                  <v-list-item v-for="(exercises, index) in ppal" :key="index">
                      {{exercises}}
                  </v-list-item>


                  <v-list-item><u>Enfriamiento:</u></v-list-item>
                  <v-list-item v-for="(exercises, index) in enfriamiento" :key="index">
                      {{exercises}}
                </v-list-item>
            </v-list>
          </div>
        </v-expand-transition>
      </v-card>
    </div>
  </v-container>
</template>



<script>
import { UserApi } from "../api/user";
export default {
  data: () => ({
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
    routines: [],
    flag: -1,

    id: 1,
    i: 0,
    cycleIDs: [0,0,0],
    routineContent: [],
    entrada: [],
    ppal: [],
    enfriamiento: [],

  }),
  beforeMount: function () {
    this.axios
      .get(UserApi.baseUrl + "/user/current/routines/?size=9999")
      .then((response) => {
        this.routines = response.data.results;
      })
      .catch(() => console.log("errorciño agarrando los datos de la api"));
  },

  methods: {

    showContent: function(routine){
      this.entrada = [];
      this.ppal = [];
      this.enfriamiento = [];
      this.id = routine.id;
       this.axios
        //get CycleIDs
        .get(UserApi.baseUrl + "/routines/" + this.id + "/cycles/")
        .then((response) => {
          this.cycleIDs[0] = response.data.results[0].id;
          this.cycleIDs[1] = response.data.results[1].id;
          this.cycleIDs[2] = response.data.results[2].id;
        })
    .then((response) => {
      console.log(response);

      this.axios
          .get(UserApi.baseUrl + "/routines/" + this.id + "/cycles/" + this.cycleIDs[0] + "/exercises")
          .then((response) => {
             for(this.i=0 ; this.i< response.data.results.length; this.i++)
            {
              this.entrada = this.entrada.concat(response.data.results[this.i].name);
            }

      this.axios
          .get(UserApi.baseUrl + "/routines/" + this.id + "/cycles/" + this.cycleIDs[1] + "/exercises")
          .then((response) => {
            for(this.i=0 ; this.i< response.data.results.length; this.i++)
            {
              this.ppal = this.ppal.concat(response.data.results[this.i].name);
            }
          });
      this.axios
          .get(UserApi.baseUrl + "/routines/" + this.id + "/cycles/" + this.cycleIDs[2] + "/exercises")
          .then((response) => {
            for(this.i=0 ; this.i< response.data.results.length; this.i++)
            {
              this.enfriamiento = this.enfriamiento.concat(response.data.results[this.i].name);
            }
          });
      });
      routine.isPublic = !routine.isPublic
    })


    },

    //update routines
    update: function () {
      this.queryFilters = "";
      if(this.difficulty != ""){
        this.queryFilters = this.queryFilters + "difficulty=" + this.difficulty;
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
      this.queryFilters=this.queryFilters + "&size=9999"

      this.axios
          .get(UserApi.baseUrl + "/user/current/routines/?" + this.queryFilters)
          .then((response) => {
            this.routines = response.data.results;
          });


    },

    eliminarRutina: function (routineID) {

      this.result = window.confirm("Está seguro que desea eliminar esta rutina?");
      if (this.result) {
        if(routineID != 1) {
          this.axios
              .delete(UserApi.baseUrl + "/routines/" + routineID)
              .then((response) => {
                console.log(response);
                this.update();
              })
        } else {
          alert("no se puede borrar la rutina 1, ésta contiene el masterCycle");
        }
      }
    },

    setID: function (num) {
      UserApi.currID(num);
    },
  },
  };
</script>
