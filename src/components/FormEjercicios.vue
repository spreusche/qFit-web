<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-container ma-4>
      <v-row>
        <v-col cols="4" md="2">
          <v-header><h3>Repeticiones:</h3></v-header>
        </v-col>
        <v-col cols="4" md="1">
          <v-text-field outlined required :rules = 'generalRules'></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="4" md="2">
          <v-header><h3>Descanso entre Repeticiones:</h3></v-header>
        </v-col>
        <v-col cols="4" md="1">
          <v-text-field  outlined required :rules = 'generalRules'></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="4" md="2">
          <v-header><h3>Descanso entre Ejercicios:</h3></v-header>
        </v-col>
        <v-col cols="4" md="1">
          <v-text-field outlined equired :rules = 'generalRules'></v-text-field>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>
<script>

export default {
    valid: true,
    generalRules:[
        v => !!v || 'Debe ingresar un número positivo mayor a cero'
    ],
    repetitionRules:[
        v => /^[0-9]\d*$/.test(v) || 'Debe ingresar un número positivo mayor a cero'
    ],

}
</script>