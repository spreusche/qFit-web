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
        <v-btn class="mr-3" color="error"
               :to="{name:'EditarRutina', params: { id: this.routineID}}"
        > CANCELAR </v-btn>

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
      <v-btn
          :to="{name:'CrearEjercicio', params: { routineID: this.routineID, cycleID: this.cycleIDs[this.number-1]}}">
        + agregar ejercicio</v-btn>
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


    // Hardcodeado la rutina y ciclo IDs
    routineID: 1,
    cycleID: 1,
    cycleIDs: [],
    currentCycle: [],
  }),

  //cuando se entra a la pagina se hace esto :D
  beforeMount: function () {

    this.number=this.$route.params.num;
    this.routineID=this.$route.params.id;

    if(this.number == 1){
      this.title="Entrada en Calor";
    } else if(this.number == 2) {
      this.title="Ejercitación Principal";
    } else if(this.number==3){
      this.title="Enfriamiento";
    } else {
      this.title="error, check this.number";
    }

    if(this.routineID != -1) {
      this.axios
          .get(UserApi.baseUrl + "/routines/" + this.routineID + "/cycles/")
          .then((response) => {

            if (response.data.totalCount > 0) {
              this.cycleIDs = this.cycleIDs.concat(response.data.results[0].id);
            }
            if (response.data.totalCount > 1) {
              this.cycleIDs = this.cycleIDs.concat(response.data.results[1].id);
            }
            if (response.data.totalCount > 2) {
              this.cycleIDs = this.cycleIDs.concat(response.data.results[2].id);
            }
            console.log(this.cycleIDs);
            console.log("BUENARDO");
            this.getExercises();
          }).catch(() => console.log("errorciño agarrando los datos de la api"))
    }
    console.log("uuuuuuuuu")
    console.log(this.cycleIDs);
  },

  methods: {
    loggg: function(){
      console.log("masvale");
    },

    getExercises: function() {
      this.axios
          .get(UserApi.baseUrl + "/routines/" + this.routineID + "/cycles/" + this.cycleIDs[this.number-1] + "/exercises/" )
      .then((response) => {
        console.log("abajo de esto");
        console.log(this.$route.params);
        console.log(this.cycleIDs[this.number-1]);
        console.log("acá");
        console.log(response.data.results);
        this.currentCycle=response.data.results;
      })
    }

  }


}

</script>

<style scoped>

</style>
