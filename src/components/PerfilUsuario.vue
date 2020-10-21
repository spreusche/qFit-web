
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
                        @click="dialog = false"
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
                            ></v-text-field>
                          </v-col>
                          <v-col>
                            <v-text-field
                              label="Apellido"
                              persistent-hint
                              required
                              filled
                            ></v-text-field>
                          </v-col>
                        </v-row>

                          <v-row>
                            <v-col>
                              <v-text-field
                                label="Usuario"
                                required
                                filled
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
<script>
export default {
    data: () =>{

    }
}
</script>