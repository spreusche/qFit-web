<template >
  <v-container fluid id="Mis Rutinas">
    <v-row>
      <v-col>
        <h1>Mis Rutinas</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="1">
        <v-btn color="green" text outlined to="/CrearRutina">
          + Crear Rutina
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
              <v-btn icon v-bind="attrs" color="blue" @click="update">
                <v-icon>mdi-share</v-icon>
              </v-btn>

              <v-btn icon v-bind="attrs">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>

              <v-btn icon v-bind="attrs" color="red">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </v-card-actions>
          </v-col>
        </v-row>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn icon @click="routine.isPublic = !routine.isPublic">
            <v-icon>{{
              routine.isPublic ? "mdi-chevron-down" : "mdi-chevron-up"
            }}</v-icon>
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
    categories: ["Cat 1", "Cat 2", "Cat 3"],
    filters: ["Deporte", "Duracion", "Puntuacion"],
    routines: [],
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
      .get(UserApi.baseUrl + "/user/current/routines/")
      .then((response) => {
        console.log(response.data.results);
        this.routines = response.data.results;
        console.log("BUENARDO");
      })
      .catch(() => console.log("errorciño agarrando los datos de la api"));
  },

  methods: {
    //OJO QUE ESTA FUNCION VA A PONER LAS RUTINAS DE JOHN DOE, NO LAS DEL USUARIO ACTUAL
    update: function () {
      this.axios
        .get(UserApi.baseUrl + "/user/current/routines/", {
          headers: {
            Authorization:
              "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlhdCI6MTYwMzMyMTUzNjcyNCwiZXhwIjoxNjAzMzI0MTI4NzI0fQ.G_1_3s9Xp-aeQybdbavRdviU5bSC2unkQqtnoQiruhw",
          },
        })
        .then((response) => {
          console.log(response.data.results);
          console.log(this.routines);
          this.routines = response.data.results;
          console.log(this.routines);
        });
    },
  },
};
</script>
