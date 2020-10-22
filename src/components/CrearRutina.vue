 <template>
  <v-container fluid>
    <v-row>
      <v-col cols="5">
        <div>
          <h1>Crear/Editar Rutina</h1>
          <br />
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="9">
        <v-card class="mx-auto" flat max-width="1000">
          <v-row>
            <v-col cols="3">
              <v-subheader><h2>Nombre</h2></v-subheader>
            </v-col>
            <v-col cols="6">
              <v-text-field outlined></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="3">
              <v-subheader><h2>Descripción</h2></v-subheader>
            </v-col>
            <v-col cols="6">
              <v-text-field outlined></v-text-field>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>