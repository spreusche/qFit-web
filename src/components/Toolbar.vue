<template>
  <v-container fluid class="pa-0 ma-0" >
      
    <v-toolbar color="#2D2D2A" dark>
      
      <img :src="require('../assets/logo-qfit.png')" height="100%" />
      <v-toolbar-title> 
      </v-toolbar-title>
      
      <v-col>
        <v-tabs align-with-title background-color="#2D2D2A" grow slider-color="#00e140">
          <v-tab to="/MisRutinas">Mis Rutinas</v-tab>
          <v-tab to="/MisEjercicios">Mis Ejercicios</v-tab>
          <v-tab to="/Explorar">Explorar</v-tab>
        </v-tabs>
      </v-col>

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

      <v-btn icon to='/Notificaciones'>
        <v-icon>mdi-bell</v-icon>
      </v-btn>

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
                <v-card-title>
                  <span align="center" class="headline">Editar Perfil</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12">
                        <v-row>
                            <v-text-field
                              label="Nombre"
                              required
                            ></v-text-field>
                        </v-row>
                          <v-row>
                            <v-text-field
                              label="Apellido"
                              persistent-hint
                              required
                            ></v-text-field>
                          </v-row>
                          <v-row>
                            <v-text-field
                              label="Usuario"
                              required
                            ></v-text-field>
                          </v-row>
                          <v-row>
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
                                  v-bind="attrs"
                                  v-on="on"
                                ></v-text-field>
                              </template>
                              <v-date-picker
                                ref="picker"
                                v-model="date"
                                :max="new Date().toISOString().substr(0, 10)"
                                min="1950-01-01"
                                @change="save"
                              ></v-date-picker>
                            </v-menu>
                          </v-row>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="dialog = false"
                  >
                    Close
                  </v-btn>
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="dialog = false"
                  >
                    Save
                  </v-btn>
                </v-card-actions>
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


    </v-toolbar>

  
  </v-container>
   
  
</template>

<script>
  export default {
    data: () => ({
      date: null,
      menu: false,
       dialog: false,
    }),
    watch: {
      menu (val) {
        val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
      },
    },
    methods: {
      save (date) {
        this.$refs.menu.save(date)
      },
    },
  }
</script>