<template>
    <v-container fluid id="Busqueda">
    <v-row>
      <v-col>
        <h1></h1>
        <p class="text--secondary">Mostrando resultados de </p>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="3">
        <v-select :items="filters" label="Filtrar" dense outlined></v-select>
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
    
</template>