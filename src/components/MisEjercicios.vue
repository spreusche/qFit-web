<template >
    <v-container fluid  id="MisEjercicios">
        <v-row>
            <v-col>
                <h1>Mis Ejercicios</h1>
            </v-col>
        </v-row>
      <v-row>
        <v-col cols="1">
          <v-btn color="green" text outlined to="/CrearRutina">
            + Crear Ejercicio
          </v-btn>

          <v-chip-group
              active-class="green accent-4 white--text"
              column
          >
            <v-chip  @click="update"
                     class="short"
            >cargar fotos</v-chip>
          </v-chip-group>

          <v-btn color="green" text outlined @click="update">
            cargar fotos
          </v-btn>
        </v-col>
      </v-row>

      <hr />

      <div class="ma-3" v-for="exercise in masterCycle" :key="exercise">

        <p>{{getImage(exercise.id)}}</p>

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

            <v-btn icon v-bind="attrs">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>

            <v-btn icon v-bind="attrs" color="red">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-card-actions>

        </v-card>

        <v-dialog v-model="dialog" width="600px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark v-bind="attrs" v-on="on">
              Ver foto
            </v-btn>
          </template>
          <v-card>
            <v-app-bar flat dark color="#2d2d2a"> </v-app-bar>
            <v-card-title>
              <span class="headline">{{ exercise.name }}</span>
            </v-card-title>

            <v-img
                :src="imgs[exercise.id -1]"
            ></v-img>
          </v-card>
        </v-dialog>



      </div>



    </v-container>
</template>


<script>
import { UserApi } from "../api/user";
export default {
  data: () => ({
    cantRoutines: 0,
    masterCycle: [],
    imgs: [],
  }),
  //cuando se entra a la pagina se hace esto :D Y ME FUNKA BIEN
  beforeMount: function () {
    this.axios
        .get(UserApi.baseUrl + "/routines/1/cycles/1/exercises")
        .then((response) => {
          this.masterCycle = response.data.results;
          console.log(this.masterCycle);
          console.log("BUENARDO");
        })
        .then(() => {
      this.update();
    })
        .catch(() => console.log("errorciño agarrando los datos de la api"));
  },

  methods: {
    logg: function (text) {
      console.log(text);
    },
    update: function () {
      this.axios
          .get(UserApi.baseUrl + "/routines/1/cycles/1/exercises")
          .then((response) => {
            this.masterCycle = response.data.results;
            console.log(this.masterCycle);
            console.log("BUENARDO");
          })
          .catch(() => console.log("errorciño agarrando los datos de la api"));
    },

    getImage: function (id) {

      this.axios
          .get(UserApi.baseUrl + "/routines/1/cycles/1/exercises/" + id + "/images")
          .then((response) => {
            console.log(this.imgs);
            console.log(response.data.results[0].url);
            this.imgs[id-1]=response.data.results[0].url;
            console.log(this.imgs);
          })
    }

  },
};
</script>
