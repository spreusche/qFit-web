 <template>
  <v-container fluid>
    <v-row>
      <v-col>
        <div>
          <h1>Crear/Editar Rutina</h1>
        </div>
      </v-col>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-col>
        <v-btn color="error" to= '/MisRutinas'> CANCELAR </v-btn>
      </v-col>
    </v-row>
    <hr/>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-row>
        <v-col cols="2">
          <v-header><h2>Nombre:</h2></v-header>
        </v-col>
        <v-col cols="6">
          <v-text-field class="text_field" outlined required :rules = "rules" ></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="2">
          <v-header><h2>Descripción:</h2></v-header>
        </v-col>
        <v-col cols="6">
          <v-textarea
            outlined
            auto-grow
            clearable
            clear-icon="mdi-close-circle"
            :rules = "rules"
            required
          ></v-textarea>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="2">
          <v-header><h2>Materiales:</h2></v-header>
        </v-col>
        <v-col cols="6">
          <v-text-field outlined ></v-text-field>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>
<script>
  export default {
    data: () => ({
      valid: true,
      name: '',
      rules: [
        v => !!v || 'Debe completar la información',
      ],
      select: null
    })
  }
</script>