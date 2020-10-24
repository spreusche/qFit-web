<template>
  <v-container fluid>
    <v-row>
      <div>
        <h1>Crear Rutina ></h1>
      </div>

      <div>
        <h1 class="blue--text">{{ title }}</h1>
      </div>

      <v-spacer></v-spacer>
      <v-btn
        class="mr-3"
        color="error"
        :to="{ name: 'EditarRutina', params: { id: this.routineID } }"
      >
        ATRÁS
      </v-btn>
    </v-row>

    <hr />

    <!--    header del table-->
    <v-list>
      <v-list-item>
            <v-card height="29px" width="400px" align="center"> Ejercicio </v-card>
            <v-card height="29px" width="400px" align="center">
              Repeticiones / Tiempo
            </v-card>
      </v-list-item>
        <!--    body of table-->
        <div class="ma-3" v-for="exercise in currentCycle" :key="exercise">
          <v-list-item>
              <v-card width="400px" align="center">
                {{ exercise.name }}
              </v-card>

              <v-card width="400px" align="center">
                {{ exercise.duration }}
                /
                {{ exercise.repetitions }}
              </v-card>


              <v-btn icon @click="editExercise(exercise.id)">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-btn icon color="red"
              @click="deleteExercise(exercise.id)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
          </v-list-item>

        </div>

        <!-- footer of table-->
      <v-list-item>
          <v-btn
            :to="{
              name: 'CrearEjercicio',
              params: { routineID: this.routineID, cycleID: this.cycleIDs[this.number - 1],},
            }" > + agregar ejercicio </v-btn>
      </v-list-item>
    </v-list>

  </v-container>
</template>

<script>
import { UserApi } from "@/api/user";

export default {
  props: {},

  data: () => ({
    title: "Entrada en Calor",
    number: 0,

    // estos valores son pisados en el beforemount
    routineID: 1,
    cycleID: 1,
    cycleIDs: [],
    currentCycle: [],
  }),

  //cuando se entra a la pagina se hace esto :D
  beforeMount: function () {
    this.number = this.$route.params.num;
    this.routineID = this.$route.params.id;

    if (this.number == 1) {
      this.title = "Entrada en Calor";
    } else if (this.number == 2) {
      this.title = "Ejercitación Principal";
    } else if (this.number == 3) {
      this.title = "Enfriamiento";
    } else {
      this.title = "error, check this.number";
    }

    if (this.routineID != -1) {
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
          this.cycleID = this.cycleIDs[this.number -1];
          this.getExercises();
        })
        .catch(() => console.log("errorciño agarrando los datos de la api"));
    }
  },

  methods: {


    loggg: function () {
      console.log("masvale");
    },

    editExercise(exerciseID){
      this.$router.push({ name: 'EditarEjercicio', params: { routineID: this.routineID, cycleID: this.cycleID, exerciseID: exerciseID } });
    },


    deleteExercise(exerciseID){
      this.result = window.confirm("Está seguro que desea eliminar este ejercicio?");
      if (this.result) {
        this.axios
            .delete(UserApi.baseUrl + "/routines/" + this.routineID+ "/cycles/" + this.cycleID + "/exercises/" + exerciseID)
            .then((response) => {
              console.log(response);
              this.getExercises();
            })
      }
    },

    getExercises: function () {
      this.axios
        .get(UserApi.baseUrl + "/routines/" + this.routineID + "/cycles/" + this.cycleID + "/exercises/"
        )
        .then((response) => {
          console.log(this.$route.params);
          console.log(this.cycleIDs[this.number - 1]);
          console.log(response.data.results);
          this.currentCycle = response.data.results;
        });
    },
  },
};
</script>

<style scoped>
</style>
