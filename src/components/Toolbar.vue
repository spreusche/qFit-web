<template>
  <v-container fluid class="pa-0 ma-0" >
      
    <v-toolbar color="#2D2D2A" dark>
      
      <img :src="require('../assets/logo-qfit.png')" height="100%" />
      <v-toolbar-title> 
      </v-toolbar-title>
      
      <v-col>
        <v-tabs align-with-title background-color="#2D2D2A" grow slider-color="#00e140">
          <v-tab to="/MisRutinas">Mis Rutinas</v-tab>
          <v-tab to="/MisEjercicios">Mis Ejercicios</v-tab>
          <v-tab to="/Explorar">Explorar</v-tab>
        </v-tabs>
      </v-col>

      <v-col>
        <v-text-field
        append-icon="mdi-magnify"
        flat
        dense
        hide-details
        rounded
        label="Buscar"
        solo-inverted
        ></v-text-field>
      </v-col>

      <v-btn icon>
        <v-icon>mdi-bell</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-account-circle</v-icon>
      </v-btn>


    </v-toolbar>

  
  </v-container>
   
  
</template>
