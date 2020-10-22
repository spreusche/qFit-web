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

    <div class="ma-3" v-for="(routine, index) in routinesE" :key="index">
      <v-card elevation="4" outlined @click="routineDialog = true">
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

    <template>
      <v-dialog v-model="routineDialog" width="600px">
        <v-card elevation="0">
          <v-app-bar flat dark color="#2d2d2a"> </v-app-bar>
          <v-card-title>
            <span class="headline">{{ routinesE[0].name }}</span>
          </v-card-title>

          <v-card-text>
            Lorem ipsum dolor sit amet, semper quis, sapien id natoque elit.
            Nostra urna at, magna at neque sed sed ante imperdiet, lorem
          </v-card-text>
        </v-card>
      </v-dialog>
    </template>
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
      wanted: Number
    };
  },
  beforeMount: function () {
    this.axios
      .get(UserApi.baseUrl + "/routines/")
      .then((response) => {
        console.log(response.data.results);
        this.routinesE = response.data.results;
        console.log(this.routinesE[0].creator.username);
      })
      .catch(() => console.log("Error al obtener los datos de rutinas"));
  }
};
</script>

