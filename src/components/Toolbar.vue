<template>
  <v-container fluid class="pa-0 ma-0">
    <v-app-bar color="#2D2D2A" dark fixed app>
      <img
        :src="require('../assets/logo-qfit.png')"
        height="100%"
        alt=""
      />

      <v-col>
        <v-tabs
          align-with-title
          background-color="#2D2D2A"
          grow
          slider-color="#00e140"
        >
          <v-tab to="/MisRutinas">Mis Rutinas</v-tab>
          <v-tab to="/MisEjercicios">Mis Ejercicios</v-tab>
          <v-tab to="/Explorar">Explorar</v-tab>
        </v-tabs>
      </v-col>

      <!--Search Bar -->
      <v-col>
        <v-text-field
          append-icon="mdi-magnify"
          @click:append="buscar"
          v-model="query"
          flat
          dense
          hide-details
          rounded
          label="Buscar"
          solo-inverted
          clearable
          clear-icon="mdi-close-circle"
        ></v-text-field>
      </v-col>

      <!--Account btn/dropdown -->
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-account</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item >
            <v-list-item-title><h3>{{ username }}</h3></v-list-item-title>
          </v-list-item>
          <PerfilUsuario></PerfilUsuario>
          <v-list-item @click="logOut()">
            <v-list-item-title>Cerrar Sesión</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-snackbar top color="error" v-model="error_busqueda">
      <p> Para la búsqueda son necesarias al menos 3 caracteres. </p>
    </v-snackbar>
  </v-container>
</template>



<script>
import { UserApi } from "@/api/user";
import PerfilUsuario from "@/components/PerfilUsuario";
export default {
  components: {PerfilUsuario},
  data: () => ({
    username: "",
    avatarUrl: "",
    query: "",
    error_busqueda: false
  }),

  methods: {

    logg: function(){
      console.log(this.query);
    },

    buscar: function(){
      if (this.query.length >= 3 ){
      this.$router.push({ name: 'searchExplorar', params: { query:  this.query } });
      location.reload();
      }
      else {
        this.error_busqueda = true;
      }
    },

    save(date) {
      this.$refs.menu.save(date);
    },
    updateData: function () {
      this.axios
        .get(UserApi.baseUrl + "/user/current")
        .then((response) => {
          this.username = response.data.username;
        })
        .catch((error) => console.log(error));
    },
    logOut: function () {
      this.axios
          .post(UserApi.baseUrl + "/user/logout")
          .then(() =>{
            localStorage.clear();
            this.$router.push('/');
          })
          .catch((error) => console.log(error));
    }
  },
  created() {
    this.updateData();
  }
};
</script>
