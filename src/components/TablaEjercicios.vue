<template>
  <v-container fluid>

    <v-row >

        <div>
          <h1>Crear Rutina > </h1>
        </div>

        <div>
          <h1 class="blue--text">{{title}}</h1>
        </div>

      <v-spacer></v-spacer>

        <v-btn class="mr-3" color="error" @click="$router.go(-1)"> CANCELAR </v-btn>

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

<!--    body of table-->
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

<!-- footer of table-->
    <v-row justify="center">
      <v-btn>+ agregar ejercicio</v-btn>

    </v-row>


  </v-container>
</template>

<script>

import {UserApi} from "@/api/user";

export default {

  props: {

  },

  data: () => ({
    title: "Entrada en Calor",
    number: 0,

    currentCycle: [],
    // Hardcodeado la rutina y ciclo IDs
    routineID: 1,
    cycleID: 1,
  }),

  //cuando se entra a la pagina se hace esto :D
  beforeMount: function () {

    this.number=this.$route.params.id;

    if(this.number == 1){
      this.title="Entrada en Calor";
    } else if(this.number == 2) {
      this.title="Ejercitación Principal";
    } else if(this.number==3){
      this.title="Enfriamiento";
    } else {
      this.title="error, check this.number";
    }

    this.axios
        .get(UserApi.baseUrl + "/routines/" + this.routineID + "/cycles/" + this.cycleID + "/exercises")
        .then((response) => {
          this.currentCycle = response.data.results;
          console.log(this.currentCycle);
          console.log("BUENARDO");
        })
        .catch(() => console.log("errorciño agarrando los datos de la api"));
  },

  methods: {
    logg: function(){
    }
  }


}

</script>

<style scoped>

</style>
