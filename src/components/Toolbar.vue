<template>
  <v-container fluid class="pa-0 ma-0">

    <v-app-bar color="#2D2D2A" dark fixed app>


      <img :src="require('../assets/logo-qfit.png')" height="100%" fixed alt=""/>

      <v-col>
        <v-tabs align-with-title background-color="#2D2D2A" grow slider-color="#00e140">
          <v-tab to="/MisRutinas">Mis Rutinas</v-tab>
          <v-tab to="/MisEjercicios">Mis Ejercicios</v-tab>
          <v-tab to="/Explorar">Explorar</v-tab>
        </v-tabs>
      </v-col>

<!--Search Bar -->
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


<!--Account btn/dropdown -->
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-account-circle</v-icon>
          </v-btn>
        </template>
      <v-list>
        <template>
          <v-row justify="center">
            <v-dialog
              v-model="dialog"
              persistent
              max-width="600px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-list-item v-bind="attrs"
                  v-on="on">
                  <v-list-item-title>Editar Perfil</v-list-item-title>
                </v-list-item>
              </template>
              <v-card>
                 <v-app-bar
                    flat
                    dark
                    color="#2d2d2a"
                  >
                    <v-btn
                      icon
                      dark
                      @click="dialog = false"
                    >
                      <v-icon>mdi-close</v-icon>
                    </v-btn>
                    <v-spacer></v-spacer>

                      <v-btn
                        color="#00e140"
                        dark
                        class="caja"
                        @click="[changeData(), dialog = false]"
                      >
                        GUARDAR
                      </v-btn>

                  </v-app-bar>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col>
                        <v-row>
                          <v-col>
                            <v-text-field
                              label="Nombre"
                              required
                              filled
                              v-model="name"
                            ></v-text-field>
                          </v-col>
                          <v-col>
                            <v-text-field
                              label="Apellido"
                              persistent-hint
                              required
                              filled
                              v-model="lastName"
                            ></v-text-field>
                          </v-col>
                        </v-row>

                          <v-row>
                            <v-col>
                              <v-text-field
                                label="Usuario"
                                required
                                filled
                                v-model="username"
                              ></v-text-field>
                            </v-col>
                            <v-col>
                              <v-menu
                                ref="menu"
                                v-model="menu"
                                :close-on-content-click="false"
                                transition="scale-transition"
                                offset-y
                                min-width="290px"
                              >
                                <template v-slot:activator="{ on, attrs }">
                                  <v-text-field
                                    v-model="date"
                                    label="Fecha de nacimiento"
                                    readonly
                                    filled
                                    v-bind="attrs"
                                    v-on="on"
                                  ></v-text-field>
                                </template>
                                <v-date-picker
                                  ref="picker"
                                  locale="es"
                                  v-model="date"
                                  :max="new Date().toISOString().substr(0, 10)"
                                  min="1950-01-01"
                                  @change="save"
                                ></v-date-picker>
                              </v-menu>
                            </v-col>
                          </v-row>
                          <v-row>
                            <v-text-field
                              label="Biografía"
                              required
                              filled
                            ></v-text-field>
                        </v-row>
                        <v-row>
                            <v-text-field
                              label="Contacto"
                              filled
                            ></v-text-field>
                        </v-row>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
              </v-card>
            </v-dialog>
          </v-row>
        </template>


        <v-list-item>
          <v-list-item-title>Configuración</v-list-item-title>
        </v-list-item>
        <v-list-item to='/'>
          <v-list-item-title>Cerrar Sesión</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>


    </v-app-bar>


  </v-container>


</template>


<style>
  .caja{
      font-weight: bold;
      text-shadow: 1px 1px 4px rgba(0,0,0,0.7);
  }
</style>

<script>
import { UserApi } from '../api/user'
  export default {
    data: () => ({
      dialog: false,
      date: null,
      menu: false,
      name: '',
      lastName: '',
      username: '',
      birthdate: '',

    }),

    watch: {
      menu (val) {
        val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
      },
    },

    methods: {
      save(date) {
        this.$refs.menu.save(date)
      },
      getCurrent: function(){
        
          this.axios.get(UserApi.baseUrl + '/user/current').then(response => {
            console.log(response.data);
            return response.data;
          }).catch(error => console.log(error));
      },
      


    }

  }
</script>
