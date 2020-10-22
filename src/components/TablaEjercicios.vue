<template>
  <v-container fluid>

    <v-row >
      <v-col cols="2">
        <div>
          <h1>Crear Rutina ></h1>
        </div>
      </v-col>

      <v-col>
        <div>
          <h1 class="blue--text">{{title}}</h1>
        </div>
      </v-col>

      <v-spacer></v-spacer><v-spacer></v-spacer>
      <v-col>
        <v-btn color="error" to= '/MisRutinas'> CANCELAR </v-btn>
      </v-col>
    </v-row>

    <hr/>

<!--    header del table-->
    <v-row>
      <v-col align="right">
        <v-card height="29px" width="400px" align="center">
          Ejercicio
        </v-card>
      </v-col>
      <v-col>
        <v-card height="29px" width="400px" align="center">
          Repeticiones/Tiempo
        </v-card>
      </v-col>
    </v-row>

    <div class="ma-3" v-for="exercise in currentCycle" :key="exercise">
      <v-row>

        <v-col align="right">
          <v-card width="400px" align="left">
            {{exercise.name}}
          </v-card>
        </v-col>
        <v-col>
          <v-card height="29px" width="400px" align="left">
            {{exercise.duration}}
            {{exercise.repetitions}}
          </v-card>
        </v-col>

      </v-row>
    </div>


  </v-container>
</template>

<script>
//import {UserApi} from "@/api/user";

export default {

  data: () => ({
    title: "Entrada en Calor",
    currentCycle: [],
    datos: "",
  }),
}
</script>

<style scoped>

</style>
