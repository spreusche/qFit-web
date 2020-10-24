<template>
  <v-container fluid>
    <v-row>

      <div class="ml-3">
        <h1>{{ title }}</h1>
      </div>

      <v-spacer></v-spacer>
      <!--  debaja porque entra en un loop @click=$router.go(-1)  -->
      <v-btn color="error" :to="{name:'MisRutinas'}" > ATRÁS </v-btn>

      <v-btn

          @click="this.editRoutine"
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
              <v-col cols="4">
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
              <v-col cols="4">
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
              <v-col cols="4">
                <v-header><h3>Materiales:</h3></v-header>
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


    <v-row>
      <v-col>
        <v-card>
          <v-card-title class="justify-center">ENTRADA EN CALOR</v-card-title>
          <FormEjercicios name="ENTRADA EN CALOR" ref="calor" number=1 :id=this.id></FormEjercicios>
        </v-card>
      </v-col>

      <v-col>
        <v-card>
          <v-card-title class="justify-center">EJERCITACIÓN PRINCIPAL</v-card-title>
          <FormEjercicios name="EJERCITACIÓN PRINCIPAL" ref="ppal" number=2 :id=this.id></FormEjercicios>
        </v-card>
      </v-col>

      <v-col>
        <v-card>
          <v-card-title class="justify-center">ENFRIAMIENTO</v-card-title>
          <FormEjercicios name="ENFRIAMIENTO" ref="frio" number=3 :id=this.id> </FormEjercicios>
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
     id: -1,
     valid: true,
     name: "",
     description: "",
     materials: "",
     rules: [(v) => !!v || "Debes completar la información"],
     select: null,
     title: "",
     cycleID: 0,
   }),
   components: {
     FormEjercicios,
   },

   beforeMount: function () {
     if(this.id != -1) {
       this.axios
           .get(UserApi.baseUrl + "/routines/" + this.id)
           .then((response) => {
             console.log(response.data);
             this.name = response.data.name;
             this.description = response.data.detail;
             this.materials = response.data.difficulty;
           })
           .catch(() => console.log("errorciño agarrando los datos de la api"));
        this.title="Editar Rutina";
     } else {
       this.title = "Crear Rutina";
     }
   },

   methods: {
     editRoutine: function() {

       if (this.id != -1) {
//si no es crear nueva rutina, edita la que estás editando
         this.axios
             .put(UserApi.baseUrl + "/routines/" + this.id, {
               name: this.name + "&",
               detail: this.description,
               isPublic: true,
               difficulty: "rookie",
               category: {
                 id: 1,
               }
             })
             .then((response) => {
               console.log(response);
               this.axios
               .get(UserApi.baseUrl + "/routines/" + this.id + "/cycles/")
               .then((response) => {
                 console.log("poop")
                 console.log(response.data.totalCount);
                 console.log(response);
                 console.log(this.id);
                 this.$refs.calor.createCycle(this.id, "warmup", 1);
                 this.$refs.ppal.createCycle(this.id, "exercise", 2);
                 this.$refs.frio.createCycle(this.id, "cooldown", 3);
                 alert("Rutina editada");

               })

             })
       } else {
         //else posteá la nueva rutina y ciclo
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
               console.log("san");
               console.log(response.data.id);
               console.log("guchito");
               this.$refs.calor.createCycle(response.data.id, "warmup", 1);
               this.$refs.ppal.createCycle(response.data.id, "exercise", 2);
               this.$refs.frio.createCycle(response.data.id, "cooldown", 3);
               this.$refs.calor.setID(response.data.id);
               this.$refs.ppal.setID(response.data.id);
               this.$refs.frio.setID(response.data.id);
               alert("Rutina Creada");
             })
       }
     },
   },
   created() {
            this.id = this.$route.params.id;
        }

 };
 </script>
