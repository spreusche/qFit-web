 <template>
  <v-container fluid>
    <v-row>

      <div>
        <h1>Crear/Editar Rutina</h1>
      </div>

      <v-spacer></v-spacer>

      <v-btn color="error" to="/MisRutinas"> CANCELAR </v-btn>
      <v-btn
      color="light-green accent-4 ml-3 mr-1"
      dark
      @click="createRoutine">
        GUARDAR
      </v-btn>

    </v-row>

    <hr />

    <v-form ref="form" v-model="valid" lazy-validation>
      <v-row>
        <v-col cols="1">
          <v-header><h3>Nombre:</h3></v-header>
        </v-col>
        <v-col cols="6">
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
        <v-col cols="1">
          <v-header><h3>Descripción:</h3></v-header>
        </v-col>
        <v-col cols="6">
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
        <v-col cols="1">
          <v-header><h3>Materiales:</h3></v-header>
        </v-col>
        <v-col cols="6">
          <v-text-field outlined v-model="materials"></v-text-field>
        </v-col>
      </v-row>
    </v-form>


    <v-row>
      <v-col>
        <v-card>
          <v-card-title class="justify-center">ENTRADA EN CALOR</v-card-title>
          <FormEjercicios name="ENTRADA EN CALOR" ref="calor"></FormEjercicios>
        </v-card>
      </v-col>

      <v-col>
        <v-card>
          <v-card-title class="justify-center">EJERCITACIÓN PRINCIPAL</v-card-title>
          <FormEjercicios name="EJERCITACIÓN PRINCIPAL" ref="ppal"></FormEjercicios>
        </v-card>
      </v-col>

      <v-col>
        <v-card>
          <v-card-title class="justify-center">ENFRIAMIENTO</v-card-title>
          <FormEjercicios name="ENFRIAMIENTO" ref="frio"></FormEjercicios>
        </v-card>
      </v-col>
    </v-row>

  </v-container>
</template>



 <script>
 import {UserApi} from "@/api/user";
 import FormEjercicios from "./FormEjercicios";

 export default {

   data: () => ({
     valid: true,
     name: "",
     description: "",
     materials: "",
     rules: [(v) => !!v || "Debe completar la información"],
     select: null,
   }),
   components: {
     FormEjercicios,
   },

   methods: {
     createRoutine: function() {
       this.axios

           .post(UserApi.baseUrl + "/routines",{
             name: this.name,
             detail: this.description,
             isPublic: true,
             difficulty: "rookie",
             category: {
               id: 1,
             }
           })
           .then((response) => {
             console.log(response.data.id);
             this.$refs.calor.createCycle(response.data.id, "warmup", 1);
             this.$refs.ppal.createCycle(response.data.id, "exercise", 2);
             this.$refs.frio.createCycle(response.data.id, "cooldown", 3);


           })
     },
   }

 };
 </script>
