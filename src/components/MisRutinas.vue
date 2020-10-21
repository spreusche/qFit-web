<template >
  <v-container fluid  id="Mis Rutinas">
    <v-row>
      <v-col>
        <h1>{{title}}</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="3">
        <v-select
            :items="filters"
            label="Filtrar"
            dense
            outlined
        ></v-select>
      </v-col>
      <v-col cols="3">
        <v-select
            :items="categories"
            label="Categorias"
            dense
            outlined
        ></v-select>
      </v-col>
    </v-row>

    <hr>

    

    <div class="ma-3" v-for="routine in routines" :key="routine">
      <p>{{console.log("routine")}}</p>
      <p>{{console.log(routine)}}</p>
      <v-card
          elevation="4"
          max-width="1114"
      >

        <v-card-title>{{ routine.name }}</v-card-title>

        <v-card-subtitle>
          {{routine.detail}}
        </v-card-subtitle>

        <v-card-actions>
          <v-btn
              color="green"
              text
              @click="update"
          >
            Compartir
          </v-btn>

          <v-btn
              color="green"
              text
          >
            Editar
          </v-btn>

          <v-spacer></v-spacer>

          <v-btn
              icon
              @click="routine.show = !routine.show"
          >
            <v-icon>{{ routine.show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
          </v-btn>
        </v-card-actions>

        <v-expand-transition>
          <div v-show="routine.show">
            <v-divider></v-divider>

            <v-card-text>
              <h3>Duracion: </h3> {{ routine.duracion }}
              <h3>Materiales:</h3> -
              <h3>Dificultad: </h3> {{ routine.ddifficulty }}
              <h3>ID: </h3> {{ routine.id }}
              <h3>Es publica?: </h3> {{ routine.isPublic }}
              <h3>Fecha de creación: </h3> {{ routine.dateCreated }}
              <h3>Contenido: </h3> {{ routine.content }}
            </v-card-text>
          </div>
        </v-expand-transition>
      </v-card>
    </div>

  </v-container>
</template>

import Api from '\src\api\api.js';
import Vue from 'vue';
import axios from 'axios';
import VueAxios' from 'vue-axios';


<script>
//const axios = require('axios').default;
import { UserApi } from '../api/user'
export default {
  data: () => ({
    categories: ["Cat 1" ,"Cat 2", "Cat 3"],
    filters: ["Deporte", "Duracion", "Puntuacion"],
    title: "Mis Rutinaas",
    routines:   
    [
      {name:"Rutina de Brazos", source: "https://fondosmil.com/fondo/4045.jpg", content: "10 flexiones de brazo", duracion: "1 hora", detail: "Te dejará los brazos mas explosivos de todo el barrio", text: "felxiones de brazos: 10 reps", show: false},
      {name:"Rutina 2", source: "https://c.wallhere.com/photos/14/73/women_sportswear_ass_gloves_gyms_mirror_dumbbells_tanned-1158628.jpg!d", content: "cont 2", duracion: "2 horas", detail: "detail 2", text:"texto 2", show:false},
    // rutina 3 va a ser agarrada de la nube:
      {}
    ] 


  }), //cuando se entra a la pagina se hace esto :D Y ME FUNKA BIEN
   beforeMount: function(){
     this.axios.get(UserApi.baseUrl + '/user/current/routines/')
       .then(response => {
         console.log(response.data.results);
         this.routines = response.data.results;
         console.log("BUENARDO");
       }).catch(() => console.log("errorciño agarrando los datos de la api"));
   },

  methods: {
    update: function(){
      this.axios.get(UserApi.baseUrl + '/routines' , {
        headers: {
          'Authorization' : 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlhdCI6MTYwMzMyMTUzNjcyNCwiZXhwIjoxNjAzMzI0MTI4NzI0fQ.G_1_3s9Xp-aeQybdbavRdviU5bSC2unkQqtnoQiruhw'
        }
      })
      .then((response)=>{
          console.log(response.data.results);
          console.log(this.routines);
          this.routines=response.data.results;
          console.log(this.routines);
      });

    },
  }
}

</script>