<template>
<v-container fluid>
   <v-row>
    
      <div class="ml-3">
        <h1>Editar Ejercicio</h1>
      </div>

      <v-spacer></v-spacer>

      <v-btn color="error" to="/MisEjercicios"> CANCELAR </v-btn>
      <v-btn
          @click="editRoutine"
      color="light-green accent-4 ml-3 mr-1"
      dark >
        GUARDAR
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
                  v-model="description"
                  outlined
                  auto-grow
                  clearable
                  clear-icon="mdi-close-circle"
                  :rules="rules"
                  required
                ></v-textarea>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="3">
                <v-header><h3>Aclaraciones:</h3></v-header>
              </v-col>
              <v-col cols="8">
                <v-text-field outlined v-model="materials"></v-text-field>
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
                <v-text-field outlined v-model="materials"></v-text-field>
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