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
        Guardar
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
                  :rules="rules"
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
                <v-text-field outlined v-model="duration" :rules="numberRules"></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="3">
                <v-header><h3>Repeticiones:</h3></v-header>
              </v-col>
              <v-col cols="8">
                <v-text-field outlined v-model="repetitions" :rules="numberRules"></v-text-field>
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
    rules: [(v) => !!v || "Debes completar la información"],
    numberRules: [
      v => /^[0-9]\d*$/.test(v) || 'Debe ser un número entero',
      v => !!v || 'Debe ser un número entero']

  }),

  //cuando se entra a la pagina se hace esto :D
  beforeMount: function () {
    this.cycleID=this.$route.params.cycleID;
    this.routineID=this.$route.params.routineID;

    if(this.$route.params.exerciseID != null){
      this.fillBoxes();
    }
  },

  methods: {

    fillBoxes: function(){
      console.log("entré a fillboxes");
      this.axios
      .get(UserApi.baseUrl + "/routines/" + this.$route.params.routineID + "/cycles/" + this.$route.params.cycleID + "/exercises/" + this.$route.params.exerciseID)
      .then((response) => {
        console.log("respuestaaaaaaaaaaa");
        console.log(response.data);
        this.name=response.data.name;
        this.detail=response.data.detail;
        this.type=response.data.type;
        this.duration=response.data.duration;
        this.repetitions=response.data.repetitions;
      })
    },

    printProps: function() {
      console.log("routineID:");
      console.log(this.routineID);
      console.log("cycleID:");
      console.log(this.cycleID);
    },

    guardar: function() {
      console.log("entré")

      if(this.$route.params.exerciseID == null) {
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
            }).catch(() => console.log("errorciño agregando el ejercicio"));
        //y ahora la agrego al masterCycle también
        this.axios
            .post(UserApi.baseUrl + "/routines/1/cycles/1/exercises/", {
              name: this.name,
              detail: this.detail,
              type: this.type,
              //estos dos de abajo son los obligatorios
              duration: parseInt(this.duration),
              repetitions: parseInt(this.repetitions),
            })
            .then((response) => {
              console.log(response);
            }).catch(() => console.log("errorciño agregando al mastercycle"));
      } else {
        this.axios
            .put(UserApi.baseUrl + "/routines/" + this.routineID + "/cycles/" + this.cycleID + "/exercises/" + this.$route.params.exerciseID, {
              name: this.name,
              detail: this.detail,
              type: this.type,
              //estos dos de abajo son los obligatorios
              duration: parseInt(this.duration),
              repetitions: parseInt(this.repetitions),
            })
            .then((response) => {
              console.log(response);
            }).catch(() => console.log("errorciño editando el ejercicio"));
      }

    }

  }


}

</script>
