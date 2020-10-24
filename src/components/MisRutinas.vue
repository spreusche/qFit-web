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

    <hr />
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

            <v-card-text>
              <h3>Rating:</h3>
              {{ routine.averageRating }}
              <h3>Duración:</h3>
              {{ routine.duracion }}
              <h3>Materiales:</h3>
              -
              <h3>Dificultad:</h3>
              {{ routine.difficulty }}
              <h3>ID:</h3>
              {{ routine.id }}
              <h3>Visibilidad Pública:</h3>
              {{ routine.isPublic }}
              <h3>Categoría:</h3>
              {{ routine.category }}
              <h3>Fecha de creación:</h3>
              {{ routine.dateCreated }}
              <h3>Contenido:</h3>
              {{ routine.content }}
            </v-card-text>
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
    //     [
    //   {
    //     name: "Rutina de Brazos",
    //     source: "https://fondosmil.com/fondo/4045.jpg",
    //     content: "10 flexiones de brazo",
    //     duracion: "1 hora",
    //     detail: "Te dejará los brazos mas explosivos de todo el barrio",
    //     text: "felxiones de brazos: 10 reps",
    //     show: false,
    //   },
    //   {
    //     name: "Rutina 2",
    //     source:
    //       "https://c.wallhere.com/photos/14/73/women_sportswear_ass_gloves_gyms_mirror_dumbbells_tanned-1158628.jpg!d",
    //     content: "cont 2",
    //     duracion: "2 horas",
    //     detail: "detail 2",
    //     text: "texto 2",
    //     show: false,
    //   },
    //   // rutina 3 va a ser agarrada de la nube:
    //   {},
    // ],
  }), //cuando se entra a la pagina se hace esto :D Y ME FUNKA BIEN
  beforeMount: function () {
    this.axios
      .get(UserApi.baseUrl + "/user/current/routines/?size=9999")
      .then((response) => {
        console.log(response.data.results);
        this.routines = response.data.results;
      })
      .catch(() => console.log("errorciño agarrando los datos de la api"));
  },

  methods: {

    //update routines
    update: function () {
      this.queryFilters = "";
      console.log(this.order);
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
      console.log("this.queryfilters");
      console.log(this.queryFilters);

      this.axios
          .get(UserApi.baseUrl + "/user/current/routines/?" + this.queryFilters)
          .then((response) => {
            console.log(this.routines);
            this.routines = response.data.results;
            console.log(this.routines);
            console.log("updateado");
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
