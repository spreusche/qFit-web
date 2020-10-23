<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-container ma-4>
      <v-row>

        <v-col cols="4" md="5">
          <v-header><h4>Repeticiones:</h4></v-header>
        </v-col>
        <v-col cols="4" md="5">
          <v-text-field v-model="repeticiones" outlined required :rules = 'generalRules' height="1px" suffix='reps'></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="4" md="5">
          <v-header><h4>Descanso entre repeticiones:</h4></v-header>
        </v-col>
        <v-col cols="4" md="5">
          <v-text-field v-model="descansoRep" outlined required :rules = 'repetitionRules' suffix="segs" >
          </v-text-field>

        </v-col>
      </v-row>
      <v-row>
        <v-col cols="4" md="5">
          <v-header><h4>Descanso entre ejercicios:</h4></v-header>
        </v-col>
        <v-col cols="4" md="5">
          <v-text-field v-model="descansoEj" outlined required :rules = 'repetitionRules' suffix="segs"></v-text-field>
        </v-col>
      </v-row>
      <v-row align="center">
          <v-btn
          color="grey lighten-2" elevation="3"
          :to="{name:'TablaEjercicios', params: { id: this.id, num: this.number, cycleID: this.cycleID}}"
          width="94%"
          :cycleID="this.number">
          Ejercicios
          </v-btn>
        <v-btn @click="logg">print current url</v-btn>
      </v-row>
    </v-container>
  </v-form>


</template>
<script>
import {UserApi} from "@/api/user";



export default {

     props: {
    name: String,
    number: Number, //1 2 o 3
    id:Number, //routine id

  },

    data: () => ({
      repeticiones:'',
      descansoRep: '',
      descansoEj: '',
      valid: true,
      cycleID: 0,
      pageNum: 0,
      generalRules:[
        v => !!v || '*'
      ],
      repetitionRules:[
        v => /^[0-9]\d*$/.test(v) || '*',
        v => !!v || '*'
    ]
    }),

 // beforeMount: function () {
 //   this.id=this.$route.params.id;

 //    if(this.pageNum != -1) {
 //      //si no es create new, agarrá los datos y metelos al form
 //      this.axios
 //          .get(UserApi.baseUrl + "/routines/" + this.id + "/cycles/")
 //          .then((response) => {
 //            console.log(response.data.results);
    //         this.description = response.data.detail;
    //         this.materials = response.data.difficulty;
    //       })
    //       .catch(() => console.log("errorciño agarrando los datos de la api"));
    //   this.title="Editar Rutina";
    // } else {
    //   this.title = "Crear Rutina";
 //   }
 // },

  methods: {
    createCycle: function (id, theType, ornen) {

      if (this.id == -1) {
//estas en create new
        this.axios
            .post(UserApi.baseUrl + "/routines/" + id + "/cycles", {

              name: this.name,
              detail: this.descansoRep + '&' + this.descansoEj,
              type: theType,
              order: ornen,
              repetitions: parseInt(this.repeticiones),

            })
            .then((response) => {
              console.log(response);
              console.log("routine id:");
              console.log(id);
              this.routineID = id;
              console.log("cicle id:");
              console.log(response.data.id);
              this.cycleID = response.data.id;
            })

      } else {
        //tenes que updatear el current
        return;
      }
    },

    logg: function () {
      console.log(this.$route.params.id);
    }
  }
};
</script>
