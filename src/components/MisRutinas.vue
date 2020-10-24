<template >
  <v-container fluid id="Mis Rutinas">
    <v-row>
      <v-col>
        <h1>Mis Rutinas</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="2">
        <v-btn
          color="green"
          text
          outlined
          :to="{ name: 'EditarRutina', params: { id: -1 } }"
        >
          + Crear Rutina
        </v-btn>

      </v-col>

    </v-row>

    
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
        <v-btn icon color="blue" @click="update">
          <v-icon>mdi-cached</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <hr />



    <div class="ma-3" v-for="routine in routines" :key="routine">
      <v-card elevation="4" max-width="1114">
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

          <v-btn icon @click="routine.isPublic = !routine.isPublic">
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
                <h3>Contenido: </h3> {{ routine.content }}
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
