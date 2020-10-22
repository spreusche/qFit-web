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
          <v-text-field class="text_field" v-model="name" outlined required :rules = "rules" ></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="2">
          <v-header><h2>Descripción:</h2></v-header>
        </v-col>
        <v-col cols="6">
          <v-textarea
            v-model = "description"
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
          <v-text-field outlined v-model = "materials"></v-text-field>
        </v-col>
      </v-row>

    </v-form>
    <v-row>

      <v-col>
        <v-card>
          <v-card-title>Entrada en Calor</v-card-title>
          <FormEjercicios></FormEjercicios>
        </v-card>
      </v-col>

      <v-col>
        <v-card>
          <v-card-title>Ejercitación Principal</v-card-title>
          <FormEjercicios></FormEjercicios>
        </v-card>
      </v-col>

      <v-col>
        <v-card>
          <v-card-title>Enfriamiento</v-card-title>
          <FormEjercicios></FormEjercicios>
        </v-card>
      </v-col>

     </v-row>



  </v-container>
</template>



      description: '',
      materials: '',
<script>
  import FormEjercicios from './FormEjercicios';

 export default {
 data: () => ({
 valid: true,
 name: '',
 rules: [
 v => !!v || 'Debe completar la información',
 ],
 select: null
 }),
 components: {

        FormEjercicios
      }
    };
</script>
      }
