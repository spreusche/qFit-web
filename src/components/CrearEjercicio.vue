<template>
<v-container fluid>
   <v-row>

      <div class="ml-3">
        <h1>Crear Ejercicio</h1>
      </div>

      <v-spacer></v-spacer>

      <v-btn color="error" @click="$router.go(-1)"> ATRÁS </v-btn>

      <v-btn @click="this.guardar"
      color="light-green accent-4 ml-3 mr-1"
      dark >
        Agregar
      </v-btn>


    </v-row>

    <v-divider></v-divider>

    <v-row>
      <v-col>

        <v-card elevation="0">
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-row>
              <v-col cols="3">
                <v-header><h3>Nombre:</h3></v-header>
              </v-col>
              <v-col cols="8">
                <v-text-field
                  class="pa-2"
                  v-model="name"
                  outlined
                  required
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="3">
                <v-header><h3>Descripción:</h3></v-header>
              </v-col>
              <v-col cols="8">
                <v-textarea
                  v-model="detail"
                  outlined
                  auto-grow
                  clearable
                  clear-icon="mdi-close-circle"
                  required
                ></v-textarea>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="3">
                <v-header><h3>Duración:</h3></v-header>
              </v-col>
              <v-col cols="8">
                <v-text-field outlined v-model="duration"></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="3">
                <v-header><h3>Repeticiones:</h3></v-header>
              </v-col>
              <v-col cols="8">
                <v-text-field outlined v-model="repetitions"></v-text-field>
              </v-col>
            </v-row>

          </v-form>
        </v-card>
      </v-col>

      <v-col>
        <v-card elevation="0">
        <v-card-title>Demostración</v-card-title>
          <v-row>
              <v-col cols="3">
                <v-header><h3>Categorías:</h3></v-header>
              </v-col>
              <v-col cols="8">
                <v-text-field outlined v-model="type"></v-text-field>
              </v-col>
          </v-row>

          <v-row>
              <v-col cols="3">
                <v-header><h3>Deportes:</h3></v-header>
              </v-col>
              <v-col cols="8">
                <v-text-field outlined v-model="materials"></v-text-field>
              </v-col>
            </v-row>

        </v-card>
      </v-col>
    </v-row>
</v-container>
</template>

<script>

import {UserApi} from "@/api/user";

export default {

  data: () => ({
    routineID: -1,
    cycleID: -1,
    name: "",
    detail: "",
    type: "exercise",
    duration: "",
    repetitions: "",

  }),

  //cuando se entra a la pagina se hace esto :D
  beforeMount: function () {
    this.cycleID=this.$route.params.cycleID;
    this.routineID=this.$route.params.routineID;
  },

  methods: {

    printProps: function() {
      console.log("routineID:");
      console.log(this.routineID);
      console.log("cycleID:");
      console.log(this.cycleID);
    },

    guardar: function() {
      console.log("entré")
      this.axios
          .post(UserApi.baseUrl + "/routines/" + this.routineID + "/cycles/" + this.cycleID + "/exercises/", {
            name: this.name,
            detail: this.detail,
            type: this.type,
            //estos dos de abajo son los obligatorios
            duration: parseInt(this.duration),
            repetitions: parseInt(this.repetitions),
          })
          .then((response) => {
            console.log(response);
          }).catch(() => console.log("errorciño agarrando los datos de la api"));
    }

  }


}

</script>
