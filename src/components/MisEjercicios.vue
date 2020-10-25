<template >
    <v-container fluid  id="MisEjercicios">
        <v-row>

            <h1>Mis Ejercicios</h1>

            <v-spacer> </v-spacer>
            <v-btn color="blue"
             elevation="1"

            class="mr-5 mt-2 mb-2"
            dark
                 :to="{name:'CrearEjercicio', params: { routineID: 1, cycleID: 1}}" >
            + Crear Ejercicio
          </v-btn>
        </v-row>

      <hr/>

      <div class="ma-3" v-for="exercise in cycleToShow" :key="exercise">

        <v-card elevation="4" max-width="1114">
          <v-card-title>{{ exercise.name }}</v-card-title>
          <v-card-subtitle>
            ID:
            {{ exercise.id }}
          </v-card-subtitle>

          <h3>Descripción:</h3>
          {{ exercise.detail }}
          <h3>Tipo:</h3>
          {{ exercise.type }}
          <h3>Duración:</h3>
          {{ exercise.duration }}
          <h3>Repeticiones:</h3>
          {{ exercise.repetitions }}
          <h3>img:</h3>


          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn icon v-bind="attrs" :to="{name:'EditarEjercicio', params: { routineID: 1, cycleID: 1, exerciseID: exercise.id}}">
              <v-icon
              >mdi-pencil</v-icon>
            </v-btn>

            <v-btn icon v-bind="attrs" color="red" @click="deleteExercise(exercise.id)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-card-actions>

        </v-card>



      </div>



    </v-container>
</template>


<script>
import { UserApi } from "../api/user";
export default {
  data: () => ({
    cantRoutines: 0,
    cycleToShow: [],
    masterCycle: 0,
    masterRoutine: 0,
  }),
  //cuando se entra a la pagina se hace esto :D
//cuando se entra a la pagina se hace esto :D
  beforeMount: function () {
    //busco el masterCycle para mostrar los ejs
    this.axios
        .get(UserApi.baseUrl + "/user/current/routines/favourites")
        .then((response) => {
          this.masterRoutine = response.data.results[0].id;
          this.axios
              .get(UserApi.baseUrl + "/routines/" + this.masterRoutine + "/cycles")
              .then((response) => {
                this.masterCycle = response.data.results[0].id;
                //ahora estan bien guardados los datos this.masterCycle y this.masterRoutine, voy a agarrar el cyclo para mostrarlo
                this.axios
                    .get(UserApi.baseUrl + "/routines/" + this.masterRoutine + "/cycles/" + this.masterCycle + "/exercises")
                    .then((response) => {
                      this.cycleToShow = response.data.results;
                      console.log(this.cycleToShow)
                    })
              }).catch(() => console.log("errorciño agarrando los datos de masterCycle"));
        })
        .catch(() => console.log("errorciño agarrando los datos de la api"));
  },

  methods: {
    update: function () {
      this.axios
          .get(UserApi.baseUrl + "/routines/" + this.masterRoutine + "/cycles/" + this.masterCycle + "/exercises")
          .then((response) => {
            this.cycleToShow = response.data.results;
          })
          .catch(() => console.log("errorciño agarrando los datos de la api"));
    },

    deleteExercise(exerciseID){
      this.result = window.confirm("Está seguro que desea eliminar esta rutina?");
      if (this.result) {
        this.axios
            .delete(UserApi.baseUrl + "/routines/" + this.masterRoutine + "/cycles/" + this.masterCycle + "/exercises/" + exerciseID)
        this.update();
      }

    },

  },
};
</script>
