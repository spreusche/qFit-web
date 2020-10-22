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

    <hr />

    <div class="ma-3" v-for="routine in routines" :key="routine.id">
      <v-card elevation="4" outlined @click="alerta">
        <v-card-title>{{ routine.name }}</v-card-title>
        <v-card-subtitle>
          <v-icon>mdi-account</v-icon>
          <span>{{ routine.creator.username }}</span>
        </v-card-subtitle>
        <v-card-text>
          <h3>Descripción:</h3>
          {{ routine.detail }}
          <h3>Duración:</h3>
          {{ routine.duracion }}

          <h3>Materiales:</h3>
          -
          <h3>Dificultad:</h3>
          {{ routine.difficulty }}
        </v-card-text>
      </v-card>
    </div>
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
      routines: [],
    };
  },
  beforeMount: function () {
    this.axios
      .get(UserApi.baseUrl + "/routines/")
      .then((response) => {
        console.log(response.data.results);
        this.routines = response.data.results;
        console.log(this.routines[0].creator.username);
      })
      .catch(() => console.log("Error al obtener los datos"));
  },
};
</script>

