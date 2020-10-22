<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-container ma-4>
      <v-row>

        <v-col cols="4" md="5">
          <v-header><h4>Repeticiones:</h4></v-header>
        </v-col>
        <v-col cols="4" md="5">
          <v-text-field outlined required :rules = 'generalRules' height="1px" suffix='reps'></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="4" md="5">
          <v-header><h4>Descanso entre repeticiones:</h4></v-header>
        </v-col>
        <v-col cols="4" md="5">
          <v-text-field  outlined required :rules = 'repetitionRules' suffix="segs" >
          </v-text-field>

        </v-col>
      </v-row>
      <v-row>
        <v-col cols="4" md="5">
          <v-header><h4>Descanso entre ejercicios:</h4></v-header>
        </v-col>
        <v-col cols="4" md="5">
          <v-text-field outlined required :rules = 'repetitionRules' suffix="segs"></v-text-field>
        </v-col>
      </v-row>
      <v-row align="center">
          <v-btn
          color="grey lighten-2" elevation="3"
          to="/CrearRutina/Ejercicios"
          width="94%">
          Ejercicios
          </v-btn>

      </v-row>
    </v-container>
  </v-form>
</template>
<script>
import {UserApi} from "@/api/user";

export default {
    data: () => ({
      repeticiones:'',
      descansoRep: '',
      descansoEj: '',
      valid: true,
      generalRules:[
        v => !!v || '*'
      ],
      repetitionRules:[
        v => /^[0-9]\d*$/.test(v) || '*',
        v => !!v || '*'
    ]
    }),

  methods: {
      createCycle: function(){
        this.axios

            .post(UserApi.baseUrl + "/routines/" + UserApi.currID() + "/cycles",{
              name: this.name,
              detail: this.description,
    //          order: ,
              repetitions: this.repeticiones,
            })
            .then((response) => {
              console.log(response);
            })
      }
  }

}
</script>
